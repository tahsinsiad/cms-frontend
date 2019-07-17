import React, {useContext, useEffect} from 'react';
import {withRouter} from 'next/router'
import EditorNavHeader from "../components/layout/header/EditorNavHeader";
import EditorLayout from "../components/layout/editor_layout/EditorLayout";
import PageWrapper from '../components/common/PageWrapper';
import {getComponentForRoute} from '../constants/ProjectSubRoutes';
import {withAuthSync} from "../utils/withAuthSync";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../contexts/DataStoreContextProvider";
import {message, Row, Sider} from "antd";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;
import {redirectTo} from "../components/common/Redirect";
import Router from 'next/router'
import AsideLeft from "../components/layout/AsideLeft";
import EditorNavs from "../constants/EditorNavs";
import CommonLayout from "../components/layout/CommonLayout";
import DefaultNavs from "../constants/DefaultNavs";
import NavHeader from "../components/layout/header/DefaultNavHeader";

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
    console.log("router", props.router);
    const Component = getComponentForRoute(props.router.query);
    let projectId = props.router.query.id;
    const dataStoreContext = useContext(DataStoreContext);

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
        if (data && data.project) {
            dataStoreContext.setCurrentProject(project);
        }
    }, [data]);

    if (error || !data) return <Row gutter={4} />;
    const { project } = data;

    return (
        <CommonLayout navs={EditorNavs} navHeader={<EditorNavHeader />}>
            <PageWrapper>
                <Component project={project}/>
            </PageWrapper>
        </CommonLayout>
    );
};

export default withRouter(withAuthSync(Project));
