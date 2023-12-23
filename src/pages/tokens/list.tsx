import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useList,
  getDefaultFilter,
} from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  FilterDropdown,
  useSelect,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space, Button, Tag, Select } from "antd";

export const TokenList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps, filters } = useTable({
    syncWithLocation: true,
    resource: "token/updateInfoRequests",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "default";
      case "Verified":
        return "warning";
      case "Updated":
        return "success";
      case "Refused":
        return "error";
      default:
        break;
    }
  };

  const statusSelectOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Verified", label: "Verified" },
    { value: "Updated", label: "Updated" },
    { value: "Refused", label: "Refused" },
  ];

  return (
    <List title="TOKEN INFO UPDATE REQUESTS">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="status"
          title={translate("tokens.fields.status")}
          render={(value: any) => (
            <Tag color={getStatusColor(value)}>{value}</Tag>
          )}
          defaultFilteredValue={getDefaultFilter("status", filters)}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                placeholder="Select Status"
                options={statusSelectOptions}
              />
            </FilterDropdown>
          )}
        />

        <Table.Column
          dataIndex="timestamp"
          title={translate("tokens.fields.timestamp")}
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        />

        <Table.Column
          dataIndex="track"
          title={translate("tokens.fields.track")}
        />
        <Table.Column
          dataIndex="tokenName"
          title={translate("tokens.fields.tokenName")}
        />
        <Table.Column
          dataIndex="tokenSymbol"
          title={translate("tokens.fields.tokenSymbol")}
        />
        <Table.Column
          dataIndex="paymentEvidence"
          title={translate("tokens.fields.paymentEvidence")}
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
