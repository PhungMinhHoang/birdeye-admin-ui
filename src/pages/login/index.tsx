import React from "react";
import { useLogin } from "@refinedev/core";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import "./styles.css";
import { AppIcon } from "../../components/app-icon";

const { Title } = Typography;

export interface ILoginForm {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();

  const { mutate: login } = useLogin<ILoginForm>();

  const CardTitle = (
    <Title level={3} className="title">
      Sign in your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <div className="imageContainer">
              <AppIcon />
            </div>
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values);
                }}
                requiredMark={false}
                initialValues={{
                  username: "khanguyen",
                  password: "birdeyeso",
                }}
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>

                <Button type="primary" size="large" htmlType="submit" block>
                  Sign in
                </Button>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};
