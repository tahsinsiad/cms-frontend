import React from "react";
import {Icon, message} from "antd";
import {executeAllPagesQuery, executeCreateNewPageQuery} from "../../../utils/graphQLClientHelper";
import {injectParams} from "../../../utils/helpers";

export const getProjectNavs = (params, graphQLClient) => {
    const navs = [
        {
            key: "project-setting",
            title: "Project Setting",
            icon: <Icon type="setting"/>,
            path: "/project",
            subMenu: null
        },
        {
            key: "pages",
            title: "Pages",
            icon: <Icon type="snippets"/>,
            path: "/project",
            pathParam: "pages",
            lazySubmenu: true,
            subMenu: [{
                key: "create-new-page",
                title: "",
                icon: <Icon type="plus"/>,
                className: "create-new-page",
                subMenu: null,
                onClick: ([navs, setNavs], targetNav) => {
                    if (!graphQLClient) {
                        message.error("Unexpected Error!");
                        console.error("GraphQLClient is not initialized!");
                    }
                    executeCreateNewPageQuery(graphQLClient, params.query.id)
                        .then(data => {
                            console.log("createNewPage response: ", data);
                            const pagesNavIndex = navs.findIndex((item)=>item.key==="pages");
                            const newNav = {
                                ...navs[pagesNavIndex],
                                subMenu: [...navs[pagesNavIndex].subMenu, data.addPage],
                                lazySubmenu: false
                            };
                            const newNavs = Object.assign([], navs, {[pagesNavIndex]: newNav});
                            setNavs(newNavs);
                        })
                        .catch((errors) => {
                            console.error(errors);
                            message.error(errors[0].message);
                        });
                }
            }],
            graphQLClient: null,
            onClick: ([navs, setNavs], targetNav) => {
                if (!graphQLClient) {
                    message.error("Unexpected Error!");
                    console.error("GraphQLClient is not initialized!");
                }
                executeAllPagesQuery(graphQLClient, params.query.id)
                    .then(data => {
                        console.log("projectPages response: ", data);
                        const newNav = {
                            ...targetNav,
                            subMenu: data ? [...targetNav.subMenu, ...data.allPages] : targetNav.subMenu,
                            lazySubmenu: false
                        };
                        const newNavs = Object.assign([], navs, {[navs.findIndex((item) => targetNav.key === item.key)]: newNav});
                        setNavs(newNavs);
                    })
                    .catch((errors) => {
                        console.error(errors);
                        message.error(errors[0].message);
                    });
            }
        },
        {
            key: "header",
            title: "Header",
            icon: <Icon type="star"/>,
            path: "/project",
            pathParam: "header",
            subMenu: null
        },
        {
            key: "footer",
            title: "Footer",
            icon: <Icon type="star"/>,
            path: "/project",
            pathParam: "footer",
            subMenu: null
        },
    ];
    injectParams(navs, params);
    return navs;
};
