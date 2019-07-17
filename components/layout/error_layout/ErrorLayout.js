import React from 'react';
/* SCSS */
import './error_layout.scss';
import * as PropTypes from "prop-types";

const ErrorLayout = ({status, subTitle, children}) => {

    return (
        <div className="error_layout">
            <h1 className="status">{status}</h1>
            <h4 className="sub_title">{subTitle}</h4>
            <div>
                {children}
            </div>
        </div>
    );
};

ErrorLayout.prototypes = {
    status: PropTypes.number.isRequired,
    subTitle: PropTypes.string.isRequired
};

export default ErrorLayout;
