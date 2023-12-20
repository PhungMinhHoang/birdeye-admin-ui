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
import { DollarOutlined, GiftOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UserList } from "./pages/users";
import { TokenList, TokenShow } from "./pages/tokens";
import { UserShow } from "./pages/users";
import { RewardList } from "./pages/rewards";

import { AntdInferencer } from "@refinedev/inferencer/antd"; // Component for auto-generate crud

function App() {
  const { t, i18n } = useTranslation();

  //const API_URL = "https://api.fake-rest.refine.dev";
  const API_URL = "https://6579378af08799dc80468509.mockapi.io";
  const dataProvider = customDataProvider(API_URL);

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
                    name: "users",
                    list: "/users",
                    edit: "/users/:id",
                    show: "/users/:id",
                    meta: {
                      label: "Update user role",
                      icon: <UserOutlined />,
                    },
                  },
                  {
                    name: "rewards",
                    list: "/rewards",
                    create: "/rewards/create",
                    icon: <GiftOutlined />,
                  },

                  // {
                  //   name: "blog_posts",
                  //   list: "/blog-posts",
                  //   create: "/blog-posts/create",
                  //   edit: "/blog-posts/edit/:id",
                  //   show: "/blog-posts/show/:id",
                  //   meta: {
                  //     canDelete: true,
                  //   },
                  // },
                  // {
                  //   name: "categories",
                  //   list: "/categories",
                  //   create: "/categories/create",
                  //   edit: "/categories/edit/:id",
                  //   show: "/categories/show/:id",
                  //   meta: {
                  //     canDelete: true,
                  //   },
                  // },
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
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path=":id" element={<UserShow />} />
                    </Route>
                    <Route path="/rewards">
                      <Route index element={<RewardList />} />
                      <Route path="create" element={<AntdInferencer />} />
                      {/* <Route path=":id" element={<UserShow />} /> */}
                    </Route>
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
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
