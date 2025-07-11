<script lang="ts">
	import ApiDataTable from '$lib/components/data-table/ApiDataTable.svelte';
	import { renderSnippet } from '$lib/components/ui/data-table';
	import type { ColumnDef } from '@tanstack/table-core';
	import { createRawSnippet } from 'svelte';

	// Define columns configuration
	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'name',
			header: 'name'
		},
		{
			accessorKey: 'description',
			header: 'description',
			cell: ({ row }) => {
				const cellSnippet = createRawSnippet<[string]>(() => {
					return {
						render: () => `<div class="text-wrap">${row.original.description}</div>`
					};
				});

				return renderSnippet(cellSnippet);
			}
		},
		{
			accessorKey: 'amount',
			header: 'amount',
			cell: ({ row }) => {
				const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
					return {
						render: () => `<img src="${row.original.image}" class="w-16 h-16"  />`
					};
				});

				return renderSnippet(amountCellSnippet);
			}
		},

		{
			accessorKey: 'price',
			header: 'price'
		},
		{
			accessorKey: 'createdAt',
			header: 'createdAt'
		}
	];
</script>

<ApiDataTable
	{columns}
	url="/products"
	title="Hotel"
	queryKey="hotels-list"
	buttonText="Create Hotel"
	handleAdd={() => {
		console.log('Add Hotel');
	}}
/>
