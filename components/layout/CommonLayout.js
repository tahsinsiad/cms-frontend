import React, {useState} from "react";
import {Affix, Layout} from "antd";
import CustomFooter from "./Footer";
import "../../static/scss/layout.scss";
import AsideLeft from "./aside/AsideLeft";
import * as PropTypes from "prop-types";

const { Content, Sider } = Layout;

const CommonLayout = ({ navs, navHeader, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Affix>
            <AsideLeft collapsed={collapsed} navs={navs} />
          </Affix>
        </Sider>
        <Layout>
          {navHeader}
          <Content className="app_page">
            {children}
          </Content>
          <CustomFooter />
        </Layout>
      </Layout>
    );
};

CommonLayout.propTypes = {
    children: PropTypes.element.isRequired,
    navs: PropTypes.array,
    navHeader: PropTypes.element,
};

export default CommonLayout;
