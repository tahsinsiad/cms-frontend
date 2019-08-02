import React, {useContext, useEffect} from "react";
import {Col, message, Row} from "antd";
import ListPageComponents from "./ListPageComponents";
import PreviewPageComponents from "./PreviewPageComponents";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {useQuery} from "graphql-hooks";
import * as PropTypes from "prop-types";

export const pageDetailsQuery = `
    query pageDetailsQuery($projectId: String!, $page: String!) {
        page(id: $projectId, page: $page) {
            title
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
      <div>
        <Row>
          <Col span={6}>
            <ListPageComponents pageDetails={data.page} />
          </Col>
          <Col span={18}>
            <PreviewPageComponents />
          </Col>
        </Row>
      </div>
    );
};

ProjectPages.propTypes = {
    project: PropTypes.object,
    router: PropTypes.object
};

export default ProjectPages;
