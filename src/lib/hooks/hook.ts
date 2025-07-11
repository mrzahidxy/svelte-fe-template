// src/lib/hooks.ts
import { privateRequest, publicRequest } from '$lib/utils/axios';
import { createQuery, createMutation } from '@tanstack/svelte-query';

type ApiResponse<T> = {
  data: T;
  status: number;
};


export function useGetPublic<T>(url: string, params?: object, options = {}) {
  return createQuery<ApiResponse<T>>({
    queryKey: [url, params],
    queryFn: async () => {
      const response = await publicRequest.get<T>(url, { params });
      return { data: response.data, status: response.status };
    },
    ...options
  });
}


// GET Hook (auto-triggered)
export function useGet<T>(url: string, params?: object, options = {}) {
  return createQuery<ApiResponse<T>>({
    queryKey: [url, params],
    queryFn: async () => {
      const response = await privateRequest.get<T>(url, { params });
      return { data: response.data, status: response.status };
    },
    ...options
  });
}


// POST Hook
export function usePost<T, V = unknown>(url: string) {
  return createMutation<ApiResponse<T>, Error, V>({
    mutationFn: async (data) => {
      const response = await privateRequest.post<T>(url, data);
      return { data: response.data, status: response.status };
    }
  });
}

// DELETE Hook
export function useDelete<T>(url: string) {
  return createMutation<ApiResponse<T>, Error, void>({
    mutationFn: async () => {
      const response = await privateRequest.delete<T>(url);
      return { data: response.data, status: response.status };
    }
  });
}