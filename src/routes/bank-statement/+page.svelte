<script lang="ts">
	import Papa from 'papaparse';
	import { parseStatement } from './parser';
	import type { DocType, Statement } from './parser';
	import CopyButton from '../../components/copy-button.svelte';

	let selectedType = $state('');
	let files = $state() as FileList;
	let inputEl: HTMLInputElement;
	let password: string = $state('');
	let errorMessage: string = $state('');
	let fileContent: ArrayBuffer;
	let statement: Statement = $state({ transactions: [], total: 0 });
	let fileInfo = $state({ name: '', originalName: '' });
	let csvContent: string = $state('');

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

	function setCSVContent() {
		const content = statement.transactions.map((item) => ({
			Date: item.date,
			Name: item.note,
			Amount: item.transaction
		}));
		csvContent = Papa.unparse(content);
	}

	function onDownload() {
		const blob = new Blob([csvContent], { type: 'text/csv' });
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
				setCSVContent();
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
			<h2 class="text-2xl font-bold font-mono text-t-teal-base">Bank Statement Tuls</h2>
		</div>
	</div>
	<div class="container px-6 mx-auto grid gap-8 mb-7">
		<div class="flex flex-col items-center p-6">
			<div class="mb-6 flex justify-between items-center text-t-teal-base font-mono">
				<label for="document-type" class="w-32">Type</label>
				<select
					bind:value={selectedType}
					class="w-72 border border-t-teal-base px-1 py-2.5 focus:ring-t-teal-base focus:ring-1 focus-visible:outline-t-teal-base focus-visible:outline-solid"
				>
					<option value="">Select Document Type</option>
					{#each Object.entries(docTypes) as [key, value]}
						<option value={key}>{value}</option>
					{/each}
				</select>
			</div>
			<div class="mb-6 flex justify-between items-center text-t-teal-base font-mono">
				<label for="password" class="w-32">Password</label>
				<input
					id="password"
					type="password"
					placeholder="Enter your password"
					class="w-72 border border-t-teal-base p-2 focus:ring-t-teal-base focus:ring-1 focus-visible:outline-t-teal-base focus-visible:outline-solid"
					bind:value={password}
				/>
			</div>
			<div class="mb-6 flex justify-between items-center text-t-teal-base font-mono">
				<label for="file-upload" class="w-32">File</label>
				<input
					id="file-upload"
					bind:files
					bind:this={inputEl}
					required
					type="file"
					accept=""
					class="w-72 file:border file:border-t-teal-500 file:bg-t-teal-base file:text-white file:px-1 hover:file:bg-t-teal-500 px-2 py-2 border border-t-teal-base text-sm focus:ring-1 focus:ring-offset-0 focus:ring-t-teal-base cursor-pointer hover:file:cursor-pointer focus-visible:outline-t-teal-base focus-visible:outline-solid"
					onchange={handleUpload}
				/>
			</div>
			<div class="mb-6 text-t-teal-base font-mono">
				<input
					id="submit"
					type="button"
					value="Submit"
					onclick={onSubmit}
					class="font-mono border border-t-teal-base py-1 px-3 hover:bg-t-teal-base hover:text-white cursor-pointer focus:ring-t-teal-base focus:ring-1 focus:rounded-none focus-visible:outline-t-teal-base focus-visible:outline-solid"
				/>
			</div>
			{#if errorMessage}
				<div class="mb-6 text-t-red-700 font-mono">
					{errorMessage}
				</div>
			{/if}
		</div>
	</div>
	{#if statement?.transactions.length !== 0}
		<div class="container px-6 mx-auto grid gap-8 mb-7">
			<div class="flex flex-col items-center">
				<h3 class="font-mono font-bold text-t-teal-base text-xl mb-6">
					Statement:<span class="text-t-orange-600 pl-2">
						{fileInfo.originalName}
					</span>
				</h3>
				<table class="table-auto text-left whitespace-no-wrap font-mono w-10/12">
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
				<div class="mt-6 flex justify-between items-center w-10/12">
					<input
						id="download"
						type="button"
						value="Download CSV"
						onclick={onDownload}
						class="font-mono text-white bg-t-teal-base py-1 px-3 hover:bg-t-teal-700 cursor-pointer focus:ring-t-teal-700 focus:ring-1 focus:rounded-none focus-visible:outline-t-teal-700 focus-visible:outline-solid"
					/>
					<CopyButton
						class="font-mono text-white bg-t-teal-base py-1 px-3 hover:bg-t-teal-700 cursor-pointer focus:ring-t-teal-700 focus:ring-1 focus:rounded-none focus-visible:outline-t-teal-700 focus-visible:outline-solid"
						text={csvContent}
					/>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
	@reference "../../app.css";
	th {
		@apply text-t-teal-base pb-2;
	}
	tfoot {
		td {
			@apply text-t-teal-base pt-4;
		}
	}
	th,
	td {
		@apply px-4;
	}
</style>
