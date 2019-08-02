import React, {useState} from "react";
import {Affix, Layout} from "antd";
import CustomFooter from "./Footer";
import "./layout.scss";
import AsideLeft from "./aside/AsideLeft";
import * as PropTypes from "prop-types";

const { Content, Sider } = Layout;

const CommonLayout = ({ navs, navHeader, children, footer }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
      <Layout>
        <Sider className="left_sider" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Affix>
            <AsideLeft collapsed={collapsed} navs={navs} />
          </Affix>
        </Sider>
        <Layout>
          <Affix>
            {navHeader}
          </Affix>
          <Content className="app_page">
            {children}
          </Content>
            {footer}
        </Layout>
      </Layout>
    );
};

CommonLayout.propTypes = {
    children: PropTypes.element.isRequired,
    navs: PropTypes.array,
    navHeader: PropTypes.element,
    footer: PropTypes.element,
};

export default CommonLayout;
