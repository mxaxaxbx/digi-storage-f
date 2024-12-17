import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { decode } from '@/utils/custom-enc-dec';
import { camelToSnake } from '@/utils/index';

const URL_DIGIUSERS = process.env.VUE_APP_URL_DG_USERS;

const baseHttpClient = axios.create({
  baseURL: URL_DIGIUSERS,
  headers: {
    'Content-Type': 'application/json',
  },
});

const customPost = async <T = any, D = any>(
  url: string,
  data: D | undefined,
  config: AxiosRequestConfig<D> | undefined,
): Promise<AxiosResponse<T>> => {
  const snakeData = camelToSnake(data);
  const response = await baseHttpClient({
    method: 'POST',
    url,
    data: snakeData,
    ...config,
  });
  return response;
};

function customErrorHandler(error: any) {
  if (!error.response) {
    console.error('Network error', error);
    return error;
  }

  switch (error.response.status) {
    case 401: {
      const { VUE_APP_DIGI_USERS_F } = process.env;
      window.location.href = `${VUE_APP_DIGI_USERS_F}/auth/login?app=storage`;
      break;
    }
    case 403:
      console.error('Forbidden');
      break;
    case 404:
      console.error('Not found');
      break;
    case 500:
      console.error('Internal server error');
      break;
    default:
      console.error('Unknown error', error);
  }

  return error;
}

baseHttpClient.interceptors.request.use((config) => {
  const modifiedConfig = config;

  const token = localStorage.getItem('token');
  if (token) {
    modifiedConfig.headers.Authorization = `DGTK ${token}`;
  }

  const project = localStorage.getItem('project');
  if (project) {
    const { value } = decode(project) as any;
    // get the project id. Could be 'ID' or 'id'
    const projectId = value.ID || value.id;
    modifiedConfig.headers['Dg-Businessid'] = projectId;
  }

  return modifiedConfig;
});

baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    customErrorHandler(error);
    return Promise.reject(error);
  },
);

export const httpClient = Object.assign(baseHttpClient, {
  post: customPost,
});
