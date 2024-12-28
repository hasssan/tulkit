import {
	parseMandiriCCStatement,
	parseBCAStatement,
	parseMandiriStatement
} from '@fahmifan/bank-statement-parser-id';
import type { TrxRecord } from '@fahmifan/bank-statement-parser-id';

export type DocType = 'MANDIRI_CC' | 'BCA' | 'MANDIRI';

export interface Transaction {
	year: number;
	date: string;
	note: string;
	type: 'debit' | 'credit' | 'initial_balance';
	transaction: number;
	balance: number;
}

export interface Statement {
	transactions: Transaction[];
	total: number;
}

export async function parseStatement(type: DocType, file: ArrayBuffer, password: string) {
	let tryPasswordCount = 0;

	const handlePassword = (type: 'ASKING' | 'RETRY') => {
		return () => {
			// console.log('Password Operation Type:', type);
			if (!password || password === '') {
				throw new Error('Password required');
			}
			if (tryPasswordCount > 1) {
				throw new Error('Too many retries');
			}
			tryPasswordCount++;
			return password;
		};
	};

	if (type === 'MANDIRI_CC') {
		return parseMandiriCCStatement(file, handlePassword('ASKING'), handlePassword('RETRY'))
			.then((records: TrxRecord[]) => {
				// console.log('Records:', records);
				return createStatement(parseTransactions(records));
			})
			.catch(handleError);
	} else if (type === 'BCA') {
		return parseBCAStatement(file, handlePassword('ASKING'), handlePassword('RETRY'))
			.then((records: TrxRecord[]) => {
				// console.log('Records:', records);
				return createStatement(parseTransactions(records));
			})
			.catch(handleError);
	} else if (type === 'MANDIRI') {
		return parseMandiriStatement(file, handlePassword('ASKING'), handlePassword('RETRY'))
			.then((records: TrxRecord[]) => {
				// console.log('Records:', records);
				return createStatement(parseTransactions(records));
			})
			.catch(handleError);
	} else {
		throw new Error('Unsupported document type');
	}
}

function createStatement(transactions: Transaction[]) {
	const statement: Statement = {
		transactions: transactions,
		total: transactions.reduce((acc, transaction) => acc + transaction.transaction, 0)
	};
	return statement;
}

function parseTransactions(records: TrxRecord[]) {
	const transactions: Transaction[] = [];
	records.forEach((record) => {
		const type =
			record.type === 'debit' ? 'debit' : record.type === 'credit' ? 'credit' : 'initial_balance';
		const transaction: Transaction = {
			year: record.tahun,
			date: `${record.tgl}/${record.tahun}`,
			note: record.ket,
			type: type,
			transaction: type === 'debit' ? record.mutasi * -1 : record.mutasi,
			balance: record.saldo
		};
		transactions.push(transaction);
	});
	return transactions;
}

function handleError(error: unknown) {
	if (error instanceof Error && error.name === 'PasswordException') {
		let errorMessage = 'Unknown error';
		if (Object.hasOwnProperty.call(error, 'code')) {
			const err = error as Error & { code: 1 | 2 };
			if (err?.code === 1) {
				errorMessage = 'Password is required';
			} else if (err?.code === 2) {
				errorMessage = 'Password is incorrect';
			}
		}
		throw new Error(errorMessage);
	}
	throw error;
}
