import React, {useContext, useEffect} from "react";
import {withRouter} from "next/router";
import EditorNavHeader from "../../components/layout/header/EditorNavHeader";
import {ClientContext, useQuery} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {message, Row} from "antd";
import getConfig from "next/config";
import {getProjectMenuItems} from "../../components/layout/aside/ProjectMenuItems";
import CommonLayout from "../../components/layout/CommonLayout";
import * as PropTypes from "prop-types";
import {MenuContext} from "../../contexts/MenuContextProvider";

const {publicRuntimeConfig} = getConfig();
const {DASHBOARD_PATH} = publicRuntimeConfig;

export const projectDetailsQuery = `
    query projectDetailsQuery($projectId: String!) {
        project(id: $projectId) {
            id
            title
            description
            websiteUrl
            brand {
                icon
                siteTitle
            }
            siteMeta
            modifiedAt
        }
    }
`;

const ProjectLayout = ({router, children}) => {
    let projectId = router.query.id;

    const {loading, error, data, refetch} = useQuery(projectDetailsQuery, {
        variables: {projectId: projectId},
        updateData: (prevResult, result) => ({
            project: result.project
        })
    });

    const menuContext = React.useContext(MenuContext);
    const dataStoreContext = useContext(DataStoreContext);
    const graphQLClient = useContext(ClientContext);

    const menuItems = getProjectMenuItems({
        query: {id: projectId},
    }, graphQLClient);

    React.useEffect(() => {
        menuContext.setMenuItems(menuItems);
    }, []);

    let hideMessage;
    useEffect(() => {
        if (error) {
            message.error("Error loading project.");
        }
        console.log("loading:", loading);
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading project...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
            console.log("currentProject is", data);
            dataStoreContext.setCurrentProject(data.project);
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    useEffect(() => {
        if (dataStoreContext.projectUpdated) {
            refetch();
            dataStoreContext.setProjectUpdated(false);
        }
    }, [dataStoreContext.projectUpdated]);

    // useEffect(() => {
    //     console.log("currentProject is", data);
    //     if (data.project) {
    //         dataStoreContext.setCurrentProject(data.project);
    //     }
    // }, [data.project]);

    if (error || !data) return <Row gutter={4}/>;

    return (
        <CommonLayout navHeader={<EditorNavHeader/>}>
            {children}
        </CommonLayout>
    );
};

ProjectLayout.propTypes = {
    children: PropTypes.element.isRequired,
    router: PropTypes.object,
};

export default withRouter(ProjectLayout);
