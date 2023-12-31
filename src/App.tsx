import { App as AntdApp } from "antd";
import {
  DollarOutlined,
  GiftOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { Authenticated, CanAccess, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { AntdInferencer } from "@refinedev/inferencer/antd"; // Component for auto-generate crud
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, accessControlProvider, findFallbackIndexRoute } from "./providers/authProvider";
import customDataProvider from "./providers/dataProvider";

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
import { TokenList } from "./pages/tokens";
import { CustomerShow } from "./pages/customers";
import { RewardList, RewardCreate } from "./pages/rewards";
import { UserList } from "./pages/users";
import { RoleList, RoleCreate, RoleEdit } from "./pages/roles";
import { useEffect, useState } from "react";

function App() {
  const { t, i18n } = useTranslation();

  const API_URL = import.meta.env.VITE_API_URL || "";
  const dataProvider = customDataProvider(API_URL, axiosInstance);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const resources = [
    {
      name: "token/update-info-requests",
      list: "/token/update-info-requests",
      meta: {
        label: "Update token info",
        icon: <DollarOutlined />,
        authority: {
          list: $permissions.VIEW_TOKEN_INFO_REQUEST,
        },
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
        authority: {
          list: $permissions.VIEW_ADMIN,
          create: $permissions.CREATE_ADMIN,
          edit: $permissions.UPDATE_ADMIN,
          delete: $permissions.DELETE_ADMIN,
        },
      },
    },
    {
      name: "roles",
      list: "/roles",
      create: "/roles/create",
      edit: "/roles/:id",
      icon: <SettingOutlined />,
      meta: {
        authority: {
          list: $permissions.VIEW_ROLE,
          create: $permissions.CREATE_ROLE,
          edit: $permissions.UPDATE_ROLE,
          delete: $permissions.DELETE_ROLE,
        },
      },
    },
  ];

  const [fallbackIndexRoute, setFallbackIndexRoute] = useState("");

  useEffect(() => {
    const routeData = resources.map(resource => ({path: resource.list, authority: resource.meta?.authority?.list}))
    setFallbackIndexRoute(findFallbackIndexRoute(routeData))
  }, []);

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
                resources={resources}
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
                        fallback={<Navigate to="/login" />}
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
                      element={
                        <Navigate to={fallbackIndexRoute} />
                        //  <NavigateToResource resource={"admins"} />
                      }
                    />

                    <Route
                      element={
                        <CanAccess fallback={<ErrorComponent />}>
                          <Outlet />
                        </CanAccess>
                      }
                    >
                      <Route path="/token/update-info-requests">
                        <Route index element={<TokenList />} />
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
                        <Route path=":id" element={<RoleEdit />} />
                      </Route>
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  </Route>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <Navigate to={fallbackIndexRoute} />
                        {/* <NavigateToResource resource={fallbackIndexRoute}/> */}
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
