<script lang="ts">
  import { useGetPublic } from '$lib/hooks/hook';
  import ProductCard from '$lib/components/ProductCard.svelte';
	import type { Tproduct } from '$lib/type/product';
  

  type ProductsResponse = {
    data: {
      collection: Tproduct[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalOrders: number;
        limit: number;
      };
    };
    status: number;
  };

  const productsQuery = useGetPublic<ProductsResponse>('/products');
</script>

<div class="container mx-auto px-4 py-8">
  {#if $productsQuery.isLoading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if $productsQuery.isError}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {$productsQuery.error.message}
    </div>
  {:else if $productsQuery.data}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each $productsQuery.data.data.data.collection as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  {/if}
</div>