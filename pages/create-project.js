import React from 'react';
import { PageHeader } from 'antd';

import PageWrapper from "../components/common/PageWrapper";
import ProjectCreateForm from "../components/forms/project_forms/ProjectCreateForm";
import DefaultLayout from "../components/layout/default_layout/DefaultLayout";

const CreateProject = () => {

    const pageHeader = <PageHeader title="Create Project" subTitle="Create a new NextJS project" />;

    return (
        <DefaultLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <ProjectCreateForm />
            </PageWrapper>
        </DefaultLayout>
    );
};


export default CreateProject;
