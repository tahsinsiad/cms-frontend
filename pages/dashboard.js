import React, { Fragment, useContext, useEffect, useState } from "react";
import {
    Button,
    Divider,
    Icon,
    message,
    PageHeader,
    Table,
    Typography,
    Input
} from "antd";
import Link from "next/link";
import "../static/scss/dashboard.scss";
import PageWrapper from "../components/common/PageWrapper";
import getConfig from "next/config";
import RecentProjects from "../components/projects/RecentProjects";
import { withAuthSync } from "../utils/withAuthSync";
import { useQuery } from "graphql-hooks";
import { DataStoreContext } from "../contexts/DataStoreContextProvider";
import DeleteWarningModal from "../components/projects/DeleteWarningModal";
import Highlighter from "react-highlight-words";
import * as PropTypes from "prop-types";
import * as moment from "moment";

const { publicRuntimeConfig } = getConfig();
const { CREATE_PROJECT_PATH, PROJECT_PATH } = publicRuntimeConfig;
const { Title } = Typography;

export const projectsQuery = `
  query projectsQuery($title: String, $limit: Int!, $skip: Int!) {
    projects(title: $title, limit: $limit, skip: $skip) {
        id
        title
        description
        websiteUrl
        modifiedAt
    }
    _projectsMeta(title: $title) {
      count
    }
}
`;

const Dashboard = () => {
    const [skip, setSkip] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [title, setTitle] = useState("");
    const dataStoreContext = useContext(DataStoreContext);
    const [current, setCurrent] = useState(1);
    const [visible, setVisible] = useState(false);
    const [project, setProject] = useState({});
    const [searchText, setSearchText] = useState("");


    const { loading, error, data, refetch } = useQuery(projectsQuery , {
        variables: {title, skip, limit: pageSize }
    });

    
    const onChange = page => {
        setSkip((page - 1) * pageSize);
        setCurrent(page);
    };

    useEffect(() => {
        console.log("Effect 1 called");
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({ variables: {skip, limit: pageSize } });
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

    console.log("Data: ", data);
    const { projects, _projectsMeta} = data;
    
    //-------- Change ISOdate to general date format ----------
    projects.map (item => {
        item.modifiedAt = moment(item.modifiedAt).format("DD-MMM-YYYY");
    });

    const onCancel = () => {
        setVisible(false);
    };

    const handleClick = project_handle => {
        setVisible(true);
        setProject(project_handle);
    };
    const onDeleteProjectSuccess = () => {
        setVisible(false);
    };
    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            // eslint-disable-next-line react/prop-types
            setSelectedKeys,
            // eslint-disable-next-line react/prop-types
            selectedKeys,
            // eslint-disable-next-line react/prop-types
            confirm,
            // eslint-disable-next-line react/prop-types
            clearFilters
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => 
                       setSelectedKeys(e.target.value ? [e.target.value] : [])
                       
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>

                <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),


        filterIcon: filtered => (
            <Icon
                type="search"
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>{
            console.log(record[dataIndex]);
            return record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
            },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),

    });

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setTitle(selectedKeys[0]);
        console.log("Search text: ", selectedKeys[0]);
      };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText("");
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
            ...getColumnSearchProps("title")

        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description")
        },
        {
            title: "WebsiteUrl",
            dataIndex: "websiteUrl",
            key: "websiteUrl",
            ...getColumnSearchProps("websiteUrl")
        },
        {
            title: "ModifiedAt",
            dataIndex: "modifiedAt",
            key: "modifiedAt",
            ...getColumnSearchProps("modifiedAt")
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
                        total: title === "" ? _projectsMeta.count : projects.length,
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
