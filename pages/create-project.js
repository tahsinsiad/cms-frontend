import React, { Fragment } from 'react';
import { PageHeader } from 'antd';

import PageWrapper from "../components/common/PageWrapper";
import EditorLayout from "../components/layout/editor_layout/EditorLayout";

const CreateProject = () => {

    const pageHeader = <PageHeader title="Create Project" subTitle="This is a subtitle" />;

    return (
        <EditorLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <Fragment>
                    Create Project
                </Fragment>

            </PageWrapper>
        </EditorLayout>
    );
};


export default CreateProject;
