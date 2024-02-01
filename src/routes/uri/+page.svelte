<script lang="ts">
	import CopyButton from '../../components/copy-button.svelte';

	let source = '';
	let result = '';

	function onEncode() {
		result = encodeURIComponent(source);
	}
	function onDecode() {
		result = decodeURIComponent(source);
	}

	function onSwap() {
		[result, source] = [source, result];
	}
</script>

<main class="flex-1 py-12 bg-white dark:bg-gray-800">
	<div class="container px-6 mx-auto grid gap-8">
		<div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
			<h2 class="text-2xl font-bold text-[rgb(16,185,129)] dark:text-[rgb(16,185,129)] mb-4">
				URI Tuls
			</h2>
			<form class="w-full">
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="inputData"
				>
					Source
				</label><textarea
					id="inputData"
					class="h-40 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
					placeholder="Enter your data here..."
					bind:value={source}
				></textarea>
				<div class="flex justify-start mb-4">
					<button
						class="m-1 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[rgb(16,185,129)] hover:bg-[rgb(5,150,105)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						on:click={onEncode}
					>
						Encode</button
					><button
						class="m-1 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[rgb(16,185,129)] hover:bg-[rgb(5,150,105)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						on:click={onDecode}
					>
						Decode</button
					><button
						class="m-1 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[rgb(16,185,129)] hover:bg-[rgb(5,150,105)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						on:click={onSwap}
					>
						Swap
					</button>
				</div>
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="outputData"
				>
					Result
				</label><textarea
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
