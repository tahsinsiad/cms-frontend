import React, { } from 'react';
import EditorNavHeader from "../components/layout/header/EditorNavHeader";
import EditorLayout from "../components/layout/editor_layout/EditorLayout";
import PageWrapper from '../components/common/PageWrapper';
import { withRouter } from "next/router";

const navHeader = <EditorNavHeader />;

const Project = (props) => {

    console.log(withRouter, props)

    return (
        <EditorLayout navHeader={navHeader}>
            <PageWrapper>
                I'm from Project.
            </PageWrapper>
        </EditorLayout>
    );
}

export default Project;