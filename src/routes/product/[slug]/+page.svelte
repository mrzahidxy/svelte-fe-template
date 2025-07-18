<script lang="ts">
	import { cart } from '$lib/stores/cartStore.svelte';
	import type { TProduct } from '$lib/type/product';

	interface PageProps {
		data: {
			data: TProduct;
		};
	}

	let { data }: PageProps = $props();

	let quantity = $state(1);

	let addCart = () => {
		cart.add({ productId: data?.data?.id, quantity });
	};
</script>

<section class="mx-auto max-w-4xl p-4">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Product Image -->
		<div>
			<img src={data?.data?.image} alt="Bag" class="h-2/3 w-full rounded object-center" />
		</div>

		<!-- Product Details -->
		<div class="flex flex-col">
			<div>
				<h1 class="mb-2 text-2xl font-bold">{data?.data?.name}</h1>
				<p class="mb-4 text-gray-600">{data?.data?.description}</p>
				<p class="mb-4 text-xl font-semibold">{data?.data?.price}</p>

				<div class="mb-4 flex flex-wrap gap-2">
					{#each data?.data?.tags.split(',') as tags}
						<span class="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">{tags}</span>
					{/each}
				</div>

				<div class="mb-4 flex items-center space-x-4">
					<label for="quantity" class="sr-only">Quantity</label>
					<input
						id="quantity"
						type="number"
						min="1"
						bind:value={quantity}
						class="w-20 rounded border px-2 py-1"
					/>
					<button
						class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						onclick={addCart}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
