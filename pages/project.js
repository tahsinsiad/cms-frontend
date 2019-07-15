import React, { } from 'react';
import { withRouter } from 'next/router'
import EditorNavHeader from "../components/layout/header/EditorNavHeader";
import EditorLayout from "../components/layout/editor_layout/EditorLayout";
import PageWrapper from '../components/common/PageWrapper';
import { getComponentForRoute } from '../constants/ProjectSubRoutes';

const navHeader = <EditorNavHeader />;

const Project = (props) => {

    const Component = getComponentForRoute(props.router.query);
    return (
        <EditorLayout navHeader={navHeader}>
            <PageWrapper>
                <Component />
            </PageWrapper>
        </EditorLayout>
    );
}

export default withRouter(Project);