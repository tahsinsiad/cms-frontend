import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Divider, Icon, message, PageHeader, Table, Typography} from "antd";
import Link from "next/link";
import "../static/scss/dashboard.scss";
import PageWrapper from "../components/common/PageWrapper";
import getConfig from "next/config";
import RecentProjects from "../components/projects/RecentProjects";
import {withAuthSync} from "../utils/withAuthSync";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../contexts/DataStoreContextProvider";
import DeleteWarningModal from "../components/projects/DeleteWarningModal";

const { publicRuntimeConfig } = getConfig();
const { CREATE_PROJECT_PATH, PROJECT_PATH } = publicRuntimeConfig;
const { Title } = Typography;

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
    const [pageSize, setPageSize] = useState(5);
    const dataStoreContext = useContext(DataStoreContext);
    const [current, setCurrent] = useState(1);
    const [visible, setVisible] = useState(false);
    const [project, setProject] = useState({});

    const { loading, error, data, refetch } = useQuery(projectsQuery, {
        variables: {skip, limit: pageSize}
    });

    const onChange = page => {
        console.log("Page no is: ", page);
        setSkip((page - 1) * pageSize);
        setCurrent(page);
    };

    useEffect(() => {
        console.log("Effect 1 called");
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({variables: {skip, limit: pageSize}});
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
    const { projects, _projectsMeta } = data;

    const onCancel = () => {
        setVisible(false);
    };

    const handleClick = (project_handle) => {
        setVisible(true);
        setProject(project_handle);
    };
    const onDeleteProjectSuccess = () => {
        setVisible(false);
    };

    const columns = [
        // {
        //     title: "Id",
        //     dataIndex: "id",
        //     key: "id"
        // },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            editable: true
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "WebsiteUrl",
            dataIndex: "websiteUrl",
            key: "websiteUrl"
        },
        {
            title: "ModifiedAt",
            dataIndex: "modifiedAt",
            key: "modifiedAt"
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <span>
                    <Link href={`${PROJECT_PATH}?id=${record.id}`}>
                        <a>
                            <Icon style={{ color: "blue" }} type="edit" />
                        </a>
                    </Link>
                    <Divider type="vertical" />
                    <Fragment>
                        <a onClick={() => handleClick(record)}>
                            <Icon style={{ color: "red" }} type="delete" />
                        </a>

                    </Fragment>
                </span>
            )
        }
    ];

    const pageHeader = (
        <PageHeader
            title="Dashboard"
            subTitle="This is a subtitle"
            extra={
                <Link href={CREATE_PROJECT_PATH}>
                    <Button type="primary">New Project</Button>
                </Link>
            }
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <Fragment>
                <Title level={3}>Recent Project</Title>
                <RecentProjects />

                <Divider />

                <Title level={3}>All Project</Title>
                <Table
                    dataSource={projects}
                    columns={columns}
                    pagination={{
                        pageSize: pageSize,
                        total: _projectsMeta.count,
                        current,
                        onChange
                    }}
                    rowKey="id"
                />
                <DeleteWarningModal
                    visible={visible}
                    project={project}
                    handleCancel={onCancel}
                    onSuccess={onDeleteProjectSuccess}

                />
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
