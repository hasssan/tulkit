<script lang="ts">
	import CopyButton from '../../components/copy-button.svelte';
	import dayjs from 'dayjs';

	let sourceISO = '';
	let resultISO = '';
	let copyButtonStyle = 'm-0 p-1 border rounded-md bg-emerald-500 text-white';

	$: resultISO = sourceISO ? dayjs(sourceISO).format('YYYY-MM-DD HH:mm:ss') : '';

	let dateSource = '';
	let timeSource = '';
	let dateResult = '';

	$: dateSource, timeSource, processDateResult();

	function processDateResult() {
		if (!dateSource && timeSource) {
			dateSource = dayjs().format('YYYY-MM-DD');
		}
		dateResult = dateSource || timeSource ? dayjs(`${dateSource} ${timeSource}`).toISOString() : '';
	}
</script>

<main class="flex-1 py-12 bg-white dark:bg-gray-800">
	<div class="container px-6 mx-auto grid grid-cols-2 gap-8">
		<div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
			<h2 class="text-2xl font-bold text-tTeal-base mb-4">Date Time to ISOString</h2>
			<form class="w-full">
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="inputData"
				>
					Input
				</label>
				<div class="flex">
					<input
						type="date"
						class="mr-1 h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow appearance-none border rounded py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
						bind:value={dateSource}
					/>
					<input
						type="time"
						class="ml-1 h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow appearance-none border rounded py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
						bind:value={timeSource}
					/>
				</div>
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="outputData"
				>
					Output
				</label><textarea
					id="outputData"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Your result will appear here..."
					readonly
					bind:value={dateResult}
				></textarea>
				<CopyButton text={dateResult} />
			</form>
		</div>
		<div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
			<h2 class="text-2xl font-bold text-tTeal-base mb-4">ISOString to Local Date Time</h2>
			<form class="w-full">
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="inputData"
				>
					Input
				</label>
				<input
					type="text"
					class="w-full h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow appearance-none border rounded py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-4"
					placeholder="2023-03-25T00:00:00.000Z"
					bind:value={sourceISO}
				/>
				<label
					class="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
					for="outputData"
				>
					Output
				</label><textarea
					id="outputData"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Your result will appear here..."
					readonly
					bind:value={resultISO}
				></textarea>
				<CopyButton text={resultISO} />
			</form>
		</div>
	</div>
</main>
