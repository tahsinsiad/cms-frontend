import React from "react";
import {Icon, message} from "antd";
import {executeAllPagesQuery, executeCreateNewPageQuery} from "../../../utils/graphQLClientHelper";
import {injectParams} from "../../../utils/helpers";
import WrappedSettings from "../../../pages/project/settings";
import WrappedPages from "../../../pages/project/pages";
import WrappedHeaders from "../../../pages/project/headers";
import WrappedFooters from "../../../pages/project/footers";

export const getProjectMenuItems = (params, graphQLClient) => {
    const menuItems = {
        "settings": {
            key: "settings",
            title: "Project Setting",
            icon: <Icon type="setting"/>,
            path: WrappedSettings.routeInfo.path,
            subMenu: null
        },
        pages: {
            key: "pages",
            title: "Pages",
            icon: <Icon type="snippets"/>,
            path: WrappedPages.routeInfo.path,
            lazySubmenu: true,
            subMenu: [{
                key: "create-new-page",
                title: "",
                icon: <Icon type="plus"/>,
                className: "create-new-page",
                subMenu: null,
                onClick: ({menuItems, setMenuItems}, targetMenuItem) => {
                    if (!graphQLClient) {
                        message.error("Unexpected Error!");
                        console.error("GraphQLClient is not initialized!");
                    }
                    executeCreateNewPageQuery(graphQLClient, params.query.id)
                        .then(data => {
                            console.log("createNewPage response: ", data);
                            const newMenuItem = {
                                ...menuItems["pages"],
                                subMenu: [...menuItems["pages"].subMenu, data.addPage],
                                lazySubmenu: false
                            };
                            const newNavs = Object.assign({}, menuItems, {pages: newMenuItem});
                            setMenuItems(newNavs);
                        })
                        .catch((errors) => {
                            console.error(errors);
                            message.error(errors[0].message);
                        });
                }
            }],
            graphQLClient: null,
            onClick: ({menuItems, setMenuItems}, targetMenuItem) => {
                if (!graphQLClient) {
                    message.error("Unexpected Error!");
                    console.error("GraphQLClient is not initialized!");
                }
                executeAllPagesQuery(graphQLClient, params.query.id)
                    .then(data => {
                        console.log("projectPages response: ", data);
                        const newMenuItem = {
                            ...targetMenuItem,
                            subMenu: data ? [...targetMenuItem.subMenu, ...data.allPages] : targetMenuItem.subMenu,
                            lazySubmenu: false
                        };
                        const newMenuItems = Object.assign({}, menuItems, {pages: newMenuItem});
                        setMenuItems(newMenuItems);
                    })
                    .catch((errors) => {
                        console.error(errors);
                        message.error(errors[0].message);
                    });
            }
        },
        header: {
            key: "header",
            title: "Header",
            icon: <Icon type="star"/>,
            path: WrappedHeaders.routeInfo.path,
            subMenu: null
        },
        footer: {
            key: "footer",
            title: "Footer",
            icon: <Icon type="star"/>,
            path: WrappedFooters.routeInfo.path,
            subMenu: null
        },
    };
    injectParams(menuItems, params);
    return menuItems;
};
