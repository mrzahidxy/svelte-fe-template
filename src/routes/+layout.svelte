<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { queryClient } from '$lib/queryClient';
	import '../app.css';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<Navbar />
	{@render children()}
</QueryClientProvider>
