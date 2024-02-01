<script lang="ts">
	export let text = '';
	let className =
		'm-1 p-2 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[rgb(16,185,129)] hover:bg-[rgb(5,150,105)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4';
	let name = 'Copy to Clipboard';

	$: {
		if (name === 'Copied!') {
			setTimeout(() => {
				name = 'Copy to Clipboard';
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
