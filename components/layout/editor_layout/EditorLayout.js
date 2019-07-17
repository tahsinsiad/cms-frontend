import React from 'react';
import CommonLayout from '../CommonLayout';
import EditorNavs from '../../../constants/EditorNavs';

const EditorLayout = ({ children, navHeader }) => {
    return (
        <CommonLayout navs={EditorNavs} navHeader={navHeader}>
            {children}
        </CommonLayout>
    );
};

export default EditorLayout;
