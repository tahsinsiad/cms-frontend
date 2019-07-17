import App, { Container } from 'next/app'
import React from 'react'
import fetch from 'isomorphic-unfetch';
// import { mockFetch } from '../utils/mockFetch';
import { redirectTo } from '../components/common/Redirect'
import nextCookie from 'next-cookies';
import withContext from "../utils/withContext";
import { ClientContext } from 'graphql-hooks'
import withGraphQLClient from "../utils/withGraphQLClient";
import {withAuthSync} from "../utils/withAuthSync";
import {auth} from "../utils/auth";

class CMSApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const { token, user } = nextCookie(ctx);

        const pageProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        // pageProps.token = token;
        // console.log("CMSApp initial props: ", {pageProps, token});
        return {pageProps, token, user}
    }

    componentDidCatch(error, _errorInfo) {
        super.componentDidCatch(error, _errorInfo);
        console.error(error, _errorInfo);
        message.error(error.message);
    }

    render() {
        // console.log(this.props);
        const { Component, pageProps, graphQLClient, user, token } = this.props;
        const ComponentWithContext = withContext(Component, user, token);

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
