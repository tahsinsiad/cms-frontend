import App, { Container } from "next/app";
import React from "react";
import nextCookie from "next-cookies";
import { ClientContext } from "graphql-hooks";
import withGraphQLClient from "../utils/withGraphQLClient";
import AuthContextProvider from "../contexts/AuthContextProvider";
import DataStoreContextProvider from "../contexts/DataStoreContextProvider";
import Router from "next/router";

Router.events.on("routeChangeComplete", () => {
    if (process.env.NODE_ENV !== "production") {
        const els = document.querySelectorAll("link[href*=\"/_next/static/css/styles.chunk.css\"]");
        const timestamp = new Date().valueOf();
        els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp;
    }
});

class CMSApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const { token, user } = nextCookie(ctx);

        const pageProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        // pageProps.token = token;
        // console.log("CMSApp initial props: ", {pageProps, token});
        return {pageProps, token, user: user ? JSON.parse(user) : null};
    }

    componentDidCatch(error, _errorInfo) {
        super.componentDidCatch(error, _errorInfo);
        console.error(error, _errorInfo);
        message.error(error.message);
    }

    render() {
        // console.log(this.props);
        const { Component, pageProps, graphQLClient, user, token } = this.props;
        // const ComponentWithContext = withContext(Component, user, token);

        // graphQLClient.setHeader("Authorization", `Bearer ${token}`);

        return (
          <Container>
            <ClientContext.Provider value={graphQLClient}>
              <AuthContextProvider {...{user, token}}>
                <DataStoreContextProvider>
                  <Component {...pageProps} />
                </DataStoreContextProvider>
              </AuthContextProvider>
            </ClientContext.Provider>
          </Container>
        );
    }
}

export default withGraphQLClient(CMSApp);
// export default CMSApp;
