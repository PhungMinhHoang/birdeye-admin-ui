import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./authProvider";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    console.log("-----");
    console.log(resource); // products, orders, etc.
    console.log(action); // list, edit, delete, etc.
    console.log(params); // { id: 1 }, { id: 2 }, etc.

    if (!resource) {
      return {
        can: false,
        reason: "Unauthorized",
      };
    }

    // By pass for dev test
    if (resource === "*") {
      return {
        can: true,
      };
    }

    const authorities = authProvider.getPermissions
      ? ((await authProvider.getPermissions()) as string[])
      : [];

    // Check exact match first
    if (authorities.includes(resource)) {
      return {
        can: true,
      };
    }

    // Check for pattern matching
    // security.organization:create is split into 2 parts [security.organization, create]
    const parts = resource.split(":");
    const checkingResource = parts[0];

    for (const resource of authorities) {
      // security.organization:* is split into 2 parts [security.organization, *]
      const authorityParts = resource.split(":");
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
  },
};
