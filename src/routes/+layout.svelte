<script>
	import '../app.css';
	import NavigationComponent from '../components/navigation.svelte';
	import { base } from '$app/paths';
</script>

<div class="container mx-auto my-4">
	<header class="h-20 flex items-center justify-between bg-white dark:bg-gray-900">
		<h1 class="text-5xl font-mono font-bold text-tTeal">
			<a href="{base}/">Tulkit</a>
		</h1>
		<!-- <form class="relative w-64">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<path d="m21 21-4.3-4.3"></path></svg
			><input
				class="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
				placeholder="Search tulkit..."
				type="search"
			/>
		</form> -->
		<NavigationComponent />
	</header>
	<slot />
</div>
