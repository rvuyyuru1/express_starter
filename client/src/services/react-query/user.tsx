import { APP_ENDPOINTS } from '../http/APPendpoints';
import { fetchApi, useQuery } from '../http/_http';
export const useDetails = () => {
  return useQuery<any, Error>([APP_ENDPOINTS.getuser], fetchApi, {
    select: (data: any) => data.data,
  });
};
