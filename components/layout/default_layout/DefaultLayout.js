import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import NavHeader from '../header/DefaultNavHeader';
import CommonLayout from '../CommonLayout';
import LoadingSuspense from '../../common/LoadingSuspense';
import { Layout } from 'antd';
import DefaultNavs from '../../../helpers/DefaultNavs';

const AsideLeft = dynamic(() => import('../AsideLeft'), { loading: () => <LoadingSuspense /> });

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
