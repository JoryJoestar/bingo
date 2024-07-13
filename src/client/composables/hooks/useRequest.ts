//MyRequest.ts
import { type UseFetchOptions } from "nuxt/app";

const request = <T = any>(url: string, options?: UseFetchOptions<T>) => {
  return new Promise((resolve, reject) => {
    const nuxtApp = useNuxtApp()
    const hydrating = process.client && !nuxtApp.isHydrating
    const headers = useRequestHeaders(['cookie']);
    const { baseURL } = useRuntimeConfig().public;

    if (hydrating) {
      const new_options: any = {
        baseURL: baseURL as string,
        headers: headers,
        ...options
      }
      $fetch(url, {
        ...new_options,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    } else {
      const new_options: UseFetchOptions<T> = {
        baseURL: baseURL as string,
        headers: headers,
        ...options
      }
      useFetch(url, {
        ...new_options,
        onRequest({ request, options }) {
          // Set the request headers
          options.headers = options.headers || {};
        },
        onRequestError({ request, options, error }) {
          // Handle the request errors
          reject(error)
        },
        onResponse({ request, response, options }) {
          // Process the response data
          resolve(response._data);
        },
        onResponseError({ request, response, options }) {
          console.log('🚀 ~ file: MyRequest.ts:42 ~ onResponseError ~ request:', request);
          // Handle the response errors
        },
      });
    }
  })
};

export const useDefaultRequest = {
  get: <T = any>(url: string, options?: UseFetchOptions<T>) => {
    return request(url, { method: 'GET', ...options });
  },
  post: <T = any>(url: string, options?: UseFetchOptions<T>) => {
    return request(url, { method: 'POST', ...options });
  },
};
