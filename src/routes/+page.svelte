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

<main class="flex-1 py-12 bg-white dark:bg-gray-800">
	<div class="container px-6 mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each navItems as item}
			<a
				class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900"
				href={item.url}
			>
				<svelte:component this={item.icon} />
				<h3 class="text-xl font-bold text-[rgb(16,185,129)] dark:text-[rgb(16,185,129)]">
					{item.name}
				</h3>
				<p class="text-gray-500 dark:text-gray-400">{item.desc}</p>
			</a>
		{/each}
	</div>
</main>
