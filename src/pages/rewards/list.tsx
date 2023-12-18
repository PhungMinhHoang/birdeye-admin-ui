import React, { useEffect, useMemo, useRef, useState } from "react";
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
  useModal,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Form,
  Button,
  Input,
  Radio,
  Modal,
  Flex,
  Typography,
} from "antd";

const RegistrationList: React.FC<any> = ({ reward }: { reward: any }) => {
  const { tableProps, setFilters } = useTable({
    resource: "reward-registrations",
    filters: {
      initial: [{ field: "rewardId", operator: "eq", value: reward.id }],
    },
    syncWithLocation: false,
  });

  useEffect(() => {
    setFilters([{ field: "rewardId", operator: "eq", value: reward.id }]);
  }, [reward]);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{ marginBottom: "16px" }}
      >
        <h3 style={{ marginBottom: 0 }}>{reward.name}</h3>
        <Button type="primary">Download CSV</Button>
      </Flex>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="email" title="Email"></Table.Column>
        <Table.Column
          dataIndex="wallet"
          title="Wallet"
          render={(value: any) => (
            <Typography.Text copyable ellipsis style={{ maxWidth: "200px" }}>
              {value}
            </Typography.Text>
          )}
        ></Table.Column>
        <Table.Column
          dataIndex="registerAt"
          title="Register time"
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        ></Table.Column>
      </Table>
    </>
  );
};

export const RewardList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps, searchFormProps, filters } = useTable({
    syncWithLocation: true,
    onSearch: (values: any) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
  });

  const {
    show: showRegistrationList,
    close,
    modalProps,
  } = useModal({
    modalProps: {
      title: "REGISTRATION LIST",
      width: 800,
      footer: null,
      maskClosable: false,
    },
  });

  const [selectedReward, setSelectedReward]: any = useState();

  return (
    <List canCreate>
      <Form {...searchFormProps}>
        <Space>
          <Form.Item name="name">
            <Input placeholder="Search name" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </Space>
      </Form>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name"></Table.Column>
        <Table.Column dataIndex="offeredBy" title="Offered by"></Table.Column>
        <Table.Column dataIndex="type" title="Type"></Table.Column>
        <Table.Column dataIndex="amount" title="Rewards"></Table.Column>
        <Table.Column
          dataIndex="createdAt"
          title="Created"
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        />
        <Table.Column
          dataIndex="expirationAt"
          title="Expiration"
          render={(value: any) => (
            <DateField value={value * 1000} format="D/M/YYYY HH:mm:ss" />
          )}
        />

        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton
                icon={false}
                recordItemId={record.id}
                onClick={() => {
                  showRegistrationList();
                  setSelectedReward(record);
                }}
              >
                View
              </ShowButton>

              <EditButton icon={false} recordItemId={record.id}></EditButton>
            </Space>
          )}
        />
      </Table>

      <Modal {...modalProps}>
        <RegistrationList reward={selectedReward} />
      </Modal>
    </List>
  );
};
