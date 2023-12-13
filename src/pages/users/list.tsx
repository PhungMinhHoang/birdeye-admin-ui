import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={translate("users.fields.id")} />

        <Table.Column
          dataIndex="fullName"
          title={translate("users.fields.fullName")}
        />
        <Table.Column
          dataIndex="userName"
          title={translate("users.fields.userName")}
        />
        <Table.Column dataIndex="role" title={translate("users.fields.role")} />

        <Table.Column
          dataIndex={["createdAt"]}
          title={translate("users.fields.createdAt")}
          render={(value: any) => <DateField value={value} />}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
