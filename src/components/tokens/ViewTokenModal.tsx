import React, { useMemo } from "react";
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
import { Button, Divider, Flex, Modal, Space, Tag, Typography } from "antd";
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

  const { mutate, isLoading: isUpdating } = useUpdate();
  const updateTokenInfo = async (status: string) => {
    if (token.id) {
      await mutate({
        resource: "tokens",
        id: token.id,
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

  const tokenDetail = useMemo(() => {
    return [
      { label: "Form ID", value: token.formId },
      {
        label: "Timestamp",
        value: dayjs(token.updatedAt).format("D/M/YYYY hh:mm:ss"),
      },
      { label: "Contact Address", value: token.contactAddress },
      {
        label: "Confirm Public And Easily Verified",
        value: token.confirmPublicAndEasilyVerified,
      },
      {
        label: "Confirm Manual And Paid Service",
        value: token.confirmManualAndPaidServie,
      },
      {
        label: "Birdeye Token Link",
        value: (
          <Link href={token.birdeyeTokenLink} target="_blank">
            {token.birdeyeTokenLink}
          </Link>
        ),
      },
      { label: "Token Name", value: token.tokenName },
      { label: "Token Symbol", value: token.tokenSymbol },
      {
        label: "Website",
        value: (
          <Link href={token.website} target="_blank">
            {token.website}
          </Link>
        ),
      },
      { label: "Contact Email", value: token.contactEmail },
      {
        label: "Project Introduction Text",
        value: token.projectIntroductionText,
      },
      {
        label: "Logo Link",
        value: (
          <Link href={token.logoLink} target="_blank">
            {token.logoLink}
          </Link>
        ),
      },
      {
        label: "Coingecko Link",
        value: (
          <Link href={token.coingeckoLink} target="_blank">
            {token.coingeckoLink}
          </Link>
        ),
      },
      {
        label: "Coinmarketcap Link",
        value: (
          <Link href={token.coinmarketcapLink} target="_blank">
            {token.coinmarketcapLink}
          </Link>
        ),
      },
      {
        label: "Whitepaper Link",
        value: (
          <Link href={token.whitePaperLink} target="_blank">
            {token.whitePaperLink}
          </Link>
        ),
      },
      {
        label: "Blockchain Platform 1",
        value: (
          <Link href={token.blockchainPlatform1} target="_blank">
            {token.blockchainPlatform1}
          </Link>
        ),
      },
      {
        label: "Blockchain Platform 2",
        value: (
          <Link href={token.blockchainPlatform2} target="_blank">
            {token.blockchainPlatform2}
          </Link>
        ),
      },
      {
        label: "Blockchain Platform 3",
        value: (
          <Link href={token.blockchainPlatform3} target="_blank">
            {token.blockchainPlatform3}
          </Link>
        ),
      },
      {
        label: "Blockchain Platform 4",
        value: (
          <Link href={token.blockchainPlatform4} target="_blank">
            {token.blockchainPlatform4}
          </Link>
        ),
      },
      {
        label: "Blockchain Platform 5",
        value: (
          <Link href={token.blockchainPlatform5} target="_blank">
            {token.blockchainPlatform5}
          </Link>
        ),
      },
      {
        label: "X (Twitter) Handle",
        value: (
          <Link href={token.xTwitterHandle} target="_blank">
            {token.xTwitterHandle}
          </Link>
        ),
      },
      {
        label: "Discord Server",
        value: (
          <Link href={token.discordServer} target="_blank">
            {token.discordServer}
          </Link>
        ),
      },
      {
        label: "Telegram Group",
        value: (
          <Link href={token.telegramGroup} target="_blank">
            {token.telegramGroup}
          </Link>
        ),
      },
      {
        label: "Facebook Fanpage",
        value: (
          <Link href={token.facebookFanpage} target="_blank">
            {token.facebookFanpage}
          </Link>
        ),
      },
      {
        label: "Instagram Page",
        value: (
          <Link href={token.instagramPage} target="_blank">
            {token.instagramPage}
          </Link>
        ),
      },
      {
        label: "Tiktok Account",
        value: (
          <Link href={token.tiktokAccount} target="_blank">
            {token.tiktokAccount}
          </Link>
        ),
      },
      {
        label: "Medium Page",
        value: (
          <Link href={token.mediumPage} target="_blank">
            {token.mediumPage}
          </Link>
        ),
      },
      {
        label: "Substack Page",
        value: (
          <Link href={token.substackPage} target="_blank">
            {token.substackPage}
          </Link>
        ),
      },
      {
        label: "Reddit Page",
        value: (
          <Link href={token.redditPage} target="_blank">
            {token.redditPage}
          </Link>
        ),
      },
      {
        label: "Github Account",
        value: (
          <Link href={token.githubAccount} target="_blank">
            {token.githubAccount}
          </Link>
        ),
      },
      {
        label: "Bitbucket Account",
        value: (
          <Link href={token.bitbucketAccount} target="_blank">
            {token.bitbucketAccount}
          </Link>
        ),
      },
      { label: "Track Type", value: token.trackType },
      { label: "Payment Evidence", value: <Link href={token.paymentEvidence} target="_blank">{token.paymentEvidence}</Link> },
    ];
  }, [token]);

  return (
    <>
      <Flex vertical gap={8}>
        {tokenDetail.map((row, index) => (
          <Flex key={index}>
            <div style={{ width: "200px", flexShrink: 0 }}>{row.label}</div>
            <Text>{row.value}</Text>
          </Flex>
        ))}
      </Flex>

      <Divider />

      <Flex justify="space-between" style={{ marginTop: "16px" }}>
        {(token.status === "Pending" || token.status === "Verified") && (
          <Button
            type="default"
            danger
            onClick={() => showPromiseConfirm("Refuse")}
          >
            Refuse
          </Button>
        )}

        <Space size="middle">
          {token.status === "Pending" && (
            <Button type="primary" onClick={() => showPromiseConfirm("Verify")}>
              Verify
            </Button>
          )}
          {token.status === "Verified" && (
            <Button type="primary" onClick={() => showPromiseConfirm("Update")}>
              Update DB
            </Button>
          )}
        </Space>
      </Flex>
    </>
  );
};

export default ViewTokenModal;
