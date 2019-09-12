import React from "react";
import PageWrapper from "../../components/common/PageWrapper";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import {MenuContext} from "../../contexts/MenuContextProvider";
import ProjectPages from "../../components/editor_components/ProjectPages";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

const Pages = (props) => {
    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setSelectedKeys([WrappedPages.routeInfo.slug]);
    }, []);

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            minHeight: "calc(100vh - 80px)",
            padding: 0
        }}>
            <ProjectPages/>
        </PageWrapper>
    );
};

Pages.propTypes = {};

const WrappedPages = withAuthSync(Pages);

WrappedPages.routeInfo = {
    slug: "pages",
    path: "/project/pages",
    pathAs: "/project/pages"
};

export default WrappedPages;
