import React from "react";
import {Spin} from "antd";
import * as PropTypes from "prop-types";

const LoadingSuspense = ({height, width}) => {

    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height,
        width
    };

    return (
      <div style={style}>
        <Spin size="large" />
      </div>
    );
};

LoadingSuspense.defaultProps = {
    width: "100%",
    height: "100%"
};

LoadingSuspense.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default LoadingSuspense;
