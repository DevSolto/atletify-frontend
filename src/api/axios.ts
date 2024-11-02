import axios from 'axios';
import { getSession } from 'next-auth/react';

export const useApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:4000',
  });

  api.interceptors.request.use(
    async (config) => {
      const session = await getSession();

      if ((session?.user as any)?.accessToken) { // Use assertion para `accessToken`
        config.headers.Authorization = `Bearer ${(session.user as any).accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
