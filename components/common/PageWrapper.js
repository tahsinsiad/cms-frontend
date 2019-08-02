import React, { Fragment } from "react";
import * as PropTypes from "prop-types";

const PageWrapper = ({ pageHeader, children, style }) => {
    return (
      <Fragment>
        <div className="page_header">
          {pageHeader}
        </div>
        <div className="page_content" style={style}>
          {children}
        </div>
      </Fragment>
    );
};

PageWrapper.propTypes = {
    pageHeader: PropTypes.element,
    children: PropTypes.element,
    style: PropTypes.object
};

export default PageWrapper;
