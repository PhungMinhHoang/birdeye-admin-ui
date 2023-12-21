import { AuthBindings } from "@refinedev/core";
import axios from "./axios";
import { USER_INFO, REFRESH_TOKEN_KEY, TOKEN_KEY } from "./constants";

export const authProvider: AuthBindings = {
  login: async ({ username, password }) => {
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      try {
        const userResponse = await axios.get("/auth/info");
        if (userResponse.data) {
          localStorage.setItem(USER_INFO, JSON.stringify(userResponse.data));
        }
      } catch (error) {
        console.log("Fetching user info error: ", error);
      }

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
    localStorage.removeItem(USER_INFO);

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
    let user = localStorage.getItem(USER_INFO);

    if (!user) return null;

    user = JSON.parse(user);
    return user;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
