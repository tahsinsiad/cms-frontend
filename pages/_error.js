import React from "react";
import ErrorPage from "../components/error_page/ErrorPage";
import * as PropTypes from "prop-types";

const DefaultErrorPage = (props) => {
    return (
      <ErrorPage status={props.statusCode || 400} subTitle="Sorry, something went wrong." />
    );
};

DefaultErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { err, statusCode };
};

DefaultErrorPage.propTypes = {
    statusCode: PropTypes.number
};

export default DefaultErrorPage;
