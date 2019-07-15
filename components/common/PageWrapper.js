import React, { Fragment } from 'react';

const PageWrapper = ({ pageHeader, children }) => {
    return (
        <Fragment>
            <div className="page_header">
                {pageHeader}
            </div>
            <div className="page_content">
                {children}
            </div>
        </Fragment>
    );
};

export default PageWrapper;
