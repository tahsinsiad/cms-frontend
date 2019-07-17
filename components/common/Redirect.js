import Router from 'next/router'
import NextHead from "next/head";
import React from "react";

export const redirectTo = async (destination, {res, status} = {}) => {
    if (res) {
        res.writeHead(status || 302, {Location: destination});
        res.end()
    } else {
        return await Router.push(destination);
    }
};

const redirect = destination =>
    class RedirectRoute extends React.Component {
        static getInitialProps({res}) {
            if (typeof window === 'undefined' && !res.writeHead) {
                // This is the SSR mode
                return {metaRedirect: true}
            }

            return redirectTo(destination, {res, status: 301});
        }

        render() {
            if (this.props.metaRedirect) {
                return (
                    <NextHead>
                        <meta httpEquiv="refresh" content={`0; url=${destination}`}/>
                    </NextHead>
                )
            }

            return null
        }
    };

export default redirect
