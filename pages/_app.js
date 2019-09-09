import App from "next/app";
import React from "react";
import nextCookie from "next-cookies";
import {ClientContext} from "graphql-hooks";
import withGraphQLClient from "../utils/withGraphQLClient";
import AuthContextProvider from "../contexts/AuthContextProvider";
import DataStoreContextProvider from "../contexts/DataStoreContextProvider";
import Router from "next/router";
import NProgress from "nprogress";
import MenuContextProvider from "../contexts/MenuContextProvider";
import NavHeader from "../components/layout/header/DefaultNavHeader";
import CustomFooter from "../components/layout/Footer";
import CommonLayout from "../components/layout/CommonLayout";
import ProjectLayout from "../components/layout/ProjectLayout";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {PROJECT_PATH} = publicRuntimeConfig;

NProgress.configure({parent: "#__next", trickleSpeed: 400});

Router.events.on("routeChangeStart", url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeComplete", () => {
    if (process.env.NODE_ENV !== "production") {
        const els = document.querySelectorAll("link[href*=\"/_next/static/css/styles.chunk.css\"]");
        const timestamp = new Date().valueOf();
        els[0] && (els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp);
    }
    NProgress.done();
});

let loadDeferredStyles = function () {
    console.log("defering css load");
    let addStylesNode = document.getElementById("deferred-styles");
    if (addStylesNode) {
        let replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);
    }
};
if (typeof window !== "undefined") {
    let raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    if (raf) raf(function () {
        window.setTimeout(loadDeferredStyles, 0);
    });
    else window.addEventListener("load", loadDeferredStyles);
}

class CMSApp extends App {
    static async getInitialProps({Component, ctx}) {
        const {token, user} = nextCookie(ctx);

        const pageProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx)) || {};

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
        const {Component, pageProps, graphQLClient, router, user, token} = this.props;

        function renderSwitchCase() {
            if (router.pathname.startsWith(PROJECT_PATH)) {
                return <ProjectLayout>
                    <Component {...pageProps} />
                </ProjectLayout>;
            } else {
                return <CommonLayout navHeader={<NavHeader/>} footer={<CustomFooter/>}>
                    <Component {...pageProps} />
                </CommonLayout>;
            }
        }

        return (
            <React.Fragment>
                <ClientContext.Provider value={graphQLClient}>
                    <AuthContextProvider {...{user, token}}>
                        <MenuContextProvider>
                            <DataStoreContextProvider>
                                {(Component.isSimpleLayout || pageProps.err) ?
                                    <Component {...pageProps} /> : renderSwitchCase()
                                }
                            </DataStoreContextProvider>
                        </MenuContextProvider>
                    </AuthContextProvider>
                </ClientContext.Provider>
                <style jsx global>{`
                #nprogress {
                    pointer-events: none;
                }

                #nprogress .bar {
                    background: #fb5f1f;

                    position: fixed;
                    z-index: 999999;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 2px;
                }

                /* Fancy blur effect */
                #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow: 0 0 10px #fb5f1f, 0 0 5px #80391b;
                    opacity: 1;

                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                    -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
                }

                /* Remove these to get rid of the spinner */
                #nprogress .spinner {
                    display: block;
                    position: fixed;
                    z-index: 999999;
                    top: 15px;
                    right: 15px;
                }

                #nprogress .spinner-icon {
                    width: 22px;
                    height: 22px;
                    box-sizing: border-box;

                    border: solid 3px transparent;
                    border-top-color: #fb5f1f;
                    border-left-color: #ff631f;
                    border-radius: 50%;

                    -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
                }

                .nprogress-custom-parent {
                    overflow: hidden;
                    position: relative;
                }

                .nprogress-custom-parent #nprogress .spinner,
                .nprogress-custom-parent #nprogress .bar {
                    position: absolute;
                }

                @-webkit-keyframes nprogress-spinner {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
                @keyframes nprogress-spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            </React.Fragment>
        );
    }
}

export default withGraphQLClient(CMSApp);
