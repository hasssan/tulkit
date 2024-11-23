<script lang="ts">
	import CopyButton from '../../components/copy-button.svelte';

	let source = $state('');
	let result = $state('');

	function onUpperCase() {
		result = source.toUpperCase();
	}
	function onLowerCase() {
		result = source.toLowerCase();
	}
	function onCapitalize() {
		result = source.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
	}
	function onRemovePunctuation() {
		result = source.replace(/[^\w\s\n]|_/g, '');
	}

	function onSlugify() {
		result = source
			.replace(/[^\w\s]|_/g, '')
			.replace(/\s+/g, '-')
			.trim()
			.toLowerCase();
	}

	/**
	 * Slugify the source and remove numbers.
	 */
	function onRemoveNumber() {
		onSlugify();
		result = result.replace(/[0-9]/g, '');
	}

	const actionsItems = [
		{ name: 'Uppercase', action: onUpperCase },
		{ name: 'Lowercase', action: onLowerCase },
		{ name: 'Capitalize', action: onCapitalize },
		{ name: 'Remove Punctuation', action: onRemovePunctuation },
		{ name: 'Slugify', action: onSlugify },
		{ name: 'Remove numbers and Slugify', action: onRemoveNumber }
	];
</script>

<main class="flex-1 py-12 bg-white dark:bg-gray-800">
	<div class="container px-6 mx-auto grid gap-8">
		<div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
			<h2 class="text-2xl font-bold text-tTeal-base mb-4">String Tuls</h2>
			<form class="w-full">
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="inputData"
				>
					Source
				</label><textarea
					data-testid="inputData"
					id="inputData"
					class="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
					placeholder="Enter your data here..."
					bind:value={source}
				></textarea>
				<div class="flex justify-start mb-4">
					{#each actionsItems as item}
						<button
							class="m-1 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-tTeal-base hover:bg-tTeal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onclick={item.action}
							data-testid={item.name}
						>
							{item.name}</button
						>
					{/each}
				</div>
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="outputData"
				>
					Result
				</label><textarea
					data-testid="outputData"
					id="outputData"
					class="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Your result will appear here..."
					readonly
					bind:value={result}
				></textarea>
				<CopyButton text={result} />
			</form>
		</div>
	</div>
</main>
