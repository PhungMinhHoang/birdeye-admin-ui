import React, { useEffect, useMemo, useRef, useState } from "react";
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
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

type Role = {
  _id: string;
  name: string;
};

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="name" title="Role name"></Table.Column>

        <Table.Column
          dataIndex="updatedAt"
          title="Updated at"
          render={(value: any) => (
            <DateField value={value} format="D/M/YYYY HH:mm:ss" />
          )}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText recordItemId={record._id}></EditButton>

              <DeleteButton hideText recordItemId={record._id}></DeleteButton>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
