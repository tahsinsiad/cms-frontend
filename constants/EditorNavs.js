import React from 'react';
import { Icon } from "antd";

const EditorNavs = [
    {
        key: 'project-setting',
        title: 'Project Setting',
        icon: <Icon type="setting" />,
        path: '/project',
        subMenu: null
    },
    {
        key: 'pages',
        title: 'Pages',
        icon: <Icon type="star" />,
        path: '/project',
        pathParam: 'pages',
        subMenu: null
    },
    {
        key: 'header',
        title: 'Header',
        icon: <Icon type="star" />,
        path: '/project',
        pathParam: 'header',
        subMenu: null
    },
    {
        key: 'footer',
        title: 'Footer',
        icon: <Icon type="star" />,
        path: '/project',
        pathParam: 'footer',
        subMenu: null
    },
];

export default EditorNavs;
