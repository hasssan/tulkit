<script lang="ts">
	import { base } from '$app/paths';
	const navItems = [
		{ name: 'URI', url: `${base}/uri` },
		{ name: 'String', url: `${base}/string` },
		{ name: 'Date', url: `${base}/date` }
	];
</script>

<nav class="">
	<div class="flex space-x-4">
		{#each navItems as item}
			<a
				href={item.url}
				class="text-emerald-700 underline hover:text-emerald-500 py-2 rounded-md text-sm font-medium"
				aria-current="page">{item.name}</a
			>
		{/each}
	</div>
</nav>
