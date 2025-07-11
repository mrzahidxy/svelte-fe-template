// src/lib/stores/auth.ts
import { writable } from 'svelte/store';

const initial = typeof localStorage !== 'undefined'
  ? localStorage.getItem('token')
  : null;

export const authToken = writable<string | null>(initial);

authToken.subscribe((token) => {
  if (typeof localStorage === 'undefined') return;
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
});
