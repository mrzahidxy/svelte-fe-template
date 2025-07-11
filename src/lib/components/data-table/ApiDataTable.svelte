<script lang="ts">
	import { privateRequest } from '$lib/utils/axios';
	import DataTable from '../ui/data-table/data-table.svelte';

	const { url, columns, title = '', buttonText = '', queryKey, handleAdd } = $props();

	let isLoading = $state(true);
	let isError = $state(false);
	let error = $state('');
	let tableData = $state<any[]>([]);
	let pagination = $state({
		totalPages: 1,
		currentPage: 1
	});

	const limit = 10;

	$effect(() => {
		fetchData();
	});

	async function fetchData() {
		try {
			isLoading = true;
			isError = false;
			error = '';

			// Force UI update
			await Promise.resolve();

			const response = await privateRequest.get(`${url}?page=${1}&limit=${limit}`);
			tableData = response.data.data.collection;
			pagination = response.data.data.pagination;

			console.log('tableData', tableData);
		} catch (err) {
			isError = true;
			error = 'Failed to fetch data';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="flex flex-col space-y-4 p-4">
	<!-- Table Title -->
	{#if title}
		<h1 class="text-2xl font-bold">{title}</h1>
	{/if}

	<!-- Loading State -->
	{#if isLoading}
		<div class="rounded bg-blue-100 p-4">Loading...</div>

		<!-- Error State -->
	{:else if isError}
		<div class="rounded bg-red-100 p-4 text-red-700">
			Error: {error}
		</div>

		<!-- Data Table -->
	{:else}
		<DataTable {columns} data={tableData} />
	{/if}
</div>
