// src/lib/stores/authToken.svelte.ts
import { browser } from '$app/environment';

export class AuthTokenStore {
  #key = 'token';

  current = $state<string | null>(null);

  constructor() {
    if (browser) {
      this.current = localStorage.getItem(this.#key);
    }
  }

  set(token: string | null) {
    this.current = token;
    if (browser) {
      if (token) localStorage.setItem(this.#key, token);
      else localStorage.removeItem(this.#key);
    }
  }

  clear() {
    console.log('clearing token');
    this.set(null);
  }
}

export const authToken = new AuthTokenStore();