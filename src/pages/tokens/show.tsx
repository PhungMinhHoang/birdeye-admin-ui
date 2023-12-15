import React from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import {
  Show,
  TextField,
  NumberField,
  DateField,
  TagField,
} from "@refinedev/antd";
import { Button, Flex, Modal, Space, Tag, Typography } from "antd";

const { Title } = Typography;

export const TokenShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data || {};

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

  const { mutate, isLoading: isUpdating } = useUpdate();
  const updateTokenInfo = async (status: string) => {
    if (record.id) {
      await mutate({
        resource: "tokens",
        id: record.id,
        values: {
          status,
        },
      });
    }
  };

  const { confirm } = Modal;
  const showPromiseConfirm = (action: string) => {
    confirm({
      title: `${action}! Are you sure?`,
      okText: "Yes, Confirm",
      cancelText: "Maybe not",
      okButtonProps: { loading: isUpdating },
      onOk() {
        let newStatus = "";
        switch (action) {
          case "Verify":
            newStatus = "Verified";
            break;
          case "Update":
            newStatus = "Updated";
            break;
          case "Refuse":
            newStatus = "Refused";

          default:
            break;
        }

        return updateTokenInfo(newStatus);
      },
      onCancel() {},
    });
  };

  const FooterButton = ({ status }: BaseRecord) => {
    return (
      <Space size="middle">
        {status === "Pending" && (
          <Button type="primary" onClick={() => showPromiseConfirm("Verify")}>
            Verify
          </Button>
        )}
        {status === "Verified" && (
          <Button type="primary" onClick={() => showPromiseConfirm("Update")}>
            Update DB
          </Button>
        )}

        {(status === "Pending" || status === "Verified") && (
          <Button type="default" onClick={() => showPromiseConfirm("Refuse")}>
            Refuse
          </Button>
        )}
      </Space>
    );
  };

  return (
    <Show
      isLoading={isLoading}
      canEdit={false}
      footerButtons={<FooterButton status={record.status} />}
      footerButtonProps={{
        style: {
          width: "100%",
          padding: "12px 24px",
        },
      }}
    >
      <Title level={5}>{translate("tokens.fields.status")}</Title>
      <TagField
        color={getStatusColor(record.status)}
        value={record.status}
      ></TagField>
      <Title level={5}>{translate("tokens.fields.timestamp")}</Title>
      <DateField value={record.timestamp * 1000} />
      <Title level={5}>{translate("tokens.fields.track")}</Title>
      <TextField value={record.track} />
      <Title level={5}>{translate("tokens.fields.tokenName")}</Title>
      <TextField value={record.tokenName} />
      <Title level={5}>{translate("tokens.fields.tokenSymbol")}</Title>
      <TextField value={record.tokenSymbol} />
      <Title level={5}>{translate("tokens.fields.paymentEvidence")}</Title>
      <TextField value={record.paymentEvidence} />
    </Show>
  );
};
