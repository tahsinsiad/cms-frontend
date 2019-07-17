import React from 'react';
import NavHeader from '../header/DefaultNavHeader';
import CommonLayout from '../CommonLayout';
import DefaultNavs from '../../../constants/DefaultNavs';

const DefaultLayout = ({ children }) => {
    return (
        <CommonLayout navs={DefaultNavs} navHeader={<NavHeader />}>
            {children}
        </CommonLayout>
    );
};

export default DefaultLayout;
