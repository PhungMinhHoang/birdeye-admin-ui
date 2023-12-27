import React, { useEffect, useMemo, useState } from "react";
import { SaveButton } from "@refinedev/antd";
import { Form, Button, Divider, Flex, Space, Input, InputProps } from "antd";
import dayjs from "dayjs";
import { LinkOutlined } from "@ant-design/icons";
import { useUpdate } from "@refinedev/core";
import { CopyButton } from "../elements/CopyButton";

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
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("birdeyeTokenLink"))
              }
            />
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
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("website"))}
            />
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
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("logoLink"))}
            />
          ),
        },
      },
      {
        label: "Coingecko Link",
        name: "coingeckoLink",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("coingeckoLink"))}
            />
          ),
        },
      },
      {
        label: "Coinmarketcap Link",
        name: "coinmarketcapLink",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("coinmarketcapLink"))
              }
            />
          ),
        },
      },
      {
        label: "Whitepaper Link",
        name: "whitePaperLink",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("whitePaperLink"))}
            />
          ),
        },
      },
      {
        label: "Blockchain Platform 1",
        name: "blockchainPlatform1",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("blockchainPlatform1"))
              }
            />
          ),
        },
      },
      {
        label: "Blockchain Platform 2",
        name: "blockchainPlatform2",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("blockchainPlatform2"))
              }
            />
          ),
        },
      },
      {
        label: "Blockchain Platform 3",
        name: "blockchainPlatform3",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("blockchainPlatform3"))
              }
            />
          ),
        },
      },
      {
        label: "Blockchain Platform 4",
        name: "blockchainPlatform4",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("blockchainPlatform4"))
              }
            />
          ),
        },
      },
      {
        label: "Blockchain Platform 5",
        name: "blockchainPlatform5",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() =>
                window.open(form.getFieldValue("blockchainPlatform5"))
              }
            />
          ),
        },
      },
      {
        label: "X (Twitter) Handle",
        name: "twitter",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("twitter"))}
            />
          ),
        },
      },
      {
        label: "Discord Server",
        name: "discord",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("discord"))}
            />
          ),
        },
      },
      {
        label: "Telegram Group",
        name: "telegram",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("telegram"))}
            />
          ),
        },
      },
      {
        label: "Facebook Fanpage",
        name: "facebook",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("facebook"))}
            />
          ),
        },
      },
      {
        label: "Instagram Page",
        name: "instagram",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("instagram"))}
            />
          ),
        },
      },
      {
        label: "Tiktok Account",
        name: "tiktok",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("tiktok"))}
            />
          ),
        },
      },
      {
        label: "Medium Page",
        name: "medium",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("medium"))}
            />
          ),
        },
      },
      {
        label: "Substack Page",
        name: "substack",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("substack"))}
            />
          ),
        },
      },
      {
        label: "Reddit Page",
        name: "reddit",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("reddit"))}
            />
          ),
        },
      },
      {
        label: "Github Account",
        name: "github",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("github"))}
            />
          ),
        },
      },
      {
        label: "Bitbucket Account",
        name: "bitbucket",
        inputProps: {
          addonAfter: (
            <LinkOutlined
              onClick={() => window.open(form.getFieldValue("bitbucket"))}
            />
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
  }, [token]);

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

      <Flex
        justify="space-between"
        style={{ marginTop: "16px", flexDirection: "row-reverse" }}
      >
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
      </Flex>
    </Form>
  );
};

export default ViewTokenModal;
