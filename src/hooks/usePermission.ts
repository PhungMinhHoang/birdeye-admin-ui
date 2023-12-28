import type { DataPermissionResult, Permission } from "../types";

export const usePermission = () => {
  /**
   * Group permission and action nested from all permissions' system from api
   * @param permissions: all permission in system
   */
  const convertDataPermission = (
    permissions: Array<Permission>
  ): Array<DataPermissionResult> => {
    const result = [];
    const groups: any = {};

    for (let i = 0; i < permissions.length; i++) {
      const {
        group,
        resource,
        action,
        _id,
        groupName,
        resourceName,
        actionName,
        updatedAt,
      } = permissions[i];

      if (resource === "*" || action === "*") {
        continue;
      }

      if (!groups[group]) {
        groups[group] = {
          group,
          _id,
          groupName,
          updatedAt,
          resources: [],
          resourceList: [resource],
        };
        result.push(groups[group]);
      }

      const groupObj = groups[group];
      if (!groupObj.resourceList.includes(resource)) {
        groupObj.resourceList.push(resource);
      }

      const resourceObj = {
        resource,
        resourceName,
        updatedAt,
      };

      if (action) {
        if (
          !groupObj.resources.some((child: any) => child.resource === resource)
        ) {
          groupObj.resources.push({ ...resourceObj, options: [] });
        }

        const resourceChildren = groupObj.resources.find(
          (child: any) => child.resource === resource
        ).options;

        resourceChildren.push({
          label: actionName,
          value: _id,
        });
      } else {
        groupObj.resources.push(resourceObj);
      }
    }

    return result;
  };

  return { convertDataPermission };
};
