import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const RoleCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: "roles",
  });

  return (
    <Create saveButtonProps={{ loading: formLoading, ...saveButtonProps }}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Role name" name="name">
          <Input placeholder="Enter role name" />
        </Form.Item>
      </Form>
    </Create>
  );
};
