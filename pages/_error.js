import React from "react";
import ErrorPage from "../components/error_page/ErrorPage";
import * as PropTypes from "prop-types";

const DefaultErrorPage = (props) => {
    return (
        <ErrorPage status={props.statusCode || 400} subTitle={props.subTitle || "Sorry, something went wrong."}/>
    );
};

DefaultErrorPage.getInitialProps = ({res, err, statusCode}) => {
    // console.log(res.statusCode, err.statusCode, statusCode);
    statusCode = res ? res.statusCode : err ? err.statusCode : statusCode;
    const message = res ? res.data : err ? err.message : null;
    return {err, statusCode, subTitle: message || "Sorry! something went wrong."};
};

DefaultErrorPage.propTypes = {
    statusCode: PropTypes.number,
    subTitle: PropTypes.string
};

DefaultErrorPage.isSimpleLayout = true;

export default DefaultErrorPage;
