import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectHeaders from "../../components/editor_components/ProjectHeaders";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const Headers = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([WrappedHeaders.routeInfo.slug]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectHeaders project={props.project}/>
        </PageWrapper>
    );
};

Headers.propTypes = {
    project: PropTypes.object
};

const WrappedHeaders = withAuthSync(Headers);

WrappedHeaders.routeInfo = {
    slug: "headers",
    path: "/project/headers",
    pathAs: "/project/headers"
};

export default WrappedHeaders;
