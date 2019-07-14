import App, { Container } from 'next/app'
import React from 'react'
import fetch from 'isomorphic-unfetch';
// import { mockFetch } from '../utils/mockFetch';
import { redirectTo } from '../components/common/Redirect'
import cookies from 'next-cookies';
import withContext from "../contexts/withContext";
import { ClientContext } from 'graphql-hooks'
import withGraphQLClient from "../utils/withGraphQLClient";

import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {API_BASE_URL, DASHBOARD_PATH, FORGOT_PASSWORD_PATH, LOGIN_PATH, RESOLVE_USER_URL} = publicRuntimeConfig;

class CMSApp extends App {
    static async getInitialProps({ Component, ctx }, graphQLClient) {
        let pageProps = {};
        let response = null;
        const c = cookies(ctx);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        //if the authtoken is not found
        if (typeof c.token == 'undefined') {
            //don't do anything if we are on a page that doesn't require credentials
            if (ctx.pathname === LOGIN_PATH || ctx.pathname === FORGOT_PASSWORD_PATH) return { pageProps };
            //if we are on any other page, redirect to the login page
            else redirectTo(LOGIN_PATH, { res: ctx.res, status: 301 })
        } else { //if we do have an auth token to check
            graphQLClient && graphQLClient.setHeaders({
                Authorization: `Bearer ${c.token}`
            });
            console.log(graphQLClient);
            // response = await mockFetch(API_BASE_URL + '/auth', {
            response = await fetch(RESOLVE_USER_URL, {
                method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${c.token}` },
                // body: JSON.stringify({ token: c.token })
            })
                .then(r => r.json())
                .then(resp => {
                    console.log("_app", resp);
                    if (ctx.pathname === "/") {

                        //if auth check was successful, send to dashboard
                        if (resp.status === "success") redirectTo(DASHBOARD_PATH, { res: ctx.res, status: 301 });
                        else {

                            //setting the cookie to expire way back when removes it
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            redirectTo(LOGIN_PATH, { res: ctx.res, status: 301 })

                        }

                    } else if (ctx.pathname === LOGIN_PATH) {

                        //shouldn't show the login page is we are already logged in
                        if (resp.status === "success") {
                            redirectTo(DASHBOARD_PATH, { res: ctx.res, status: 301 });
                        }

                        //if it wasn't successful, stay where we are
                        else return { ...pageProps, ...{ query: ctx.query, token: c.token } };

                    }

                    //any other page that requires a login
                    else {

                        //if auth check was successful, stay where we are
                        if (resp.status === "success") return {
                            ...pageProps, ...{
                                query: ctx.query,
                                token: c.token,
                                user: resp.data
                            }
                        };

                        //if it wasn't successful, clear the authtoken since it must be expired or invalid and redirect to login
                        else {
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            redirectTo(LOGIN_PATH, { res: ctx.res, status: 301 });
                        }
                    }

                })
                .catch((err) => {
                    console.log(err);
                    return { pageProps };
                })
        }

        if (response !== null) {
            return { pageProps: response };
        } else return { pageProps };

    }

    render() {
        const { Component, pageProps, graphQLClient } = this.props;
        const ComponentWithContext = withContext(Component, pageProps);

        // graphQLClient.setHeader("Authorization", `Bearer ${token}`);

        return (
            <Container>
                <ClientContext.Provider value={graphQLClient}>
                    <ComponentWithContext {...pageProps} />
                </ClientContext.Provider>
            </Container>
        )
    }
}

export default withGraphQLClient(CMSApp);
// export default CMSApp;
