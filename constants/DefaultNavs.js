import React from 'react';
import { Icon } from "antd";
import { DASHBOARD_PATH, LOGIN_PATH, ERROR_PAGE, ABOUT_PATH } from './URLs';

const DefaultNavs = [
    {
        key: 'dashboard',
        title: 'Dashboard',
        path: DASHBOARD_PATH,
        icon: <Icon type="pie-chart" />,
        subMenu: null
    },
    {
        key: 'about',
        title: 'About',
        path: ABOUT_PATH,
        icon: <Icon type="user" />,
        subMenu: null
    },
    {
        key: 'pages',
        title: 'Pages',
        icon: <Icon type="star" />,
        subMenu: [
            {
                key: 'login',
                title: 'Login',
                path: LOGIN_PATH,
                icon: <Icon type="login" />,
                subMenu: null
            },
            {
                key: '_error',
                title: 'Error',
                path: ERROR_PAGE,
            }
        ]
    }
];

export default DefaultNavs;
