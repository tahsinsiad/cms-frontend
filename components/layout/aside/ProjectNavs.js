import React from 'react';
import {Icon, message} from "antd";
import {executeAllPagesQuery} from "../../../utils/graphQLClientHelper";
import {injectParamsAndGraphQLClient} from "../../../utils/helpers";

export const getProjectNavs = (params, graphQLClient) => {
    const navs = [
        {
            key: 'project-setting',
            title: 'Project Setting',
            icon: <Icon type="setting"/>,
            path: '/project',
            subMenu: null
        },
        (() => {
            const nav = {
                key: 'pages',
                title: 'Pages',
                icon: <Icon type="star"/>,
                path: '/project',
                pathParam: 'pages',
                lazySubmenu: true,
                subMenu: [],
                graphQLClient: null
            };
            nav.onClick = ([navs, setNavs]) => {
                if (!nav.graphQLClient) {
                    message.error("Unexpected Error!");
                    console.error("GraphQLClient is not initialized!");
                }
                executeAllPagesQuery(nav.graphQLClient, nav.queryParam.id)
                    .then(response => {
                        console.log("projectPages response: ", response);
                        const newNav = {
                            ...nav,
                            subMenu: response.data ? response.data.allPages : [],
                            lazySubmenu: false
                        };
                        const newNavs = Object.assign([], navs, {[navs.findIndex((item) => nav.key === item.key)]: newNav});
                        setNavs(newNavs);
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error(err.message);
                    })
            };
            return nav;
        })(),
        {
            key: 'header',
            title: 'Header',
            icon: <Icon type="star"/>,
            path: '/project',
            pathParam: 'header',
            subMenu: null
        },
        {
            key: 'footer',
            title: 'Footer',
            icon: <Icon type="star"/>,
            path: '/project',
            pathParam: 'footer',
            subMenu: null
        },
    ];
    injectParamsAndGraphQLClient(navs, params, graphQLClient);
    return navs;
};
