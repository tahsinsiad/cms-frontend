import React from "react";
import NavHeader from "../header/DefaultNavHeader";
import CommonLayout from "../CommonLayout";
import DefaultNavs from "../aside/DefaultNavs";
import * as PropTypes from "prop-types";
import CustomFooter from "../Footer";

const DefaultLayout = ({ children }) => {
    return (
      <CommonLayout navs={DefaultNavs} navHeader={<NavHeader />} footer={<CustomFooter />}>
        {children}
      </CommonLayout>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.element,
};

export default DefaultLayout;
