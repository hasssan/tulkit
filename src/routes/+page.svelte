<script lang="ts">
	import { base } from '$app/paths';

	import LinkIcon from '../components/icons/link.svelte';
	import TextIcon from '../components/icons/text.svelte';
	import CalendarIcon from '../components/icons/calendar.svelte';

	const navItems = [
		{ name: 'URI', url: `${base}/uri`, desc: 'URI Decode and Encode', icon: LinkIcon },
		{
			name: 'String',
			url: `${base}/string`,
			desc: 'To UPPERCASE, lowercase, etc.',
			icon: TextIcon
		},
		{
			name: 'Date',
			url: `${base}/date`,
			desc: 'Date to ISOString and Localtime',
			icon: CalendarIcon
		}
	];
</script>

<main class="flex-1 pt-20">
	<div class="container mx-auto grid gap-8 grid-cols-2">
		{#each navItems as item}
			<a class="flex flex-col items-center p-6 border-2 border-tTeal-base" href={item.url}>
				<svelte:component this={item.icon} />
				<h3 class="text-xl font-bold text-tTeal-base font-mono">
					{item.name}
				</h3>
				<p class="text-gray-500">{item.desc}</p>
			</a>
		{/each}
	</div>
</main>
