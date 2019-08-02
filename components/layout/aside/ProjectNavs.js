import React from "react";
import {Icon, message} from "antd";
import {executeAllPagesQuery} from "../../../utils/graphQLClientHelper";
import {injectParamsAndGraphQLClient} from "../../../utils/helpers";

export const getProjectNavs = (params, graphQLClient) => {
    const navs = [
        {
            key: "project-setting",
            title: "Project Setting",
            icon: <Icon type="setting" />,
            path: "/project",
            subMenu: null
        },
        (() => {
            const nav = {
                key: "pages",
                title: "Pages",
                icon: <Icon type="snippets" />,
                path: "/project",
                pathParam: "pages",
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
                    .then(data => {
                        console.log("projectPages response: ", data);
                        const newNav = {
                            ...nav,
                            subMenu: data ? data.allPages : [],
                            lazySubmenu: false
                        };
                        const newNavs = Object.assign([], navs, {[navs.findIndex((item) => nav.key === item.key)]: newNav});
                        setNavs(newNavs);
                    })
                    .catch((errors) => {
                        console.error(errors);
                        message.error(errors[0].message);
                    });
            };
            return nav;
        })(),
        {
            key: "header",
            title: "Header",
            icon: <Icon type="star" />,
            path: "/project",
            pathParam: "header",
            subMenu: null
        },
        {
            key: "footer",
            title: "Footer",
            icon: <Icon type="star" />,
            path: "/project",
            pathParam: "footer",
            subMenu: null
        },
    ];
    injectParamsAndGraphQLClient(navs, params, graphQLClient);
    return navs;
};
