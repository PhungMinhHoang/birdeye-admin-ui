import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { AppIcon } from "../../components/app-icon";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          collapsed={false}
          text="Birdeye Admin"
          icon={<AppIcon />}
        />
      }
      registerLink={false}
      forgotPasswordLink={false}
      rememberMe={false}
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
    />
  );
};
