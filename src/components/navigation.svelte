<script lang="ts">
	const navItems = [
		{ name: 'URI', url: '/uri' },
		{ name: 'String', url: '/string' },
		{ name: 'Date', url: '/date' }
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
