import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  getDefaultFilter,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Form, Button, Input, Radio } from "antd";

export const RewardList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps, searchFormProps, filters } = useTable({
    syncWithLocation: true,
    onSearch: (values: any) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
  });

  return (
    <List canCreate>
      <Form {...searchFormProps}>
        <Space>
          <Form.Item name="name">
            <Input placeholder="Search name" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </Space>
      </Form>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name"></Table.Column>
        <Table.Column dataIndex="offeredBy" title="Offered by"></Table.Column>
        <Table.Column dataIndex="type" title="Type"></Table.Column>
        <Table.Column dataIndex="amount" title="Rewards"></Table.Column>
        <Table.Column
          dataIndex="createdAt"
          title="Created"
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        />
        <Table.Column
          dataIndex="expiration"
          title="Expiration"
          render={(_, record: BaseRecord) => (
            <>
              {record.proExpiration && (
                <DateField
                  value={record.proExpiration * 1000}
                  format="D/M/YYYY HH:mm:ss"
                />
              )}
            </>
          )}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <>
              <ShowButton icon={false} recordItemId={record.id}>
                View
              </ShowButton>

              <EditButton icon={false} recordItemId={record.id}></EditButton>
            </>
          )}
        />
      </Table>
    </List>
  );
};
