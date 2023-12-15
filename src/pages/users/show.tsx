import { DateField, Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Divider, Flex, Typography } from "antd";
const { Title, Text } = Typography;
import React from "react";

export const UserShow: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data || {};

  return (
    <Show title="User details" isLoading={isLoading} canEdit={false}>
      <section>
        <Title level={4}>Log in details</Title>

        <Flex vertical gap="small">
          <Flex>
            <Text style={{ width: "200px" }}>Email</Text>
            <Text>{record.email}</Text>
          </Flex>

          <Flex>
            <Text style={{ width: "200px" }}>Linked Wallets</Text>
            <Text>{record.linkedWallet}</Text>
          </Flex>
        </Flex>
      </section>

      <Divider></Divider>

      <section>
        <Title level={4}>Membership</Title>

        <Title level={5}>BE Membership</Title>
        <Flex vertical gap="small">
          <Flex>
            <Text style={{ width: "200px" }}>Current Membership</Text>
            <Text>{record.proExpiration ? "Pro" : "Normal"}</Text>
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>Expiration</Text>

            {record.proExpiration ? (
              <DateField
                value={record.proExpiration * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>First upgraded</Text>
            {record.upgradedAt ? (
              <DateField
                value={record.upgradedAt * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>Last updated</Text>

            {record.updatedAt ? (
              <DateField
                value={record.updatedAt * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
        </Flex>

        <Title level={5} style={{ marginTop: "24px" }}>
          BDS Membership
        </Title>
        <Flex vertical gap="small">
          <Flex>
            <Text style={{ width: "200px" }}>Current Membership</Text>
            <Text>{record.bdsType}</Text>
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>Expiration</Text>
            {record.bdsExpiration ? (
              <DateField
                value={record.bdsExpiration * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>First upgraded</Text>

            {record.bdsUpgradedAt ? (
              <DateField
                value={record.bdsUpgradedAt * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
          <Flex>
            <Text style={{ width: "200px" }}>Last updated</Text>

            {record.bdsUpdatedAt ? (
              <DateField
                value={record.bdsUpdatedAt * 1000}
                format="D/M/YYYY HH:mm:ss"
              />
            ) : (
              "_"
            )}
          </Flex>
        </Flex>
      </section>
    </Show>
  );
};
