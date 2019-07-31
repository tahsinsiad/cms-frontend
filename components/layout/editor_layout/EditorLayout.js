import React from "react";
import CommonLayout from "../CommonLayout";
import ProjectNavs from "../aside/ProjectNavs";
import * as PropTypes from "prop-types";

const EditorLayout = ({ children, navHeader }) => {
    return (
      <CommonLayout navs={ProjectNavs} navHeader={navHeader}>
        {children}
      </CommonLayout>
    );
};

EditorLayout.propTypes = {
    children: PropTypes.element,
    navHeader: PropTypes.element
};

export default EditorLayout;
