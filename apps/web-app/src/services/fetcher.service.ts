import { server_host } from '@/config/host.config';
import { Fetcher } from '@repo/fetcher';
import { getToken, refreshTokens } from './token.service';

const fetcher = new Fetcher({
  baseURL: server_host,
});

fetcher.use('request', async (request) => {
  const accessToken = await getToken();
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

fetcher.use('response', async (config, response) => {
  const originalRequest = config;
  if (response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const accessToken = await refreshTokens();
    if (accessToken) {
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return await fetcher.request(originalRequest);
    }
  }
  return response;
});

export default fetcher;
