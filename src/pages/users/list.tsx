import React, { useMemo } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useList,
  useCan,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  DeleteButton,
  useModal,
  useForm,
} from "@refinedev/antd";
import { Table, Space, Form, Input, Modal, Select } from "antd";
import { $permissions } from "../../constants";

type Role = {
  _id: string;
  name: string;
};

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: canAccessRole } = useCan({
    resource: "roles",
    action: "list",
    params: { authority: $permissions.VIEW_ROLE },
  });

  const { data: roles } = useList<Role>({
    resource: "roles",
    queryOptions: {
      enabled: canAccessRole?.can === true,
    },
  });

  const roleOptionSelect = useMemo(() => {
    return roles?.data.map((role) => ({
      label: role.name,
      value: role._id,
    }));
  }, [roles]);

  const getRoleNames = (ids: string): string => {
    if (!roles?.total) return "";

    return roles.data.reduce((pre, cur) => {
      if (ids.includes(cur._id)) {
        if (pre) pre += ", ";
        pre += cur.name;
      }

      return pre;
    }, "");
  };

  const {
    modalProps,
    show: showModal,
    close: closeModal,
  } = useModal({
    modalProps: {
      title: "Create new admin",
      maskClosable: false,
    },
  });

  const handleCloseModal = () => {
    closeModal();
    form.resetFields();
  };

  const { formProps, formLoading, form } = useForm({
    resource: "admins",
    action: "create",
    onMutationSuccess: handleCloseModal,
  });

  return (
    <List canCreate createButtonProps={{ onClick: showModal }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="username" title="Username"></Table.Column>

        <Table.Column
          dataIndex="roleIds"
          title="Role"
          render={(value: any) => getRoleNames(value)}
        />

        <Table.Column
          dataIndex="createdAt"
          title="Created"
          render={(value: any) => (
            <DateField value={value} format="D/M/YYYY HH:mm:ss" />
          )}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              {/* <EditButton icon={false} recordItemId={record.id}></EditButton> */}

              {!record.isSystemAdmin && (
                <DeleteButton
                  hideText
                  recordItemId={record._id}
                  disabled={record.isSystemAdmin}
                ></DeleteButton>
              )}
            </Space>
          )}
        />
      </Table>

      <Modal
        {...modalProps}
        onCancel={handleCloseModal}
        okButtonProps={{
          loading: formLoading,
          htmlType: "submit",
          form: "createForm",
        }}
      >
        <Form
          id="createForm"
          {...formProps}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter username"></Input>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password"></Input.Password>
          </Form.Item>

          <Form.Item label="Role" name="roleIds" rules={[{ required: true }]}>
            <Select
              options={roleOptionSelect}
              mode="multiple"
              placeholder="Select role"
            />
          </Form.Item>
        </Form>
      </Modal>
    </List>
  );
};
