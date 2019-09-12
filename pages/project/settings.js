import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectSettings from "../../components/editor_components/ProjectSettings";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const Settings = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([WrappedSettings.routeInfo.slug]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectSettings project={props.project}/>
        </PageWrapper>
    );
};

Settings.propTypes = {
    project: PropTypes.object
};

const WrappedSettings = withAuthSync(Settings);

WrappedSettings.routeInfo = {
    slug: "settings",
    path: "/project/settings",
    pathAs: "/project/settings"
};

export default WrappedSettings;
