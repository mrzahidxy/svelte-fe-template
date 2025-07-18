// src/lib/stores/cartStore.svelte.ts

import type { CartItem } from '$lib/type/product';
import { privateRequest } from '$lib/utils/axios';

export class CartStore {
	items = $state<any[]>([]);
	loaded = $state<boolean>(false);

	// 2. Reactive getters (NOT functions)
	get count() {
		return this.items.length;
	}
	get total() {
		return this.items.reduce((acc, i) => acc + Number(i.product.price) * i.quantity, 0);
	}

	// 3. Runs once on the client automatically
	constructor() {
		if (typeof window !== 'undefined') {
			this.syncCart();
		}
	}

	async syncCart() {
		try {
			const res = await privateRequest.get<{ data: CartItem[] }>('/carts');
			this.items = Array.isArray(res.data.data) ? res.data.data : [];
		} catch (e) {
			console.error('Failed to fetch cart:', e);
			this.items = [];
		} finally {
			this.loaded = true;
		}
	}

	// Use optimistic update or full sync pattern
	async add(item: { productId: number; quantity: number }) {
		const { productId, quantity } = item;
		try {
			await privateRequest.post('/carts', {
				productId,
				quantity
			});
			await this.syncCart();
		} catch (e) {
			console.error('Error adding cart item:', e);
		}
	}

	async remove(id: number) {
		try {
			await privateRequest.delete(`/carts/${id}`);
			await this.syncCart();
		} catch (e) {
			console.error('Error removing item:', e);
		}
	}

	async clear() {
		try {
			await privateRequest.post('/carts/clear');
			this.items = [];
		} catch (e) {
			console.error('Error clearing cart:', e);
		}
	}
}

export const cart = new CartStore();
