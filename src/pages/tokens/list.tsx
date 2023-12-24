import React, { useState } from "react";
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
  useModal,
} from "@refinedev/antd";
import { Table, Space, Button, Tag, Select, Typography, Modal } from "antd";
import ViewTokenModal from "../../components/tokens/ViewTokenModal";

const { Link } = Typography;

export const TokenList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps, filters } = useTable({
    syncWithLocation: true,
    resource: "token/updateInfoRequests",
    pagination: {
      mode: "client",
    },
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

  const {
    modalProps: viewModalProps,
    show: showViewModal,
    close: closeViewModal,
  } = useModal({
    modalProps: {
      title: "Token info update request",
      width: 1000,
      footer: null,
    },
  });
  const [token, setToken] = useState<BaseRecord>();
  const handleView = (record: BaseRecord) => {
    setToken(record);
    showViewModal();
  };

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
          render={(value) => (
            <>
              <Link ellipsis style={{ width: "200px" }} target="_blank">
                {value}
              </Link>
            </>
          )}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Button onClick={() => handleView(record)}>View</Button>
          )}
        />
      </Table>

      <Modal {...viewModalProps}>
        <ViewTokenModal token={token} />
      </Modal>
    </List>
  );
};
