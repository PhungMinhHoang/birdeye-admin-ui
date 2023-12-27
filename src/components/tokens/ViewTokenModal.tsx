import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SaveButton } from "@refinedev/antd";
import {
  Form,
  Button,
  Divider,
  Flex,
  Modal,
  Space,
  Tag,
  Typography,
  Input,
  InputProps,
} from "antd";
import dayjs from "dayjs";
import { LinkOutlined } from "@ant-design/icons";
import { CopyButton } from "../elements/CopyButton";
import { useCustom, useUpdate } from "@refinedev/core";

type FormFieldData = {
  label: string;
  name: string;
  inputProps?: InputProps;
};

type Props = {
  token: any;
  onSuccess: () => void;
};

const ViewTokenModal: React.FC<Props> = ({ token, onSuccess }) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdate();

  useEffect(() => {
    form.setFieldsValue({
      ...token,
      updatedAt: dayjs(token.updatedAt).format("D/M/YYYY hh:mm:ss"),
    });
  }, [token]);

  const tokenInfoFields = useMemo<FormFieldData[]>(() => {
    return [
      {
        label: "Form ID",
        name: "formId",
        inputProps: {
          readOnly: true,
        },
      },
      {
        label: "Timestamp",
        name: "updatedAt",
        inputProps: {
          readOnly: true,
        },
      },
      {
        label: "Contact Address",
        name: "contactAddress",
        inputProps: {
          addonAfter: (
            <CopyButton text={form.getFieldValue("contactAddress")} />
          ),
        },
      },
      {
        label: "Confirm Public And Easily Verified",
        name: "confirmPublicAndEasilyVerified",
        inputProps: {
          readOnly: true,
        },
      },
      {
        label: "Confirm Manual And Paid Service",
        name: "confirmManualAndPaidService",
        inputProps: {
          readOnly: true,
        },
      },
      {
        label: "Birdeye Token Link",
        name: "birdeyeTokenLink",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("birdeyeTokenLink")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Token Name",
        name: "tokenName",
      },
      {
        label: "Token Symbol",
        name: "tokenSymbol",
      },
      {
        label: "Website",
        name: "website",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("website")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Contact Email",
        name: "contactEmail",
      },
      {
        label: "Project Introduction Text",
        name: "description",
      },
      {
        label: "Logo Link",
        name: "logoLink",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("logoLink")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Coingecko Link",
        name: "coingeckoLink",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("coingeckoLink")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Coinmarketcap Link",
        name: "coinmarketcapLink",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("coinmarketcapLink")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Whitepaper Link",
        name: "whitePaperLink",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("whitePaperLink")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Blockchain Platform 1",
        name: "blockchainPlatform1",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("blockchainPlatform1")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Blockchain Platform 2",
        name: "blockchainPlatform2",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("blockchainPlatform2")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Blockchain Platform 3",
        name: "blockchainPlatform3",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("blockchainPlatform3")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Blockchain Platform 4",
        name: "blockchainPlatform4",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("blockchainPlatform4")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Blockchain Platform 5",
        name: "blockchainPlatform5",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("blockchainPlatform5")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "X (Twitter) Handle",
        name: "twitter",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("twitter")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Discord Server",
        name: "discord",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("discord")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Telegram Group",
        name: "telegram",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("telegram")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Facebook Fanpage",
        name: "facebook",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("facebook")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Instagram Page",
        name: "instagram",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("instagram")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Tiktok Account",
        name: "tiktok",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("tiktok")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Medium Page",
        name: "medium",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("medium")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Substack Page",
        name: "substack",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("substack")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Reddit Page",
        name: "reddit",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("reddit")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Github Account",
        name: "github",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("github")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Bitbucket Account",
        name: "bitbucket",
        inputProps: {
          addonAfter: (
            <a href={form.getFieldValue("bitbucket")} target="_blank">
              <LinkOutlined />
            </a>
          ),
        },
      },
      {
        label: "Track Type",
        name: "trackType",
        inputProps: {
          readOnly: true,
        },
      },
      {
        label: "Payment Evidence",
        name: "paymentEvidence",
        inputProps: {
          readOnly: true,
        },
      },
    ];
  }, [token, form.getFieldsValue()]);

  const [action, setAction] = useState("");
  const handleSubmit = (formValues: any) => {
    let resource = "";

    switch (action) {
      case "Verify":
        resource = "token/update-info-requests/verify";
        break;
      case "Update":
        resource = "token/update-info-requests/update-to-birdeye-app";
        break;
      case "Refuse":
        resource = "token/update-info-requests/refuse";
        break;
      default:
        break;
    }

    mutate(
      {
        resource,
        values: formValues,
        id: token._id,
        successNotification: () => {
          return {
            message: "",
            description: `${action} token info successfully`,
            type: "success",
          };
        },
      },
      {
        onSuccess: () => {
          onSuccess();
          form.resetFields();
        },
        onError: (error, variables, context) => {
          // An error occurred!
          debugger;
        },
      }
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {dayjs().format("D/M/YYYY hh:mm:ss")}

      <div style={{ maxHeight: "60vh", overflow: "auto" }}>
        {tokenInfoFields.map((field, index) => (
          <Form.Item label={field.label} name={field.name} key={index}>
            <Input allowClear {...field.inputProps} />
          </Form.Item>
        ))}
      </div>

      <Divider />

      <Flex justify="space-between" style={{ marginTop: "16px" }}>
        {(token.status === "Pending" || token.status === "Verified") && (
          <Button
            type="default"
            htmlType="submit"
            danger
            loading={action === "Refuse" && isLoading}
            onClick={() => setAction("Refuse")}
          >
            Refuse
          </Button>
        )}

        <Space size="middle">
          <SaveButton
            type="primary"
            htmlType="submit"
            loading={action === "Verify" && isLoading}
            onClick={() => setAction("Verify")}
          >
            Verify
          </SaveButton>

          <SaveButton
            type="primary"
            htmlType="submit"
            loading={action === "Update" && isLoading}
            onClick={() => setAction("Update")}
          >
            Update DB
          </SaveButton>
        </Space>
      </Flex>
    </Form>
  );
};

export default ViewTokenModal;
