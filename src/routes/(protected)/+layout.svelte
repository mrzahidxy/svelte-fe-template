<script lang="ts">
	import { goto } from '$app/navigation';
	import { authToken } from '$lib/stores/auth.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();


	console.log('Protected Layout', authToken.current);

	onMount(() => {
		if (!authToken.current) goto('/login');
	});
</script>

{@render children()}
