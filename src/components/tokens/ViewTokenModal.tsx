import React, { useMemo, useState } from "react";
import {
  BaseRecord,
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import { useForm } from "@refinedev/antd";
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
} from "antd";
import dayjs from "dayjs";

const { Title, Text, Link, Paragraph } = Typography;

const ViewTokenModal: React.FC<{ token: any }> = ({ token }) => {
  const translate = useTranslate();
  // const { queryResult } = useShow();
  // const { data, isLoading } = queryResult;
  // const token = data?.data || {};

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

  const tokenInfoFields = useMemo(() => {
    return [
      {
        label: "Form ID",
        value: token.formId,
        name: "formId",
      },
      {
        label: "Timestamp",
        value: dayjs(token.updatedAt).format("D/M/YYYY hh:mm:ss"),
        name: "updatedAt",
      },
      {
        label: "Contact Address",
        value: token.contactAddress,
        name: "contactAddress",
      },
      {
        label: "Confirm Public And Easily Verified",
        value: token.confirmPublicAndEasilyVerified,
        name: "confirmPublicAndEasilyVerified",
      },
      {
        label: "Confirm Manual And Paid Service",
        value: token.confirmManualAndPaidServie,
        name: "confirmManualAndPaidServie",
      },
      {
        label: "Birdeye Token Link",
        value: token.birdeyeTokenLink,
        name: "birdeyeTokenLink",
      },
      {
        label: "Token Name",
        value: token.tokenName,
        name: "tokenName",
      },
      {
        label: "Token Symbol",
        value: token.tokenSymbol,
        name: "tokenSymbol",
      },
      {
        label: "Website",
        value: token.website,
        name: "website",
      },
      {
        label: "Contact Email",
        value: token.contactEmail,
        name: "contactEmail",
      },
      {
        label: "Project Introduction Text",
        value: token.projectIntroductionText,
        name: "projectIntroductionText",
      },
      {
        label: "Logo Link",
        value: token.logoLink,
        name: "logoLink",
      },
      {
        label: "Coingecko Link",
        value: token.coingeckoLink,
        name: "coingeckoLink",
      },
      {
        label: "Coinmarketcap Link",
        value: token.coinmarketcapLink,
        name: "coinmarketcapLink",
      },
      {
        label: "Whitepaper Link",
        value: token.whitePaperLink,
        name: "whitePaperLink",
      },
      {
        label: "Blockchain Platform 1",
        value: token.blockchainPlatform1,
        name: "blockchainPlatform1",
      },
      {
        label: "Blockchain Platform 2",
        value: token.blockchainPlatform2,
        name: "blockchainPlatform2",
      },
      {
        label: "Blockchain Platform 3",
        value: token.blockchainPlatform3,
        name: "blockchainPlatform3",
      },
      {
        label: "Blockchain Platform 4",
        value: token.blockchainPlatform4,
        name: "blockchainPlatform4",
      },
      {
        label: "Blockchain Platform 5",
        value: token.blockchainPlatform5,
        name: "blockchainPlatform5",
      },
      {
        label: "X (Twitter) Handle",
        value: token.xTwitterHandle,
        name: "xTwitterHandle",
      },
      {
        label: "Discord Server",
        value: token.discordServer,
        name: "discordServer",
      },
      {
        label: "Telegram Group",
        value: token.telegramGroup,
        name: "telegramGroup",
      },
      {
        label: "Facebook Fanpage",
        value: token.facebookFanpage,
        name: "facebookFanpage",
      },
      {
        label: "Instagram Page",
        value: token.instagramPage,
        name: "instagramPage",
      },
      {
        label: "Tiktok Account",
        value: token.tiktokAccount,
        name: "tiktokAccount",
      },
      {
        label: "Medium Page",
        value: token.mediumPage,
        name: "mediumPage",
      },
      {
        label: "Substack Page",
        value: token.substackPage,
        name: "substackPage",
      },
      {
        label: "Reddit Page",
        value: token.redditPage,
        name: "redditPage",
      },
      {
        label: "Github Account",
        value: token.githubAccount,
        name: "githubAccount",
      },
      {
        label: "Bitbucket Account",
        value: token.bitbucketAccount,
        name: "bitbucketAccount",
      },
      {
        label: "Track Type",
        value: token.trackType,
        name: "trackType",
      },
      {
        label: "Payment Evidence",
        value: token.paymentEvidence,
        name: "paymentEvidence",
      },
    ];
  }, [token]);

  const { formProps, formLoading, form, onFinish } = useForm({
    resource: "tokens",
    action: "edit",
    onMutationSuccess: (data) => {},
  });

  const [action, setAction] = useState<string>();
  const handleSubmit = (formValues: any) => {
    switch (action) {
      case "Verify":
        break;
      case "Update":
        break;
      case "Refuse":

      default:
        break;
    }

    onFinish(formValues);
  };

  return (
    <Form
      {...formProps}
      layout="vertical"
      initialValues={{ ...token }}
      onFinish={handleSubmit}
    >
      {tokenInfoFields.map((field, index) => (
        <Form.Item label={field.label} name={field.name} key={index}>
          <Input />
        </Form.Item>
      ))}

      <Divider />

      <Flex justify="space-between" style={{ marginTop: "16px" }}>
        {(token.status === "Pending" || token.status === "Verified") && (
          <Button
            type="default"
            htmlType="submit"
            danger
            loading={action === "Refuse" && formLoading}
            onClick={() => setAction("Refuse")}
          >
            Refuse
          </Button>
        )}

        <Space size="middle">
          {token.status === "Pending" && (
            <Button
              type="primary"
              htmlType="submit"
              loading={action === "Verify" && formLoading}
              onClick={() => setAction("Verify")}
            >
              Verify
            </Button>
          )}
          {token.status === "Verified" && (
            <Button
              type="primary"
              htmlType="submit"
              loading={action === "Update" && formLoading}
              onClick={() => setAction("Update")}
            >
              Update DB
            </Button>
          )}
        </Space>
      </Flex>
    </Form>
  );
};

export default ViewTokenModal;
