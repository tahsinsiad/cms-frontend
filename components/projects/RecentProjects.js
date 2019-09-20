import React, { useContext, useEffect, useState, Fragment } from "react";
import { Card, Col, Icon, message, Row, Button, Modal } from "antd";
import { useQuery, useMutation } from "graphql-hooks";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import getConfig from "next/config";
import Link from "next/link";

const { publicRuntimeConfig } = getConfig();
const { PROJECT_PATH } = publicRuntimeConfig;

const { Meta } = Card;
const { confirm } = Modal;

export const recentProjectsQuery = `
  query recentProjectsQuery($limit: Int!, $skip: Int!) {
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

const DELETEPROJECT = `
  mutation deleteProject($id: ID!){
      deleteProject(id: $id){
          id
      }
  }
`;

const RecentProjects = () => {
    const [skip, setSkip] = useState(0);
    const [visible, setVisible] = useState(false);
    const dataStoreContext = useContext(DataStoreContext);

    const [deleteProject] = useMutation(DELETEPROJECT);

    const { loading, error, data, refetch } = useQuery(recentProjectsQuery, {
        variables: { skip, limit: 4 },
        updateData: (prevResult, result) => ({
            ...result,
            projects: [...prevResult.projects, ...result.projects]
        })
    });

    useEffect(() => {
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({ variables: { skip, limit: 4 } });
        }
    }, [dataStoreContext.projectListUpdated]);

    useEffect(() => {
        if (error) {
            message.error("Error loading recent projects.");
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading recent projects...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4} />;
    const { projects, _projectsMeta } = data;

    // console.log("Project data is: ", projects);

    // const areMoreProjects = projects.length < _projectsMeta.count;

    const showDeleteConfirm = (id ) => {
        confirm({
            title: "Are you sure delete this task?",
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("Id from onOk:",id);
                deleteProject({ variables: { id } });
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    };

    return (
        <Fragment>
            <Row gutter={4}>
                {projects.map(project => (
                    <Col key={project.id} xs={24} sm={6}>
                        <Card
                            cover={
                                <img
                                    alt="Default Project Cover"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <Link href={`${PROJECT_PATH}?id=${project.id}`}>
                                    <a>
                                        <Icon type="edit" />
                                    </a>
                                </Link>,
                                <Button
                                    onClick={() => {
                                        console.log("Id is: ", project.id);
                                        showDeleteConfirm(project.id);
                                    }}
                                >
                                    <Icon type="delete" />
                                </Button>
                            ]}
                            hoverable
                        >
                            <Meta
                                title={project.title}
                                description={project.description}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Fragment>
    );
};

RecentProjects.propTypes = {};

export default RecentProjects;
