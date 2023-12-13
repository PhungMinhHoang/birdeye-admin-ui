import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import { useTable, List, DateField } from "@refinedev/antd";
import { Table, Space, Button, Tag } from "antd";

export const TokenList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "default";
      case "Verified":
        return "warning";
      case "Updated":
        return "success";
      default:
        break;
    }
  };

  return (
    <List title="TOKEN INFO UPDATE REQUESTS">
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="status"
          title={translate("tokens.fields.status")}
          render={(value: any) => (
            <>
              <Tag color={getStatusColor(value)}>{value}</Tag>
            </>
          )}
        />

        <Table.Column
          dataIndex="timestamp"
          title={translate("tokens.fields.timestamp")}
          render={(value: any) => (
            <DateField value={value * 1000} format="d/m/YYYY HH:mm:ss" />
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
            <Button type="default">View</Button>
          )}
        />
      </Table>
    </List>
  );
};
