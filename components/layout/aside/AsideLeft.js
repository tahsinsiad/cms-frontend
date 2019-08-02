import React, {Fragment, useEffect, useState} from "react";
import {Icon, Menu} from "antd";
import Brand from "../brand/Brand";
import Link from "next/link";
import getConfig from "next/config";
import "./aside.scss";
import * as PropTypes from "prop-types";
import {withRouter} from "next/router";

const {publicRuntimeConfig} = getConfig();
const {ROOT_PATH} = publicRuntimeConfig;

const {SubMenu} = Menu;

const AsideLeft = ({collapsed, navs, router}) => {

    const headerLogoClassName = collapsed ? "brand collapsed" : "brand";

    const navsState = useState(navs);
    const [selectedKeys, setSelectedKeys] = useState([navsState[0][0].key]);
    const [openedKeys, setOpenedKeys] = useState([]);
    let newSelectedKeys;
    let newOpenedKeys;

    /* Menu Binding Start */
    const getMenuItems = (item) => {
        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    };

    const bindSingleMenuItem = (item) => {
        if (router.pathname === item.path) newSelectedKeys = [item.key];
        if (router.query.component === item.key) newSelectedKeys = [item.key];
        if (router.query.subComponent === item.key) {
            // typeof item.onClick === "function" && item.onClick(navsState);
            // selectedKeys.push(item.key);
            newSelectedKeys = [item.key];
        }
        return (
          <Menu.Item
            onClick={()=>{
                  console.log("clicked", item);
                  typeof item.onClick === "function" && item.onClick(navsState);
                  setSelectedKeys([item.key]);
              }}
            key={item.key}>
            {item.icon}
            <span>{item.title}</span>
            {item.path && <Link href={item.path} as={item.pathAs}><a /></Link>}
          </Menu.Item>
        );
    };

    const bindSubMenuItem = (item) => {
        if (router.query.component === item.key) {
            if (item.lazySubmenu) {
                typeof item.onClick === "function" && item.onClick(navsState);
                item.onClick = null;
            }
            // typeof item.onClick === "function" && item.onClick(navsState);
            // newSelectedKeys = selectedKeys.concat(item.key);
            // newSelectedKeys = [item.key];
            if (!collapsed) newOpenedKeys = [item.key];
        }

        if (item.lazySubmenu) {
            return (
              <SubMenu
                onTitleClick={()=>{
                        console.log("clicked", item);
                        typeof item.onClick === "function" && item.onClick(navsState);
                        if (!collapsed) {
                            setOpenedKeys(openedKeys[0] === item.key ? [] : [item.key]);
                        }
                    }}
                onTitleMouseEnter={()=>collapsed && setOpenedKeys([item.key])}
                onTitleMouseLeave={()=>collapsed && setOpenedKeys([])}
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
                      <li style={{width: "100%"}} />
                    </ul>
                  </div>
                </div>
              </SubMenu>
            );
        }
        return (
          <SubMenu
            onTitleClick={()=>{
              console.log("clicked", item);
              // typeof item.onClick === "function" && item.onClick(navsState);
                if (!collapsed) {
                    setOpenedKeys(openedKeys[0] === item.key ? [] : [item.key]);
                }
            }}
            onTitleMouseEnter={()=>collapsed && setOpenedKeys([item.key])}
            onTitleMouseLeave={()=>collapsed && setOpenedKeys([])}
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

    useEffect(()=>{
        if (newSelectedKeys) {
            setSelectedKeys(newSelectedKeys);
        }
        if (newOpenedKeys) {
            setOpenedKeys(newOpenedKeys);
        }
    }, [navsState[0]]);

    useEffect(()=>{
        if (collapsed) setOpenedKeys([]);
        else {
            setOpenedKeys([router.query.component]);
        }
    }, [collapsed]);

    return (
      <Fragment>
        <Link href={ROOT_PATH}>
          <a><Brand brandText={"Pi-CMS"} icon={<Icon style={{color: "#ff0000"}} type="dingding" />}
            className={headerLogoClassName} /></a>
        </Link>
        <Menu theme="dark" selectedKeys={selectedKeys} openKeys={openedKeys} mode="inline">
          {navsState[0].map(item => getMenuItems(item))}
        </Menu>
      </Fragment>
    );
};

AsideLeft.propTypes = {
    collapsed: PropTypes.bool,
    navs: PropTypes.array,
    router: PropTypes.object
};

AsideLeft.defaultProps = {
    navs: []
};

export default withRouter(AsideLeft);
