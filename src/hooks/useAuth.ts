import { USER_INFO } from "../constants";

type User = {
  _id: string;
  username: string;
  roles: Array<Role>;
};

type Role = {
  _id: string;
  name: string;
  permissions: Array<Permission>;
};

type Permission = {
  _id: string;
  actionName: string;
  authority: string;
};

export const useAuth = () => {
  const getUserPermissions = () => {
    if (localStorage.getItem(USER_INFO)) {
      const user = JSON.parse(
        localStorage.getItem(USER_INFO) as string
      ) as User;

      return user!.roles[0].permissions.map(({ authority }) => authority);
    }

    return [];
  };

  const canAccess = (checkingPermission?: string) => {
    if (!checkingPermission) {
      return false;
    }

    // By pass for dev test
    if (checkingPermission === "*") {
      return true;
    }

    const authorities = getUserPermissions();

    // Check exact match first
    if (authorities.includes(checkingPermission)) {
      return true;
    }

    // Check for pattern matching
    // security.organization:create is split into 2 parts [security.organization, create]
    const parts = checkingPermission.split(":");
    const checkingResource = parts[0];

    for (const authority of authorities) {
      // security.organization:* is split into 2 parts [security.organization, *]
      const authorityParts = authority.split(":");
      if (authorityParts.length < 2) {
        continue;
      }

      // Same resource but the action is "*" then would be a match
      if (authorityParts[0] === checkingResource && authorityParts[1] === "*") {
        return true;
      }

      // The authority is at higher level, for example [security:*] while the checking permission is [security.organization:create]
      // then we will have to check if the action is [*]
      if (
        checkingResource.startsWith(authorityParts[0] + ".") &&
        authorityParts[1] === "*"
      ) {
        return true;
      }
    }

    return false;
  };

  return { canAccess };
};
