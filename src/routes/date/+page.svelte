<script lang="ts">
	import dayjs from 'dayjs';

	let sourceISO = '';
	let resultISO = '';

	$: resultISO = sourceISO ? dayjs(sourceISO).format('YY-MM-DD HH:mm:ss') : '';
</script>

<div class="">
	<h2 class="text-2xl mb-2">Date Tuls</h2>
	<h3>Date Time to ISOString</h3>
	<input type="date" />
	<input type="time" />
	<input type="text" placeholder="Result" />
	<h3>ISOString to Local Date Time</h3>
	<input type="text" placeholder="2023-03-25T00:00:00.000Z" bind:value={sourceISO} />
	<input type="text" placeholder="2023-03-25 07:00:00" bind:value={resultISO} />
</div>
