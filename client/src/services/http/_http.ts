import axios from 'axios';
import { LIMITS } from './limits';
import { useQuery, useInfiniteQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export const http = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000,
  // insecureHTTPParser: true,
  // withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
// Change request data/error here
http.interceptors.request.use(
  async (config: any) => {
    try {
      const token: any = localStorage.getItem('U_TOKEN');
      if (!!token && token.length > 0) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    let statusCode = error?.response?.status;
    if (statusCode === 401 || statusCode === 403) {
      localStorage.clear();
    } else if (statusCode === 429) {
      toast.error(`${error?.response?.data?.error?.text} \n Please try agian at ${new Date(error?.response?.data?.error?.nextValidRequestDate)}`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    } else {
      console.log(error);

      let msg = error?.response?.data?.msg || error?.message;
      toast.error(`${msg}`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }

    return Promise.reject(error);
  },
);
export const fetchWithPageNation = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(_key, {
    params: { page: pageParam, noOfDocs: LIMITS.PRODUCTS_LIMITS, ..._params },
  });
  return data;
};
export const fetchApi = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  return await GetApi(_key, _params);
};
export const PostApi = async (_key: any, _data: any) => {
  const { data } = await http.post(_key, _data);
  return data;
};
export const PutApi = async (_key: any, _data: any) => {
  const { data } = await http.put(_key, _data);
  return data;
};
export const GetApi = async (_key: any, _params: any) => {
  const { data } = await http.get(_key, { params: _params });
  return data;
};
export const DeleteApi = async (_key: any, _data: any) => {
  const { data } = await http.delete(_key, { params: _data });
  return data;
};
export const getNextPageParam = (lastPage: any, pages: any) => {
  if (pages[pages.length - 1].data?.length === LIMITS.PRODUCTS_LIMITS) return pages.length + 1;
  return null;
};
export { useQuery, useInfiniteQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider };
export default http;
