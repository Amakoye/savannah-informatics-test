import api from "api/api";
import { AxiosError } from "axios";
import memoize from "fast-memoize";
import { useEffect } from "react";
import { useDispatch } from "store";
import useAuth from "./useAuth";

const memoizedReduxLogoutUser = memoize((_: string) =>
  useDispatch()(reduxLogoutUser())
);

const requestInterceptor = (
  access_token: string | null
  //refresh_token: string | null
) => {
  return api.interceptors.request.use((config) => {
    if (access_token) config.headers.setAuthorization(`Bearer ${access_token}`);

    return config;
  });
};

const responseInterceptor = (refresh_token: string | null) => {
  return api.interceptors.response.use(null, async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && refresh_token && !error.config?.retry) {
      memoizedReduxLogoutUser(refresh_token);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  });
};

const useInterceptorEffect = () => {
  const { access_token, refresh_token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = requestInterceptor(access_token);
    const response = responseInterceptor(refresh_token);
    return () => {
      api.interceptors.request.eject(request);
      api.interceptors.response.eject(response);
    };
  }, [access_token, refresh_token, dispatch]);
};

declare module "axios" {
  export interface AxiosRequestConfig {
    retry?: true;
  }
}
export default useInterceptorEffect;
function reduxLogoutUser(): any {
  throw new Error("Function not implemented.");
}
