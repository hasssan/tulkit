<script lang="ts">
	let source = '';
	let result = '';

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
		result = source.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
	}
</script>

<div class="">
	<h2 class="text-2xl mb-2">String Tuls</h2>
	<textarea
		class="my-3 p-2 w-full h-40 block resize-y shadow-slate-900 border border-slate-200 rounded"
		placeholder="Source"
		bind:value={source}
	/>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onUpperCase}
		>Uppercase</button
	>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onLowerCase}
		>Lowercase</button
	>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onCapitalize}
		>Capitalize</button
	>
	<button class="m-1 p-2 border rounded-md bg-emerald-500 text-white" on:click={onRemovePunctuation}
		>Remove Punctuation</button
	>
	<textarea
		class="my-3 p-2 w-full h-40 block resize-y shadow-slate-900 border border-slate-200 rounded"
		placeholder="Result"
		bind:value={result}
	/>
</div>
