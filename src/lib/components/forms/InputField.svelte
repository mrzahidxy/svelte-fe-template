<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy } from 'sveltekit-superforms';
	import type { SuperForm, FormPathLeaves } from 'sveltekit-superforms';

	let _class = '';
	export { _class as class };

	export let label = '';
	export let field: FormPathLeaves<T>;
	export let superform: SuperForm<T>;

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

{#if label}
	<label class="label" for={field}>{label}</label>
{/if}
<div class="control">
	<input
		class={'input ' + _class}
		name={field}
		aria-invalid={$errors ? 'true' : undefined}
		placeholder=""
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
</div>
{#if $errors}
	<p class="help is-danger">{$errors}</p>
{/if}

<style>
	.is-danger {
		color: red;
	}

	input {
		background-color: #e7e7e7;
		border-radius: 0.5rem;
		border: none;
		color: #333;
		font-size: 1rem;
		padding: 0.5rem;
	}

	input:not(:placeholder-shown):invalid {
		box-shadow: inset 0px 0px 3px 1px #f00;
	}
</style>
