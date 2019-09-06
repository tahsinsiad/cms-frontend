import React, {useEffect} from "react";
import {message, Row} from "antd";
import ListPageComponents from "./ListPageComponents";
import PreviewPageComponents from "./PreviewPageComponents";
import {useQuery} from "graphql-hooks";
import * as PropTypes from "prop-types";
import {SplitPanel} from "../common/SplitPanel";
import ListComponentProperties from "./ListComponentProperties";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";

export const pageDetailsQuery = `
    query pageDetailsQuery($projectId: String!, $page: String!) {
        page(id: $projectId, page: $page) {
            children
            hooks
            effects
        }
    }
`;

const ProjectPages = ({project, router}) => {
    // console.log("router", router);
    const projectId = router.query.id;
    const pageName = router.query.subComponent;
    const dataStoreContext = React.useContext(DataStoreContext);

    // console.log(projectId, pageName);

    const {loading, error, data, refetch} = useQuery(pageDetailsQuery, {
        variables: {projectId: projectId, page: pageName}
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

    useEffect(()=>{
        if (dataStoreContext.pageDetailsUpdated) {
            dataStoreContext.setPageDetailsUpdated(false);
            refetch({variables: {projectId: projectId, page: pageName}});
        }
    }, [dataStoreContext.pageDetailsUpdated]);

    if (error || !data) return <Row gutter={4}/>;

    return (
      <SplitPanel>
        <ListPageComponents pageDetails={data.page}/>
        <PreviewPageComponents pageDetails={data.page} pageName={pageName}/>
        <ListComponentProperties pageDetails={data.page}/>
      </SplitPanel>
    );
};

ProjectPages.propTypes = {
    project: PropTypes.object,
    router: PropTypes.object
};

export default ProjectPages;
