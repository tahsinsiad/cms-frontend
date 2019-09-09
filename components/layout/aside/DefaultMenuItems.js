import React from "react";
import {Icon} from "antd";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH, ABOUT_PATH} = publicRuntimeConfig;

const DefaultMenuItems = {
    dashboard: {
        key: "dashboard",
        title: "Dashboard",
        path: DASHBOARD_PATH,
        icon: <Icon type="pie-chart" />,
        subMenu: null
    },
    about: {
        key: "about",
        title: "About",
        path: ABOUT_PATH,
        icon: <Icon type="user" />,
        subMenu: null
    }
};

export default DefaultMenuItems;
