import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import EditorNavHeader from '../header/EditorNavHeader';
import CommonLayout from '../CommonLayout';
import LoadingSuspense from '../../common/LoadingSuspense';
import { Layout } from 'antd';
import EditorNavs from '../../../helpers/EditorNavs';

const AsideLeft = dynamic(() => import('../AsideLeft'), { loading: () => <LoadingSuspense /> });

const { Sider } = Layout;

const EditorLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    return (
        <CommonLayout
            sider={
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <AsideLeft collapsed={collapsed} navs={EditorNavs} />
                </Sider>
            }
            navHeader={<EditorNavHeader />}
        >
            {children}
        </CommonLayout>
    );
};

export default EditorLayout;
