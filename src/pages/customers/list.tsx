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

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps, searchFormProps, filters } = useTable({
    syncWithLocation: true,
    onSearch: (values: any) => {
      return [
        {
          field: "email",
          operator: "contains",
          value: values.email,
        },
      ];
    },
  });

  return (
    <List>
      <Form {...searchFormProps}>
        <Space>
          <Form.Item name="email">
            <Input placeholder="Search user email" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </Space>
      </Form>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="signedUp"
          title="Signed up"
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        />
        <Table.Column dataIndex="status" title="Status" />

        <Table.Column
          dataIndex="userType"
          title="User Type"
          render={(_, record: BaseRecord) =>
            record.proExpiration ? "Pro" : "Normal"
          }
          defaultFilteredValue={getDefaultFilter("userType", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="Pro">Pro User</Radio>
                <Radio value="Normal">Normal User</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />

        <Table.Column
          dataIndex="proExpiration"
          title="PRO Expiration"
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
          dataIndex="bdsType"
          title="BDS Type"
          defaultFilteredValue={getDefaultFilter("bdsType", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="Standard">Standard</Radio>
                <Radio value="Business">Business</Radio>
                <Radio value="Premium">Premium</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="bdsExpiration"
          title="BDS Expiration"
          render={(_, record: BaseRecord) => (
            <>
              {record.bdsExpiration && (
                <DateField
                  value={record.bdsExpiration * 1000}
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
            </>
          )}
        />
      </Table>
    </List>
  );
};
