import React, {Fragment} from "react";
import {Button, Card, Divider, PageHeader, Table, Typography} from "antd";
import Link from "next/link";
import "../static/scss/dashboard.scss";

import PageWrapper from "../components/common/PageWrapper";
import getConfig from "next/config";
import RecentProjects from "../components/projects/RecentProjects";
import {withAuthSync} from "../utils/withAuthSync";
import {MenuContext} from "../contexts/MenuContextProvider";
import DefaultMenuItems from "../components/layout/aside/DefaultMenuItems";

const {publicRuntimeConfig} = getConfig();
const {CREATE_PROJECT_PATH} = publicRuntimeConfig;

const {Meta} = Card;

const {Title} = Typography;


const Dashboard = () => {

    const dataSource = [
        {
            id: "1",
            title: "Project Title",
            description: "This is the description",
        },
        {
            id: "2",
            title: "Project Title",
            description: "This is the description",
        },
        {
            id: "3",
            title: "Project Title",
            description: "This is the description",
        },
        {
            id: "4",
            title: "Project Title",
            description: "This is the description",
        }
    ];

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
    ];

    const menuContext = React.useContext(MenuContext);

    React.useEffect(() => {
        menuContext.setMenuItems(DefaultMenuItems);
        menuContext.setSelectedKeys([Dashboard.routeInfo.slug]);
    }, []);

    const pageHeader = <PageHeader title="Dashboard" subTitle="This is a subtitle"
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
                <Table dataSource={dataSource} columns={columns} rowKey="id"/>
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
