export const USER_INFO = "auth";
export const TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const $permissions = {
  VIEW_TOKEN_INFO_REQUEST: "token.infoRequest:read",
  VERIFY_TOKEN_INFO_REQUEST: "token.infoRequest:verify",
  UPDATE_TOKEN_INFO_REQUEST: "token.infoRequest:update",
  REFUSE_TOKEN_INFO_REQUEST: "token.infoRequest:refuse",

  VIEW_ADMIN: "administration.admin:read",
  CREATE_ADMIN: "administration.admin:create",
  UPDATE_ADMIN: "administration.admin:update",
  DELETE_ADMIN: "administration.admin:delete",

  VIEW_ROLE: "administration.role:read",
  CREATE_ROLE: "administration.role:create",
  UPDATE_ROLE: "administration.role:update",
  DELETE_ROLE: "administration.role:delete",
};
