import { App as AntdApp } from "antd";
import {
  DollarOutlined,
  GiftOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AntdInferencer } from "@refinedev/inferencer/antd"; // Component for auto-generate crud
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider } from "./providers/authProvider";
import customDataProvider from "./providers/dataProvider";
import { accessControlProvider } from "./providers/accessControlProvider";

import axiosInstance from "./axios";
import { $permissions } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { CustomSider } from "./components/sider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CustomerList } from "./pages/customers";
import { TokenList, TokenShow } from "./pages/tokens";
import { CustomerShow } from "./pages/customers";
import { RewardList, RewardCreate } from "./pages/rewards";
import { UserList } from "./pages/users";
import { RoleList, RoleCreate } from "./pages/roles";

function App() {
  const { t, i18n } = useTranslation();

  //const API_URL = "https://api.fake-rest.refine.dev";
  const API_URL = "https://internal.birdeye.so";
  const dataProvider = customDataProvider(API_URL, axiosInstance);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                i18nProvider={i18nProvider}
                routerProvider={routerBindings}
                accessControlProvider={accessControlProvider}
                resources={[
                  {
                    name: "token/update-info-requests",
                    list: "/token/update-info-requests",
                    meta: {
                      label: "Update token info",
                      icon: <DollarOutlined />,
                      authority: $permissions.VIEW_TOKEN_INFO_REQUEST,
                    },
                  },
                  {
                    name: "customers",
                    list: "/customers",
                    edit: "/customers/:id",
                    show: "/customers/:id",
                    meta: {
                      label: "Update customer role",
                      icon: <UserOutlined />,
                    },
                  },
                  {
                    name: "rewards",
                    list: "/rewards",
                    create: "/rewards/create",
                    icon: <GiftOutlined />,
                  },
                  {
                    name: "admins",
                    list: "/admins",
                    icon: <UserAddOutlined />,
                    meta: {
                      authority: '*'
                    }
                  },
                  {
                    name: "roles",
                    list: "/roles",
                    create: "/roles/create",
                    icon: <SettingOutlined />,
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: false,
                  useNewQueryKeys: true,
                  projectId: "xJxHI1-6SHrVx-eo5B3p",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <CustomSider {...props} fixed />}
                          Title={({ collapsed }) => (
                            <ThemedTitleV2
                              collapsed={collapsed}
                              text="Birdeye Admin"
                              icon={<AppIcon />}
                            />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="tokens" />}
                    />
                    <Route path="/token/update-info-requests">
                      <Route index element={<TokenList />} />
                      <Route path=":id" element={<TokenShow />} />
                    </Route>
                    <Route path="/customers">
                      <Route index element={<CustomerList />} />
                      <Route path=":id" element={<CustomerShow />} />
                    </Route>
                    <Route path="/rewards">
                      <Route index element={<RewardList />} />
                      <Route path="create" element={<RewardCreate />} />
                      {/* <Route path=":id" element={<CustomerShow />} /> */}
                    </Route>
                    <Route path="/admins">
                      <Route index element={<UserList />} />
                    </Route>
                    <Route path="/roles">
                      <Route index element={<RoleList />} />
                      <Route path="create" element={<RoleCreate />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
