<script lang="ts">
	interface Props {
		text?: string;
		[key: string]: any;
	}

	let { text = '', ...rest }: Props = $props();
	let className =
		'm-1 p-2 inline-flex items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-t-teal-base hover:bg-t-teal-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-hidden focus:shadow-outline mt-4';
	let name = $state('Copy to Clipboard');

	$effect(() => {
		if (name === 'Copied!') {
			setTimeout(() => {
				name = 'Copy to Clipboard';
			}, 500);
		}
	});

	function onCopy() {
		navigator.clipboard.writeText(text).then(() => {
			name = 'Copied!';
		});
	}
</script>

<button class={rest.class || className} onclick={onCopy}>{name}</button>
