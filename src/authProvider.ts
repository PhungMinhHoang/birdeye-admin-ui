import { AuthBindings } from "@refinedev/core";
import axios from "./axios";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "./constants";

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("auth", JSON.stringify({ name: "Hoang" }));
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    let user = localStorage.getItem("auth");

    if (!user) return null;

    user = JSON.parse(user);
    return user;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
