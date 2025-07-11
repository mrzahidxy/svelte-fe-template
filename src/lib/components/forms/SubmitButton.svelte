<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import type { SuperForm } from 'sveltekit-superforms/client';

	/** Provide the parent form instance */
	export let superform: SuperForm<T>;
  export let className: string;

	const { submitting } = superform;
</script>

<button
	type="submit"
	class={`relative flex justify-center rounded-md bg-blue-600 px-4 py-2
         font-semibold text-white shadow transition hover:bg-blue-700
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
         focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
>
	{#if $submitting}
		<svg
			class="absolute top-1/2 left-4 -mt-2 h-5 w-5 animate-spin text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
		</svg>
	{/if}

	<span class="mx-auto">
		<slot>
			{#if $submitting}Submitting…{:else}Submit{/if}
		</slot>
	</span>
</button>
