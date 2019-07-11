import React from 'react';
import { Layout } from 'antd';
import CustomFooter from './Footer';
import '../../static/scss/layout.scss';

const { Content } = Layout;

const CommonLayout = ({ sider, navHeader, children }) => {
    return (
        <Layout>
            {sider}
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

export default CommonLayout;
