<script lang="ts">
	import Papa from 'papaparse';
	import { parseStatement } from './parser';
	import type { DocType, Statement } from './parser';

	let selectedType = $state('');
	let files = $state() as FileList;
	let inputEl: HTMLInputElement;
	let password: string = $state('');
	let errorMessage: string = $state('');
	let fileContent: ArrayBuffer;
	let statement: Statement = $state({ transactions: [], total: 0 });
	let fileInfo = $state({ name: '', originalName: '' });

	const docTypes = {
		MANDIRI_CC: 'Mandiri CC Statement',
		MANDIRI: 'Mandiri Statement',
		BCA: 'BCA Statement'
	} as Record<DocType, string>;

	function handleUpload() {
		const file = files[0];

		if (!file) return;
		fileInfo = {
			name: file.name?.split('.').slice(0, -1).join('.'),
			originalName: file.name
		};

		const reader = new FileReader();
		reader.onload = async (event) => {
			fileContent = event.target?.result as ArrayBuffer;
		};
		reader.readAsArrayBuffer(file);
	}

	function onDownload() {
		const downloadContent = statement.transactions.map((item) => ({
			Date: item.date,
			Name: item.note,
			Amount: item.transaction
		}));
		const csv = Papa.unparse(downloadContent);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${fileInfo.name}.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	async function onSubmit() {
		errorMessage = '';
		if (selectedType === '') {
			errorMessage = 'Please select a document type';
			return;
		}
		if (!password) {
			errorMessage = 'Please enter your password';
			return;
		}
		if (!fileContent || fileContent.byteLength === 0) {
			errorMessage = 'Please upload a file';
			return;
		}
		const docType = selectedType as DocType;

		const copyFileContent = fileContent.slice(0);

		try {
			const parsed = await parseStatement(docType, fileContent, password);
			if (parsed) {
				statement = parsed;
			}

			if (inputEl) {
				inputEl.value = '';
				fileContent = new ArrayBuffer(0);
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = String(error);
			}
			if (!fileContent || fileContent.byteLength === 0) {
				fileContent = copyFileContent;
			}
		}
	}
</script>

<main class="flex-1 py-12">
	<div class="container px-6 mx-auto grid gap-8 mb-7">
		<div class="flex flex-col items-center p-6">
			<h2 class="text-2xl font-bold font-mono text-tTeal-base">Bank Statement Tuls</h2>
		</div>
	</div>
	<div class="container px-6 mx-auto grid gap-8 mb-7">
		<div class="flex flex-col items-center p-6">
			<div class="mb-6 flex justify-between items-center text-tTeal-base font-mono">
				<label for="document-type" class="w-32">Type</label>
				<select
					bind:value={selectedType}
					class="w-72 border border-tTeal-base px-1 py-2.5 focus:ring-tTeal-base focus:ring-1 focus-visible:outline-tTeal-base focus-visible:outline"
				>
					<option value="">Select Document Type</option>
					{#each Object.entries(docTypes) as [key, value]}
						<option value={key}>{value}</option>
					{/each}
				</select>
			</div>
			<div class="mb-6 flex justify-between items-center text-tTeal-base font-mono">
				<label for="password" class="w-32">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Enter your password"
					class="w-72 border border-tTeal-base p-2 focus:ring-tTeal-base focus:ring-1 focus-visible:outline-tTeal-base focus-visible:outline"
					bind:value={password}
				/>
			</div>
			<div class="mb-6 flex justify-between items-center text-tTeal-base font-mono">
				<label for="file-upload" class="w-32">File</label>
				<input
					id="file-upload"
					bind:files
					bind:this={inputEl}
					required
					type="file"
					accept=""
					class="w-72 file:border-[1px] file:border-tTeal-500 file:bg-tTeal-base file:text-white hover:file:bg-tTeal-500 px-2 py-2 border border-tTeal-base text-sm focus:ring-1 focus:ring-offset-0 focus:ring-tTeal-base cursor-pointer hover:file:cursor-pointer focus-visible:outline-tTeal-base focus-visible:outline"
					onchange={handleUpload}
				/>
			</div>
			<div class="mb-6 text-tTeal-base font-mono">
				<input
					id="submit"
					type="button"
					value="Submit"
					onclick={onSubmit}
					class="font-mono border border-tTeal-base py-1 px-3 hover:bg-tTeal-base hover:text-white cursor-pointer focus:ring-tTeal-base focus:ring-1 focus:rounded-none focus-visible:outline-tTeal-base focus-visible:outline"
				/>
			</div>
			{#if errorMessage}
				<div class="mb-6 text-tRed-700 font-mono">
					{errorMessage}
				</div>
			{/if}
		</div>
	</div>
	{#if statement?.transactions.length !== 0}
		<div class="container px-6 mx-auto grid gap-8 mb-7">
			<div class="flex flex-col items-center">
				<h3 class="font-mono font-bold text-tTeal-base text-xl mb-6">
					Statement:<span class="text-tOrange-600 pl-2">
						{fileInfo.originalName}
					</span>
				</h3>
				<table class="table-auto text-left whitespace-no-wrap font-mono">
					<thead>
						<tr>
							<th>Date</th>
							<th>Name</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{#each statement.transactions as item}
							<tr>
								<td>{item.date}</td>
								<td>{item.note}</td>
								<td>{item.transaction}</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<td><strong>Total</strong></td>
							<td></td>
							<td><strong>{statement.total}</strong></td>
						</tr>
					</tfoot>
				</table>
				<div class="mt-6">
					<input
						id="download"
						type="button"
						value="Download CSV"
						onclick={onDownload}
						class="font-mono text-white bg-tTeal-base py-1 px-3 hover:bg-tTeal-700 cursor-pointer focus:ring-tTeal-700 focus:ring-1 focus:rounded-none focus-visible:outline-tTeal-700 focus-visible:outline"
					/>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
	th {
		@apply text-tTeal-base pb-2;
	}
	tfoot {
		td {
			@apply text-tTeal-base pt-4;
		}
	}
	th,
	td {
		@apply px-4;
	}
</style>
