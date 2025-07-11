<script lang="ts">
	import Form from '$lib/components/forms/Form.svelte';
	import TextField from '$lib/components/forms/InputField.svelte';
	import SubmitButton from '$lib/components/forms/SubmitButton.svelte';
	let { data } = $props();
</script>

<div class="mx-auto w-full max-w-sm space-y-4 mt-4">
	<h4 class="text-2xl font-bold">Login Form</h4>
	<Form data={data.loginForm} invalidateAll={false} let:message let:superform className="space-y-2">
		{#if message}
			<div
				class="status"
				class:error={message.status >= 400}
				class:success={!message.status || message.status < 300}
			>
				{message.text}
			</div>
		{/if}

		<TextField type="text" {superform} field="email" label="Email" class="w-full"></TextField>
		<TextField type="paassword" {superform} field="password" label="Password" class="w-full"></TextField>
		<SubmitButton {superform} className="w-20">Login</SubmitButton>
	</Form>
</div>
