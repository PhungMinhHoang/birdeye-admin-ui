export type User = {
  _id: string;
  username: string;
  roles: Array<Role>;
};

export type Role = {
  _id: string;
  name: string;
  permissions: Array<Permission>;
};

export type Permission = {
  _id: string;
  group: string;
  resource: string;
  action: string;
  groupName: string;
  resourceName: string;
  actionName: string;
  authority: string;
  createdAt: number;
  updatedAt: number;
};

export type DataPermissionResult = {
  group: string;
  _id: string;
  groupName: string;
  lastModifiedDate: number;
  resources: Array<Resource>;
  resourceList: Array<string>;
};

export type Resource = {
  resource: string;
  resourceName: string;
  lastModifiedDate: number;
  options: Array<OptionsAction>;
};

export type OptionsAction = Option & {
  label: string;
  value: string;
  action?: string;
};

export type LoginParams = {
  username: string;
  password: string;
  routeData: Array<{
    path: string;
    authority: string;
  }>;
};
