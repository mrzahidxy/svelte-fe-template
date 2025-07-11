import { browser } from '$app/environment';
import type { CartItem } from '$lib/type/cart';

export class CartStore {
    items = $state<CartItem[]>([]);
    count = $derived(() => this.items.reduce((total, item) => total + item.quantity, 0));
    total = $derived(() => this.items.reduce((total, item) => total + item.price * item.quantity, 0));
    key = 'cart';

    constructor() {
        if (browser) {
            const cartRaw = localStorage.getItem(this.key);
            const parsedCart = cartRaw ? JSON.parse(cartRaw) : [];
            this.items = Array.isArray(parsedCart) ? parsedCart : [];
        }

        $effect.root(() => {
            $effect(() => {
                if (browser) localStorage.setItem('cart', JSON.stringify(this.items));
            });
        });
    }

    add(item: CartItem) {
        const existingItem = this.items.find((i) => i.id === item.id);

        if (existingItem) {
            this.items = this.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        } else this.items.push(item);
    }

    remove(id: number) {
        this.items = this.items.filter(i => i.id !== id)
    }

    clear() {
        this.items = [];
    }
}

export const cart = new CartStore();
