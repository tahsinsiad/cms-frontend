import React, { Fragment } from 'react';
import {Input, PageHeader} from 'antd';

import PageWrapper from "../components/common/PageWrapper";
import EditorLayout from "../components/layout/editor_layout/EditorLayout";
import ProjectCreateForm from "../components/forms/project_forms/ProjectCreateForm";
import EditorNavHeader from "../components/layout/header/EditorNavHeader";
import DefaultLayout from "../components/layout/default_layout/DefaultLayout";

const CreateProject = () => {

    const pageHeader = <PageHeader title="Create Project" subTitle="Create a new NextJS project"/>;
    // const navHeader = <EditorNavHeader/>;

    return (
        <DefaultLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <div style={{maxWidth: '700px'}}>
                    <ProjectCreateForm />
                </div>
            </PageWrapper>
        </DefaultLayout>
    );
};


export default CreateProject;
