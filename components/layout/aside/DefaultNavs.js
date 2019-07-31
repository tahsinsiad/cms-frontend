import React from "react";
import { Icon } from "antd";
import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH, LOGIN_PATH, ERROR_PAGE, ABOUT_PATH} = publicRuntimeConfig;

const DefaultNavs = [
    {
        key: "dashboard",
        title: "Dashboard",
        path: DASHBOARD_PATH,
        icon: <Icon type="pie-chart" />,
        subMenu: null
    },
    {
        key: "about",
        title: "About",
        path: ABOUT_PATH,
        icon: <Icon type="user" />,
        subMenu: null
    },
    {
        key: "login",
        title: "Login",
        path: LOGIN_PATH,
        icon: <Icon type="login" />,
        subMenu: null
    }
];

export default DefaultNavs;
