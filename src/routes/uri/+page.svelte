<script lang="ts">
	let source = '';
	let result = '';

	function onEncode() {
		result = encodeURIComponent(source);
	}
	function onDecode() {
		result = decodeURIComponent(source);
	}
</script>

<div class="">
	<h2 class="text-2xl mb-2">URI Tuls</h2>
	<textarea
		class="my-3 p-2 w-full h-40 block resize-y shadow-slate-900 border border-slate-200 rounded"
		placeholder="Source"
		bind:value={source}
	/>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onEncode}
		>Encode</button
	>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onDecode}
		>Decode</button
	>
	<textarea
		class="my-3 p-2 w-full h-40 block resize-y shadow-slate-900 border border-slate-200 rounded"
		placeholder="Result"
		bind:value={result}
	/>
</div>
