import getConfig from "next/config";
import React from "react";
import {withAuthSync} from "../utils/withAuthSync";
import {MetaRedirect} from "../components/common/Redirect";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const Home = () => <MetaRedirect to={DASHBOARD_PATH}/>;

// Home.getInitialProps = async (ctx) => {
//     return redirectTo(DASHBOARD_PATH, ctx);
// };

Home.routeInfo = {
    slug: "home",
    path: "/",
    pathAs: "/"
};

export default withAuthSync(Home);
