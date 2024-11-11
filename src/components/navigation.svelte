<script lang="ts">
	import { base } from '$app/paths';
	const navItems = [
		{ name: 'URI', url: `${base}/uri` },
		{ name: 'String', url: `${base}/string` },
		{ name: 'Date', url: `${base}/date` }
	];
</script>

<nav class="">
	<div class="flex justify-between min-w-52">
		{#each navItems as item}
			<a
				href={item.url}
				class="text-tTeal-base hover:underline py-2 rounded-md text-base font-mono font-bold"
				aria-current="page">{item.name}</a
			>
		{/each}
	</div>
</nav>
