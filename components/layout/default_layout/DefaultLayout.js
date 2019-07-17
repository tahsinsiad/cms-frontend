import React, { useState } from 'react';
import NavHeader from '../header/DefaultNavHeader';
import CommonLayout from '../CommonLayout';
import { Layout } from 'antd';
import DefaultNavs from '../../../constants/DefaultNavs';
import AsideLeft from '../AsideLeft';

const { Sider } = Layout;

const DefaultLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(true);

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    return (
        <CommonLayout
            sider={
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <AsideLeft collapsed={collapsed} navs={DefaultNavs} />
                </Sider>
            }
            navHeader={<NavHeader />}
        >
            {children}
        </CommonLayout>
    );
};

export default DefaultLayout;
