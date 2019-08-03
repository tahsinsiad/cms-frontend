import React, {useContext, useEffect, useState} from "react";
import {Col, Divider, message, Row} from "antd";
import ListPageComponents from "./ListPageComponents";
import PreviewPageComponents from "./PreviewPageComponents";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {useQuery} from "graphql-hooks";
import * as PropTypes from "prop-types";
import {SplitPanel} from "../common/SplitPanel";
import ListComponentProperties from "./ListComponentProperties";

export const pageDetailsQuery = `
    query pageDetailsQuery($projectId: String!, $page: String!) {
        page(id: $projectId, page: $page) {
            title {
                value
                start
                end
            }
            components
            hooks
            effects
        }
    }
`;

const ProjectPages = ({project, router}) => {
    const dataStoreContext = useContext(DataStoreContext);
    console.log("router", router);
    const projectId = router.query.id;
    const pageName = router.query.subComponent;

    console.log(projectId, pageName);

    const { loading, error, data, refetch } = useQuery(pageDetailsQuery, {
        variables: { projectId: projectId, page: pageName }
    });

    useEffect(() => {
        if (error) {
            message.error("Error loading page data.");
        }
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading page data...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4} />;
    // const parsedPage = JSON.parse(data.page.parsed);

    console.log("pageDetails: ", data.page);

    return (
      <SplitPanel>
        <ListPageComponents pageDetails={data.page} />
        <PreviewPageComponents pageDetails={data.page} />
        <ListComponentProperties pageDetails={data.page} />
      </SplitPanel>
    );
};

ProjectPages.propTypes = {
    project: PropTypes.object,
    router: PropTypes.object
};

export default ProjectPages;
