<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container mx-auto px-4 py-8">
	{#if data?.data?.length === 0}
		<div class="flex h-64 items-center justify-center">
			<div class="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each data?.data as product (product.id)}
				<ProductCard {product} />
			{/each}
		</div>
	{/if}
</div>
