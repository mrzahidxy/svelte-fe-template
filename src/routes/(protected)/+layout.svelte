<script lang="ts">
	import { goto } from '$app/navigation';
	import { authToken } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let { children } = $props();

	let token: string | null;

	onMount(() => {
		const unsubscribe = authToken.subscribe((t) => (token = t));

		if (!token) goto('/login');
		return unsubscribe;
	});
</script>

<span>Admin</span>
{@render children()}
