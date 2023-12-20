import { HttpError } from "@refinedev/core";
import axios, { type AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "./constants";

const axiosInstance = axios.create({
  baseURL: "https://be-intranet.hieuht.dev",
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
const refreshAuthLogic = async (failedRequest: any) => {
  const token = localStorage.getItem("refreshToken");

  if (!token) return;

  try {
    const response = await axiosInstance.post("/auth/refreshToken", {
      token,
    });

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + accessToken;
  } catch (error) {}
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
