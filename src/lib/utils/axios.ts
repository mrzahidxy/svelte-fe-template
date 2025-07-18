import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';
import { authToken } from '$lib/stores/auth.svelte';
import { get } from 'svelte/store';

export const publicRequest = axios.create({
  baseURL: PUBLIC_API_BASE_URL,
  timeout: 10000,
});


export const privateRequest = axios.create({
  baseURL: PUBLIC_API_BASE_URL,
  timeout: 10000,
  // withCredentials: true // Enable if using HttpOnly cookies
});

// Request interceptor
privateRequest.interceptors.request.use(async (config) => {
  if (browser) {

    const token = authToken.current;

    if (token) {
      config.headers.Authorization = `${token}`;
    }
  }

  return config;
});

// Response interceptor remains the same
privateRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && browser) {
      // invalidateAll();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
