<script>
	import '../app.css';
	import NavigationComponent from '../components/navigation.svelte';
	import { base } from '$app/paths';
</script>

<div class="container mx-auto my-4">
	<h1 class="text-4xl font-bold mb-4">
		<a href="{base}/">Tulkit</a>
		<span class="text-sm"><sub>v2 beta</sub></span>
	</h1>
	<NavigationComponent />
	<slot />
</div>
