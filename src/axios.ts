import { HttpError } from "@refinedev/core";
import axios, { type AxiosResponse } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO } from "./constants";

const axiosInstance = axios.create({
  baseURL: "https://internal.birdeye.so",
});
const axiosRefreshInstance = axios.create({
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
const refreshAuthLogic = async () => {
  const oldToken = localStorage.getItem(TOKEN_KEY);
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);

  try {
    const response = await axiosRefreshInstance.post(
      "/auth/refresh-token",
      {
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${oldToken}`,
        },
      }
    );

    const { accessToken, refreshToken } = response.data;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
const refreshFailLogic = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO);

  window.location.href = "/login";
  return Promise.resolve();
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);
createAuthRefreshInterceptor(axiosRefreshInstance, refreshFailLogic, {
  statusCodes: [401, 422, 403],
});

export default axiosInstance;
