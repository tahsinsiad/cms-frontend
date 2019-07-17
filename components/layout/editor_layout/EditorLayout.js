import React, { useState } from 'react';
import CommonLayout from '../CommonLayout';
import { Layout } from 'antd';
import EditorNavs from '../../../constants/EditorNavs';
import AsideLeft from '../AsideLeft';

const { Sider } = Layout;

const EditorLayout = ({ children, navHeader }) => {

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
            navHeader={navHeader}
        >
            {children}
        </CommonLayout>
    );
};

export default EditorLayout;
