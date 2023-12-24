import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  useActiveAuthProvider,
  useGetIdentity,
  useGetLocale,
  useLogout,
  useSetLocale,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";
import {
  Avatar,
  Button,
  Dropdown,
  Layout as AntdLayout,
  MenuProps,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  _id: number;
  username: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const currentLocale = locale();

  // const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
  //   .sort()
  //   .map((lang: string) => ({
  //     key: lang,
  //     onClick: () => changeLanguage(lang),
  //     icon: (
  //       <span style={{ marginRight: 8 }}>
  //         <Avatar size={16} src={`/images/flags/${lang}.svg`} />
  //       </span>
  //     ),
  //     label: lang === "en" ? "English" : "German",
  //   }));

  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const translate = useTranslate();
  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        {/* <Dropdown
          menu={{
            items: menuItems,
            selectedKeys: currentLocale ? [currentLocale] : [],
          }}
        >
          <Button type="text">
            <Space>
              <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
              {currentLocale === "en" ? "English" : "German"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown> */}
        {/* <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        /> */}

        <Dropdown
          menu={{
            items: userMenuItems,
          }}
        >
          <div style={{ cursor: "pointer" }}>
            {user?.username && <Text strong>{user.username}</Text>}
          </div>
        </Dropdown>
      </Space>
    </AntdLayout.Header>
  );
};
