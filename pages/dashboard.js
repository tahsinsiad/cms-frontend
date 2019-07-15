import React, { Fragment } from 'react';
import { Typography, Card, Col, PageHeader, Row, Button, Icon, Table, Divider } from 'antd';
import Link from "next/link";
import '../static/scss/dashboard.scss'

import PageWrapper from "../components/common/PageWrapper";
import DefaultLayout from "../components/layout/default_layout/DefaultLayout";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {CREATE_PROJECT_PATH} = publicRuntimeConfig;
import RecentProjects from "../components/projects/RecentProjects";

const { Meta } = Card;

const { Title } = Typography;


const Dashboard = () => {

    const dataSource = [
        {
            id: '1',
            title: "Project Title",
            description: 'This is the description',
        },
        {
            id: '2',
            title: "Project Title",
            description: 'This is the description',
        },
        {
            id: '3',
            title: "Project Title",
            description: 'This is the description',
        },
        {
            id: '4',
            title: "Project Title",
            description: 'This is the description',
        }
    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];


    const pageHeader = <PageHeader title="Dashboard" subTitle="This is a subtitle"
        extra={<Link href={CREATE_PROJECT_PATH}><Button type="primary">New Project</Button></Link>}
    />;

    return (
        <DefaultLayout>
            <PageWrapper
                pageHeader={pageHeader}
            >
                <Fragment>
                    <Title level={3}>Recent Project</Title>
                    <RecentProjects />

                    <Divider />

                    <Title level={3}>All Project</Title>
                    <Table dataSource={dataSource} columns={columns} rowKey="id" />
                </Fragment>

            </PageWrapper>
        </DefaultLayout>
    );
};


export default Dashboard;
