import { HttpError } from "@refinedev/core";
import axios, { type AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO } from "./constants";
import { redirect } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://internal.birdeye.so",
});

// Use interceptor to inject the token to requests
axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem(TOKEN_KEY);

  request.headers["Authorization"] = `Bearer ${token}`;
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

// Function that will be called to refresh authorization
const refreshAuthLogic = () => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!token) {
    redirect("/login");
    return Promise.resolve();
  }

  return axiosInstance
    .post("/auth/refreshToken", {
      token,
    })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      return Promise.resolve();
    })
    .catch(() => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_INFO);

      redirect("/login");
      return Promise.resolve();
    });
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
