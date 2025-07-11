<script lang="ts">
	import { cart } from "$lib/stores/cartStore.svelte";
	import type { Tproduct } from "$lib/type/product";

	export let product: Tproduct;

	function addCart() {
		cart.add({...product, quantity:1});
	}
</script>

<div
	class="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
>
	<!-- Product Image -->
	<div class="relative aspect-square bg-gray-100">
		{#if product.image}
			<img
				src={product.image}
				alt={product.name}
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center text-gray-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-12 w-12"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>
		{/if}

		<!-- Tags Badge -->
		{#if product.tags}
			<div class="absolute top-2 left-2 flex flex-wrap gap-1">
				{#each product.tags.split(',') as tag}
					<span class="bg-opacity-70 rounded bg-red-500 px-2 py-1 text-xs text-white">
						{tag.trim()}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Product Info -->
	<div class="flex flex-grow flex-col p-4">
		<h3 class="mb-1 text-lg font-semibold text-gray-900">{product.name}</h3>
		<p class="mb-3 line-clamp-2 flex-grow text-sm text-gray-600">{product.description}</p>

		<div class="mt-auto flex items-center justify-between">
			<span class="text-lg font-bold text-gray-900">${product.price}</span>
			<button
				class="cursor-pointer flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
				onclick={addCart}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				Add
			</button>
		</div>
	</div>
</div>
