import React from 'react';
import CommonLayout from '../CommonLayout';
import ProjectNavs from '../aside/ProjectNavs';

const EditorLayout = ({ children, navHeader }) => {
    return (
        <CommonLayout navs={ProjectNavs} navHeader={navHeader}>
            {children}
        </CommonLayout>
    );
};

export default EditorLayout;
