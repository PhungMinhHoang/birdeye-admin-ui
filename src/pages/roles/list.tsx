import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  getDefaultFilter,
  useList,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  FilterDropdown,
  useModal,
  useForm,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Form,
  Button,
  Input,
  Radio,
  Modal,
  Flex,
  Typography,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { redirect } from "react-router-dom";

type Role = {
  _id: string;
  name: string;
};

export const RoleList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
              <EditButton icon={false} recordItemId={record.id}></EditButton>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
