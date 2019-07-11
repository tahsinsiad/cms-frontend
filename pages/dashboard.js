import React, { Fragment } from 'react';
import { Typography, Card, Col, PageHeader, Row, Button, Icon, Table, Divider } from 'antd';
import Link from "next/link";
import '../static/scss/dashboard.scss'

import PageWrapper from "../components/common/PageWrapper";
import DefaultLayout from "../components/layout/default_layout/DefaultLayout";
import { CREATE_PROJECT_PATH } from '../routes/Slugs';

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
                    <Row gutter={4}>
                        <Col xs={24} sm={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="edit" />, <Icon type="delete" />]}
                            >
                                <Meta title="Project Title" description="This is the description" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="edit" />, <Icon type="delete" />]}
                            >
                                <Meta title="Project Title" description="This is the description" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="edit" />, <Icon type="delete" />]}
                            >
                                <Meta title="Project Title" description="This is the description" />
                            </Card>
                        </Col>
                        <Col xs={24} sm={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="edit" />, <Icon type="delete" />]}
                            >
                                <Meta title="Project Title" description="This is the description" />
                            </Card>
                        </Col>
                    </Row>

                    <Divider />

                    <Title level={3}>All Project</Title>
                    <Table dataSource={dataSource} columns={columns} rowKey="id" />
                </Fragment>

            </PageWrapper>
        </DefaultLayout>
    );
};


export default Dashboard;
