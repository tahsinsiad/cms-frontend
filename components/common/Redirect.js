import Router from "next/router";
import NextHead from "next/head";
import React from "react";
import * as PropTypes from "prop-types";

export const redirectTo = async (destination, {res, status} = {}) => {
    //serverside response
    if (res) {
        res.writeHead(status || 302, {Location: destination});
        res.end();
    } else {
        //clientside response
        return await Router.push(destination);
    }
    return {};
};

const redirect = destination => {
    class RedirectRoute extends React.Component {
        static getInitialProps({res}) {
            if (typeof window === "undefined" && !res.writeHead) {
                // This is the SSR mode
                return {metaRedirect: true};
            }

            return redirectTo(destination, {res, status: 301});
        }

        render() {
            if (this.props.metaRedirect) {
                return (
                    <NextHead>
                        <meta httpEquiv="refresh" content={`0; url=${destination}`}/>
                    </NextHead>
                );
            }

            return null;
        }
    }

    RedirectRoute.propTypes = {
        metaRedirect: PropTypes.bool
    };
    return RedirectRoute;
};

export const MetaRedirect = ({to}) => {
    return (
        <NextHead>
            <meta httpEquiv="refresh" content={`0; url=${to}`}/>
        </NextHead>
    );
};

MetaRedirect.propTypes = {
    to: PropTypes.string
};

export default redirect;
