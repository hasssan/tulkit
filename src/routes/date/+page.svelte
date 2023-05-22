<script lang="ts">
	import dayjs from 'dayjs';

	let sourceISO = '';
	let resultISO = '';

	$: resultISO = sourceISO ? dayjs(sourceISO).format('YYYY-MM-DD HH:mm:ss') : '';

	let dateSource = '';
	let timeSource = '';
	let dateResult = '';

	$: dateSource, timeSource, processDateResult();

	function processDateResult() {
		if (!dateSource && timeSource) {
			dateSource = dayjs().format('YYYY-MM-DD')
		}
		dateResult = dateSource || timeSource ? dayjs(`${dateSource} ${timeSource}`).toISOString() : '';
	}
</script>

<div class="">
	<h2 class="text-2xl mb-2">Date Tuls</h2>
	<h3>Date Time to ISOString</h3>
	<input type="date" bind:value={dateSource} />
	<input type="time" bind:value={timeSource} />
	<input type="text" placeholder="Result" bind:value={dateResult} />
	<h3>ISOString to Local Date Time</h3>
	<input type="text" placeholder="2023-03-25T00:00:00.000Z" bind:value={sourceISO} />
	<input type="text" placeholder="2023-03-25 07:00:00" bind:value={resultISO} />
</div>
