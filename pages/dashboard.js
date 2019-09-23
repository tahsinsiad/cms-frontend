import React, {Fragment} from "react";
import {Button, Card, Divider, PageHeader, Table, Typography, message} from "antd";
import Link from "next/link";
import "../static/scss/dashboard.scss";
import {useState, useContext, useEffect} from "react";
import PageWrapper from "../components/common/PageWrapper";
import getConfig from "next/config";
import RecentProjects from "../components/projects/RecentProjects";
import {withAuthSync} from "../utils/withAuthSync";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "/home/vivasoft/Downloads/cms-frontend/contexts/DataStoreContextProvider";

const {publicRuntimeConfig} = getConfig();
const {CREATE_PROJECT_PATH} = publicRuntimeConfig;
const {Title} = Typography;

export const projectsQuery = `
  query projectsQuery($limit: Int!, $skip: Int!) {
      projects(limit: $limit, skip: $skip) {
          id
          title
          description
          websiteUrl
          modifiedAt
        }
        _projectsMeta {
      count
    }
}
`;

const Dashboard = () => {

    const [skip, setSkip] = useState(0);
    const dataStoreContext = useContext(DataStoreContext);
    const [current, setCurrent] = useState(1);
    // const menuContext = React.useContext(MenuContext);

    const {loading, error, data, refetch} = useQuery(projectsQuery, {
        variables: {skip, limit: 4},
    });
    
    const onChange = page => {
        console.log("Page no is: ",page);
        setSkip((page-1)*4);
        setCurrent(page);
    };

    useEffect(() => {
        // menuContext.setMenuItems(DefaultMenuItems);
        // menuContext.setSelectedKeys([Dashboard.routeInfo.slug]);
    }, []);

    useEffect(() => {
        console.log("Effect 1 called");
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({variables: {skip, limit: 4}});
        }
    }, [dataStoreContext.projectListUpdated]);

    useEffect(() => {
        console.log("Effect 2 called");
        if (error) {
            message.error("Error loading recent projects.");
        }
        console.log("loading:", loading);
        let hideMessage; 
        if (loading && !data) { 
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading recent projects...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;

    }, [error, loading]);

    if (error || !data) return null;
    const {projects, _projectsMeta} = data;
    console.log("New Project data is: ", projects);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "WebsiteUrl",
            dataIndex: "websiteUrl",
            key: "websiteUrl",
        },
        {
            title: "ModifiedAt",
            dataIndex: "modifiedAt",
            key: "modifiedAt",
        },
    ];

    const pageHeader = <PageHeader 
        title="Dashboard" 
        subTitle="This is a subtitle"
        extra={<Link href={CREATE_PROJECT_PATH}><Button type="primary">New
        Project</Button></Link>}
    />;
    
    return (
        <PageWrapper pageHeader={pageHeader}>
            <Fragment>
                <Title level={3}>Recent Project</Title>
                <RecentProjects/>

                <Divider/>

                <Title level={3}>All Project</Title>
                <Table dataSource={projects} columns={columns} pagination={{pageSize: 4, total: _projectsMeta.count, current, onChange}} rowKey="id"/>
            </Fragment>

        </PageWrapper>
    );
};

Dashboard.routeInfo = {
    slug: "dashboard",
    path: "/dashboard",
    pathAs: "/dashboard"
};
export default withAuthSync(Dashboard);
