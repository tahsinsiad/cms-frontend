import React, {Fragment, useState} from "react";
import {Icon, Menu} from "antd";
import Brand from "../brand/Brand";
import Link from "next/link";
import getConfig from "next/config";
import "./aside.scss";
import * as PropTypes from "prop-types";

const {publicRuntimeConfig} = getConfig();
const {ROOT_PATH} = publicRuntimeConfig;

const {SubMenu} = Menu;

const AsideLeft = ({collapsed, navs}) => {

    const headerLogoClassName = collapsed ? "brand collapsed" : "brand";

    const navsState = useState(navs);

    /* Menu Binding Start */
    const getMenuItems = (item) => {
        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    };

    const bindSingleMenuItem = (item) => {
        return (
          <Menu.Item key={item.key}>
            {item.icon}
            <span>{item.title}</span>
            {item.path && <Link href={item.path} as={item.pathAs}><a onClick={() => {
                    console.log("clicked", item);
                    typeof item.onClick === "function" && item.onClick(navsState);
                }} /></Link>}
          </Menu.Item>
        );
    };

    const bindSubMenuItem = (item) => {
        if (item.lazySubmenu) {
            return (
              <SubMenu
                onTitleClick={()=>{
                        console.log("clicked", item);
                        typeof item.onClick === "function" && item.onClick(navsState);
                    }}
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

    return (
      <Fragment>
        <Link href={ROOT_PATH}>
          <a><Brand brandText={"Logo"} icon={<Icon style={{color: "#ff0000"}} type="dingding" />}
            className={headerLogoClassName} /></a>
        </Link>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {navsState[0].map(item => getMenuItems(item))}
        </Menu>
      </Fragment>
    );
};

AsideLeft.propTypes = {
    collapsed: PropTypes.bool,
    navs: PropTypes.array
};

AsideLeft.defaultProps = {
    navs: []
};

export default AsideLeft;
