<!-- src/lib/components/Navbar.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cartStore.svelte';
	import { onMount } from 'svelte';

	// Replace with your actual logo path or component
	// import Logo from '$lib/assets/logo.svg';

	console.log('cart', cart.total());
</script>

<nav class="sticky top-0 z-50 bg-white px-6 py-4 shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex items-center">
			<!-- Replace with your logo - this is a placeholder -->
			<div
				class="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 font-bold text-white"
			>
				Logo
			</div>
			<span class="ml-2 text-xl font-semibold">YourBrand</span>
		</a>

		<!-- Navigation Links (optional) -->
		<!-- <div class="hidden md:flex space-x-8">
      <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
      <a href="/products" class="text-gray-700 hover:text-blue-600">Products</a>
      <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
    </div> -->

		<!-- Right side buttons -->
		<div class="flex items-center space-x-4">
			<!-- Cart Button -->
			<button
				class="relative rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
				onclick={() => {
					goto('/cart');
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
				<span
					class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
					>{cart.count() ?? 0}</span
				>
			</button>

			<!-- Profile Button -->
			<button class="rounded-full p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			</button>

			<!-- Mobile menu button (optional) -->
			<button class="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</nav>
