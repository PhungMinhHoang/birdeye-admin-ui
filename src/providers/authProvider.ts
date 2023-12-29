import { AuthBindings, CanReturnType, IResourceItem } from "@refinedev/core";
import { AccessControlProvider } from "@refinedev/core";
import { QueryClient } from "@tanstack/react-query";
import axios from "../axios";
import { USER_INFO, REFRESH_TOKEN_KEY, TOKEN_KEY } from "../constants";
import type { User } from "../types";

/**
 * Get all authorities of current user
 * @returns 
 */
const getPermissions = () => {
  if (localStorage.getItem(USER_INFO)) {
    const user = JSON.parse(localStorage.getItem(USER_INFO) as string) as User;

    return user.roles.reduce<string[]>((permissions, role) => {
      permissions.push(...role.permissions.map(({ authority }) => authority));
      return permissions;
    }, []);
  }

  return [];
};

/**
 * Check authority of current user
 * @param authority 
 * @returns 
 */
const checkAuthority = (authority: string): CanReturnType => {
  if (!authority) {
    return {
      can: false,
      reason: "Unauthorized",
    };
  }

  // By pass for dev test
  if (authority === "*") {
    return {
      can: true,
    };
  }

  const authorities = getPermissions();
  // Check exact match first
  if (authorities.includes(authority)) {
    return {
      can: true,
    };
  }

  // Check for pattern matching
  // security.organization:create is split into 2 parts [security.organization, create]
  const parts = authority.split(":");
  const checkingResource = parts[0];

  for (const authority of authorities) {
    // security.organization:* is split into 2 parts [security.organization, *]
    const authorityParts = authority.split(":");
    if (authorityParts.length < 2) {
      continue;
    }

    // Same resource but the action is "*" then would be a match
    if (authorityParts[0] === checkingResource && authorityParts[1] === "*") {
      return { can: true };
    }

    // The resource is at higher level, for example [security:*] while the checking permission is [security.organization:create]
    // then we will have to check if the action is [*]
    if (
      checkingResource.startsWith(authorityParts[0] + ".") &&
      authorityParts[1] === "*"
    ) {
      return { can: true };
    }
  }

  return {
    can: false,
    reason: "Unauthorized",
  };
};

/**
 * This function to find the first route that user has authority to redirect from "/"
 * @param resources 
 * @returns path of route to redirect
 */
export const findFallbackIndexRoute = (resources: IResourceItem[]) => {
  if (localStorage.getItem(USER_INFO)) {
    for (const resource of resources) {
      const check = checkAuthority(resource.meta?.authority?.list);

      if (check.can) {
        return resource.list as string;
      }
    }
  }

  return "/";
};

export const authProvider: AuthBindings = {
  login: async ({ username, password, resources }) => {
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
        redirectTo: findFallbackIndexRoute(resources),
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
  logout: async ({ queryClient }: { queryClient: QueryClient }) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO);
    queryClient.removeQueries();

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
  getPermissions: async () => getPermissions(),
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

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    const authorityData = params?.resource?.meta?.authority;
    const checkPermission = authorityData
      ? authorityData[action]
      : params?.authority;

    return checkAuthority(checkPermission);
  },
};
