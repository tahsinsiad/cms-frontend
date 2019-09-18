import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectFooters from "../../components/editor_components/ProjectFooters";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const Footers = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([WrappedFooters.routeInfo.slug]);
        menuContext.setOpenedKeys([]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectFooters project={props.project}/>
        </PageWrapper>
    );
};

Footers.propTypes = {
    project: PropTypes.object
};

const WrappedFooters = withAuthSync(Footers);

WrappedFooters.routeInfo = {
    slug: "footers",
    path: "/project/footers",
    pathAs: "/project/footers"
};

export default WrappedFooters;
