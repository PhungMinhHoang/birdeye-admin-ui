import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Upload,
  type UploadProps,
} from "antd";
import * as dayjs from "dayjs";

const FormItem = Form.Item;

const typeSelectOptions = [{ value: "first", label: "First come first serve" }];

const walletTypeSelectOptions = [
  { value: "evm", label: "EVM" },
  { value: "solana", label: "SOL" },
];

const conditionOptions = [
  { value: "is_member", label: "Birdeye account" },
  { value: "added_wallet", label: "Wallet added to profile" },
  { value: "is_pro", label: "PRO member" },
];

export const RewardCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, form, onFinish, formLoading } = useForm();

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
      expirationTime: dayjs(values.expirationTime, "D/M/YYYY HH:mm:ss").unix(),
    });
  };

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {},
  };

  const bannerUploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {},
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const FooterButtons: React.FC = () => {
    return (
      <Flex justify="space-between">
        <Flex align="center" gap={4}>
          <div>Not ready?</div>
          <Button
            type="link"
            loading={formLoading}
            onClick={() => form.submit()}
          >
            Save for later
          </Button>
        </Flex>

        <Flex gap={12}>
          <Button type="default" onClick={() => form.resetFields()}>
            Discard
          </Button>
          <Button type="primary" {...saveButtonProps} loading={formLoading}>
            Publish
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Create
      title="CREATE NEW REWARD"
      wrapperProps={{ style: { width: "50%" } }}
      footerButtons={<FooterButtons />}
    >
      <Form
        {...formProps}
        onFinish={handleOnFinish}
        layout="vertical"
        initialValues={{
          walletType: "evm",
          eligibilityConditions: ["is_member"],
        }}
      >
        <FormItem label="Reward name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" />
        </FormItem>

        <Flex gap={16}>
          <FormItem
            label="Reward offered by"
            style={{ width: "50%" }}
            rules={[{ required: true }]}
            name="partnerName"
          >
            <Flex gap={4} align="flex-start">
              <FormItem
                name="partnerLogo"
                style={{ marginBottom: 0, width: "86px" }}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Logo</Button>
                </Upload>
              </FormItem>

              <Input placeholder="Partner's name" />
            </Flex>
          </FormItem>
          <FormItem label="Type" style={{ width: "50%" }}>
            <Select value="first" options={typeSelectOptions}></Select>
          </FormItem>
        </Flex>

        <Flex gap={16}>
          <FormItem
            label="Wallet type"
            name="walletType"
            style={{ width: "50%" }}
          >
            <Select options={walletTypeSelectOptions}></Select>
          </FormItem>

          <FormItem
            label="Expiration time"
            name="expirationTime"
            rules={[{ required: true }]}
            style={{ width: "50%" }}
          >
            <DatePicker
              showTime
              format="D/M/YYYY HH:mm:ss"
              style={{ width: "100%" }}
            />
          </FormItem>
        </Flex>

        <FormItem label="Eligibility conditions" name="eligibilityConditions">
          <Checkbox.Group
            options={conditionOptions}
            style={{ width: "100%", gap: "16px" }}
          />
        </FormItem>

        <FormItem label="Description">
          <Input.TextArea placeholder="Enter your description" rows={3} />
        </FormItem>

        <FormItem>
          <Upload.Dragger {...bannerUploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            {/* <p className="ant-upload-text"></p> */}
            <p className="ant-upload-hint">
              Recommended size: 640 x 320px (2:1)
            </p>

            <Button type="link" icon={<UploadOutlined />}>
              Upload banner
            </Button>
          </Upload.Dragger>
        </FormItem>
      </Form>
    </Create>
  );
};
