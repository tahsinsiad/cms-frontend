import React, {useContext} from "react";
import {Avatar, Dropdown, Layout, Menu} from "antd";
import Link from "next/link";
/* SCSS */
import "./nav_header.scss";
import {AuthContext} from "../../../contexts/AuthContextProvider";

const {Header} = Layout;

const NavHeader = () => {

    const authContext = useContext(AuthContext);

    const logout = () => {
        return authContext.logoutRequest();
    };

    const menu = (
        <Menu style={{minWidth: "120px"}} theme="dark">
            <Menu.Item key="0">
                <Link href=""><a>Profile</a></Link>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1" onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="nav_header">
            <Dropdown className="drop_down" overlay={menu} trigger={["click"]}>
                <div>
                    <span style={{color: "white"}}>{authContext.user && authContext.user.name}</span> &nbsp;
                    <Avatar size="large" icon="user" className="ant-dropdown-link"/>
                </div>
            </Dropdown>
        </Header>
    );
};

export default NavHeader;
