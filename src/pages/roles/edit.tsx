import { BaseRecord, IResourceComponentsProps, useList } from "@refinedev/core";
import { Create, Edit, useForm } from "@refinedev/antd";
import { Card, Checkbox, Form, Input, Select } from "antd";
import { usePermission } from "../../hooks";
import { Permission, Resource } from "../../types";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type RoleType = {
  name: string;
  permissions: string[];
};

export const RoleEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading, form, onFinish } = useForm({
    resource: "roles",
  });

  const { data, isLoading } = useList({
    resource: "permissions",
  });

  const { convertDataPermission } = usePermission();
  const permissions = convertDataPermission((data?.data as Permission[]) ?? []);

  const onCheckAll = (ev: CheckboxChangeEvent, group: any) => {
    const isChecked = ev.target.checked;

    group.resources.forEach(({ options, resource }: Resource) => {
      const newValue = isChecked ? options.map(({ value }: BaseRecord) => value) : [];
      form.setFieldValue(`${group.group}/${resource}`, newValue);
    });
  };

  const handleSubmitForm = (formValues: any) => {
    const data = {
      name: formValues.name,
      permissionIds: Object.values(formValues).reduce(
        (result: Array<string>, curValue) => {
          if (Array.isArray(curValue)) {
            result = [...result, ...curValue];
          }
          return result;
        },
        []
      ),
    };

    onFinish(data);
  };

  return (
    <Edit
      isLoading={isLoading}
      // headerButtons={() => <></>}
      saveButtonProps={{ loading: formLoading, ...saveButtonProps }}
    >
      <Form
        form={form}
        {...formProps}
        layout="vertical"
        onFinish={handleSubmitForm}
      >
        <Form.Item label="Role name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter role name" />
        </Form.Item>

        {permissions.map((group) => (
          <Card
            key={group.groupName}
            title={group.groupName}
            style={{ marginTop: "24px" }}
            extra={
              <Checkbox onChange={(ev) => onCheckAll(ev, group)}>
                Select all
              </Checkbox>
            }
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr)",
                gap: "16px",
              }}
            >
              {group.resources.map((resource) => (
                <Form.Item
                  key={group.group + resource.resource}
                  name={group.group + "/" + resource.resource}
                  label={resource.resourceName}
                >
                  <Select
                    mode="multiple"
                    options={resource.options}
                    placeholder="Select permission"
                    showSearch={false}
                  />
                </Form.Item>
              ))}
            </div>
          </Card>
        ))}
      </Form>
    </Edit>
  );
};
