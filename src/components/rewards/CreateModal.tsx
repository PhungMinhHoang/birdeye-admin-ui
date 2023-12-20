import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useForm } from "@refinedev/antd";
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

const FormItem = Form.Item;

export const CreateModal: React.FC<any> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    showUploadList: false,
    onChange(info) {},
  };

  const typeSelectOptions = [
    { value: "first", label: "First come first serve" },
  ];

  const walletTypeSelectOptions = [
    { value: "evm", label: "EVM" },
    { value: "solana", label: "SOL" },
  ];

  const conditionOptions = [
    { value: "is_account", label: "Birdeye account" },
    { value: "added_wallet", label: "Wallet added to profile" },
    { value: "is_pro", label: "PRO member" },
  ];

  const bannerUploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {},
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Form {...formProps} layout="vertical">
      <FormItem label="Reward name:">
        <Input placeholder="Enter name" />
      </FormItem>

      <Flex gap={16}>
        <FormItem label="Reward offered by:" style={{ width: "50%" }}>
          <Flex gap={4}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Logo</Button>
            </Upload>

            <Input placeholder="Partner's name" />
          </Flex>
        </FormItem>
        <FormItem label="Type:" style={{ width: "50%" }}>
          <Select value="first" options={typeSelectOptions}></Select>
        </FormItem>
      </Flex>

      <Flex gap={16}>
        <FormItem label="Wallet type:" style={{ width: "50%" }}>
          <Select value="evm" options={walletTypeSelectOptions}></Select>
        </FormItem>

        <FormItem label="Expiration time:" style={{ width: "50%" }}>
          <DatePicker showTime style={{ width: "100%" }} />
        </FormItem>
      </Flex>

      <FormItem label="Eligibility conditions:">
        <Checkbox.Group
          options={conditionOptions}
          defaultValue={["is_account"]}
          style={{ width: "100%", gap: "16px" }}
        />
      </FormItem>

      <FormItem label="Description:">
        <Input.TextArea placeholder="Enter your description" rows={3} />
      </FormItem>

      <FormItem>
        <Upload.Dragger {...bannerUploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          {/* <p className="ant-upload-text"></p> */}
          <p className="ant-upload-hint">Recommended size: 640 x 320px (2:1)</p>

          <Button type="link" icon={<UploadOutlined />}>
            Upload banner
          </Button>
        </Upload.Dragger>
      </FormItem>

      <Divider />

      <Flex justify="space-between">
        <Flex align="center">
          Not ready?{" "}
          <Button type="link" style={{ padding: "0 5px" }}>
            Save for later
          </Button>
        </Flex>

        <Flex gap={12}>
          <Button type="default">Discard</Button>
          <Button type="primary">Publish</Button>
        </Flex>
      </Flex>
    </Form>
  );
};
