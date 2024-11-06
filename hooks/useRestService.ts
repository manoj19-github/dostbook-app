import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import {useStoreManagement} from '../store/useStoreManagement';
import {storage} from '../store';
// import { useUserContext } from "../context/UserContext";
// import { baseServiceUrl } from "../environment";

export const useRestService = () => {
  //   const userContext = useUserContext();
  const store = useStoreManagement();
  class RestService {
    client: AxiosInstance;
    constructor(config: AxiosRequestConfig) {
      this.client = axios.create(config);
      this.client.interceptors.request.use(
        async config => {
          const token = await getToken();
          if (token && !!config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // console.log("🚀 ~ RestService ~ token:", token);
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        },
      );

      this.client.interceptors.response.use(
        async response => {
          if (response?.data?.token) {
            await setToken(response?.data?.token);
            this.client.defaults.headers.common['Authorization'] =
              response?.data?.token;
          }
          return response;
        },
        async error => {
          const originalRequest = error?.config;
          if (error?.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;
            await new Promise(resolve => setTimeout(resolve, 1000));
            return this.client(originalRequest);
          } else if (
            error?.response?.status === 408 &&
            !originalRequest?._retry
          ) {
            originalRequest._retry = true;
            if (error?.response?.data?.token) {
              await setToken(error?.response?.data?.token);
              this.client.defaults.headers.common['Authorization'] =
                error.response?.data?.token;
              await new Promise(resolve => setTimeout(resolve, 500));
              return this.client(originalRequest);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            return this.client(originalRequest);
          }

          return Promise.reject(error);
        },
      );
    }

    get(endpoint: string) {
      return this.client.get<any>(endpoint);
    }

    post(endpoint: string, payload: any) {
      return this.client.post<any>(endpoint, payload);
    }
    put(endpoint: string, payload: any) {
      return this.client.put<any>(endpoint, payload);
    }
  }

  const serviceClient = new RestService({
    baseURL: `http://localhost:5000`,
  });

  const getToken = async (): Promise<string | null | undefined> => {
    return store.token
      ? store.token
      : storage.getString('token')
      ? storage.getString('token')
      : '';
  };

  const setToken = async (token: string) => {
    return store.setToken(token);
    // return "";
  };
  return serviceClient;
};

// 408=> refresh
// 403=> expaired
// 500=> system exception
// 200=> succes and business error
