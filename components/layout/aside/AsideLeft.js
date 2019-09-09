import React, {Fragment, useEffect} from "react";
import {Icon, Menu} from "antd";
import Brand from "../brand/Brand";
import Link from "next/link";
import getConfig from "next/config";
import "./aside.scss";
import * as PropTypes from "prop-types";
import {withRouter} from "next/router";
import {MenuContext} from "../../../contexts/MenuContextProvider";

const {publicRuntimeConfig} = getConfig();
const {ROOT_PATH} = publicRuntimeConfig;

const {SubMenu} = Menu;

const AsideLeft = ({collapsed, router, style}) => {
    const menuContext = React.useContext(MenuContext);
    const headerLogoClassName = collapsed ? "brand collapsed" : "brand";

    /* Menu Binding Start */
    const getMenuItems = (item) => {
        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    };

    const bindSingleMenuItem = (item) => {
        return (
            <Menu.Item
                onClick={() => {
                    console.log("clicked", item);
                    typeof item.onClick === "function" && item.onClick(menuContext, item);
                    menuContext.setSelectedKeys([item.key]);
                }}
                className={item.className}
                key={item.key}>
                {item.icon}
                <span>{item.title}</span>
                {item.path && <Link href={item.path} as={item.pathAs}><a/></Link>}
            </Menu.Item>
        );
    };

    const bindSubMenuItem = (item) => {
        if (router.query.component === item.key) {
            if (item.lazySubmenu) {
                typeof item.onClick === "function" && item.onClick(menuContext, item);
                item.onClick = null;
            }
        }

        if (item.lazySubmenu) {
            return (
                <SubMenu
                    onTitleClick={() => {
                        console.log("clicked", item);
                        typeof item.onClick === "function" && item.onClick(menuContext, item);
                        if (!collapsed) {
                            menuContext.setOpenedKeys(menuContext.openedKeys[0] === item.key ? [] : [item.key]);
                        }
                    }}
                    onTitleMouseEnter={() => collapsed && menuContext.setOpenedKeys([item.key])}
                    onTitleMouseLeave={() => collapsed && menuContext.setOpenedKeys([])}
                    key={item.key}
                    title={
                        <span>
                    {item.icon}
                            <span>{item.title}</span>
                  </span>
                    }
                >
                    <div key="__skeleton" className="submenu-skeleton">
                        <div className="submenu-skeleton-content">
                            <ul className="submenu-skeleton-paragraph">
                                <li style={{width: "100%"}}/>
                            </ul>
                        </div>
                    </div>
                </SubMenu>
            );
        }
        return (
            <SubMenu
                onTitleClick={() => {
                    console.log("clicked", item);
                    // typeof item.onClick === "function" && item.onClick(navsState);
                    if (!collapsed) {
                        menuContext.setOpenedKeys(menuContext.openedKeys[0] === item.key ? [] : [item.key]);
                    }
                }}
                onTitleMouseEnter={() => collapsed && menuContext.setOpenedKeys([item.key])}
                onTitleMouseLeave={() => collapsed && menuContext.setOpenedKeys([])}
                key={item.key}
                title={
                    <span>
                {item.icon}
                        <span>{item.title}</span>
              </span>
                }
            >
                {item.subMenu.map(item => getMenuItems(item))}
            </SubMenu>
        );
    };
    /* Menu Binding End */

    // useEffect(() => {
    //     if (newSelectedKeys) {
    //         setSelectedKeys(newSelectedKeys);
    //     }
    //     if (newOpenedKeys) {
    //         setOpenedKeys(newOpenedKeys);
    //     }
    // }, [navsState[0]]);

    useEffect(() => {
        if (collapsed) menuContext.setOpenedKeys([]);
        else {
            menuContext.setOpenedKeys([router.query.component]);
        }
    }, [collapsed]);

    return (
        <Fragment>
            <Link href={ROOT_PATH}>
                <a><Brand brandText={"Pi-CMS"} icon={<Icon style={{color: "#ff0000"}} type="dingding"/>}
                          className={headerLogoClassName}/></a>
            </Link>
            <Menu theme="dark" selectedKeys={menuContext.selectedKeys} openKeys={menuContext.openedKeys} mode="inline"
                  style={style}>
                {Object.values(menuContext.menuItems).map(item => getMenuItems(item))}
            </Menu>
        </Fragment>
    );
};

AsideLeft.propTypes = {
    collapsed: PropTypes.bool,
    router: PropTypes.object,
    style: PropTypes.object
};

export default withRouter(AsideLeft);
