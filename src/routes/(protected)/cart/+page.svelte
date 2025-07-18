<script lang="ts">
	import { cart } from '$lib/stores/cartStore.svelte';
	import { privateRequest } from '$lib/utils/axios';

	async function placeOrde() {
		await privateRequest.post('/orders');
	}
</script>

<section class="mx-auto grid max-w-5xl space-y-2 p-4">
	<h1 class="mb-6 text-3xl font-semibold">Shopping Cart</h1>

	<div class="grid grid-cols-6 gap-2">
		{#if !cart.loaded}
			<!-- 1. Loading state -->
			<div class="col-span-6 flex h-32 items-center justify-center text-gray-500">
				<svg class="mr-2 h-5 w-5 animate-spin" /> Loading cart…
			</div>
		{:else if cart.items.length > 0}
			<!-- Cart Items -->
			<div class="col-span-4 space-y-6">
				{#each cart.items as item}
					<div class="flex items-center justify-between rounded-lg bg-white p-4 shadow">
						<div class="flex items-center space-x-4">
							<img
								src={item?.product?.image}
								alt="Product name"
								class="h-20 w-20 rounded object-cover"
							/>
							<div>
								<p class="text-lg font-medium">{item?.product?.name}</p>
								<p class="mt-1 text-sm">Qty: <strong>{item?.quantity}</strong></p>
							</div>
						</div>
						<div class="flex items-center space-x-4">
							<p class="font-mono text-lg">{item?.product?.price}</p>
							<button
								class="text-red-500 hover:text-red-700"
								aria-label="Remove"
								onclick={() => cart.remove(item?.id)}
							>
								&times;
							</button>
						</div>
					</div>
				{/each}

				<!-- Repeat for each cart item -->
			</div>

			<div class="col-span-2 flex flex-col rounded-lg bg-white p-6 shadow">
				<div class="mb-4 md:mb-0">
					<p class="flex justify-between text-gray-700">
						<span>Items:</span><span>{cart.items.length}</span>
					</p>
					<p class="mt-2 flex justify-between text-xl font-semibold">
						<span>Total:</span><span>{cart.total}</span>
					</p>
				</div>
				<div class="flex space-x-4">
					<button
						class="flex-1 rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
						onclick={placeOrde}
					>
						Checkout
					</button>
					<button
						class="flex-1 rounded border border-gray-300 py-2 text-gray-600 hover:border-gray-400"
						onclick={() => cart.clear()}
					>
						Clear Cart
					</button>
				</div>
			</div>
		{:else}
			<!-- Empty state -->
			<p class="col-span-6 mt-12 text-gray-500">Your cart is empty.</p>
		{/if}
		<!-- Summary & Actions -->
	</div>
</section>
