import React, { useContext, useEffect } from 'react';
import { withRouter } from 'next/router'
import EditorNavHeader from "../components/layout/header/EditorNavHeader";
import PageWrapper from '../components/common/PageWrapper';
import { getComponentForRoute } from '../constants/ProjectSubRoutes';
import { withAuthSync } from "../utils/withAuthSync";
import {ClientContext, useQuery} from "graphql-hooks";
import { DataStoreContext } from "../contexts/DataStoreContextProvider";
import { message, Row, Sider } from "antd";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;
import {getProjectNavs} from "../components/layout/aside/ProjectNavs";
import CommonLayout from "../components/layout/CommonLayout";
import { injectParamsAndGraphQLClient } from "../utils/helpers";

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

const Project = (props) => {

    const Component = getComponentForRoute(props.router.query);

    const dataStoreContext = useContext(DataStoreContext);
    const graphQLClient = useContext(ClientContext);

    let projectId = props.router.query.id;

    const { loading, error, data, refetch } = useQuery(projectDetailsQuery, {
        variables: { projectId: projectId },
        updateData: (prevResult, result) => ({
            project: result.project
        })
    });

    let hideMessage;
    useEffect(() => {
        if (error) {
            message.error(`Error loading project.`);
        }
        console.log("loading:", loading);
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading(`Loading project...`, 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    useEffect(() => {
        if (dataStoreContext.projectUpdated) {
            refetch();
            dataStoreContext.setProjectUpdated(false);
        }
    }, [dataStoreContext.projectUpdated]);

    useEffect(() => {
        if (data && data.project) {
            dataStoreContext.setCurrentProject(project);
        }
    }, [data]);

    if (error || !data) return <Row gutter={4} />;
    const { project } = data;
    const navs = getProjectNavs({
        query: { id: props.router.query.id },
    }, graphQLClient);
    return (
        <CommonLayout navs={navs} navHeader={<EditorNavHeader />}>
            <PageWrapper>
                <Component project={project} />
            </PageWrapper>
        </CommonLayout>
    );
};

export default withRouter(withAuthSync(Project));
