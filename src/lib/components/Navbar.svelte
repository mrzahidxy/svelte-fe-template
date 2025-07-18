<!-- src/lib/components/Navbar.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { authToken } from '$lib/stores/auth.svelte';
	import { cart } from '$lib/stores/cartStore.svelte';

	import CartIcon from './icons/cartIcon.svelte';
	import UserIcon from './icons/userIcon.svelte';
</script>

<nav class="sticky top-0 z-50 bg-white px-6 py-4 shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center">
			<span class="ml-2 text-xl font-semibold">YourBrand</span>
		</a>

		<!-- Right side buttons -->
		<div class="flex items-center space-x-4">
			<!-- Cart Button -->
			<button
				class="relative rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
				aria-label={`Cart: ${cart.count ?? 0} items`}
				onclick={() => {
					goto('/cart');
				}}
			>
				<CartIcon />
				<span
					class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
					>{cart.count ?? 0}</span
				>
			</button>

			{#if authToken.current}
				<button
					class="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
					aria-label="User Profile"
				>
					<UserIcon />
				</button>
				<button
					class="icon-btn relative"
					aria-label="Logout"
					onclick={() => {
						authToken.clear();
					}}>Logout</button
				>
			{:else}
				<a href="/login" class="text-gray-700 hover:text-blue-600">Login</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	@reference "tailwindcss";
	.icon-btn {
		@apply rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600;
	}
</style>
