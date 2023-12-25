import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { CustomSider } from "./components/sider";

import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import customDataProvider from "./dataProvider";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import {
  DollarOutlined,
  GiftOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { CustomerList } from "./pages/customers";
import { TokenList, TokenShow } from "./pages/tokens";
import { CustomerShow } from "./pages/customers";
import { RewardList, RewardCreate } from "./pages/rewards";
import { UserList } from "./pages/users";

import { AntdInferencer } from "@refinedev/inferencer/antd"; // Component for auto-generate crud
import axiosInstance from "./axios";

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
                resources={[
                  {
                    name: "tokens",
                    list: "/tokens",
                    show: "/tokens/:id",
                    meta: {
                      label: "Update token info",
                      icon: <DollarOutlined />,
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
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
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
                    <Route path="/tokens">
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
                {/* <UnsavedChangesNotifier /> */}
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
