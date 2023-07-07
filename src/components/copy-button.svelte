<script lang="ts">
	export let text = '';
	let className = 'm-1 p-2 border rounded-md bg-emerald-500 text-white';
	let name = 'Copy Result';

	$: {
		if (name === 'Copied!') {
			setTimeout(() => {
				name = 'Copy Result';
			}, 500);
		}
	}

	function onCopy() {
		navigator.clipboard.writeText(text).then(() => {
			name = 'Copied!';
		});
	}
</script>

<button class={$$restProps.class || className} on:click={onCopy}>{name}</button>
