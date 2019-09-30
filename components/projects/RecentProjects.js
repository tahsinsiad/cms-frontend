import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Card, Col, Icon, message, Modal, Row} from "antd";
import {useQuery} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import getConfig from "next/config";
import Link from "next/link";
import DeleteWarningModal from "./DeleteWarningModal";

const { publicRuntimeConfig } = getConfig();
const { PROJECT_PATH } = publicRuntimeConfig;

const { Meta } = Card;
const { confirm } = Modal;

export const recentProjectsQuery = `
  query recentProjectsQuery($title: String, $limit: Int!, $skip: Int!) {
    projects(title: $title, limit: $limit, skip: $skip) {
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


const RecentProjects = () => {
    const [skip, setSkip] = useState(0);
    const [title,setTitle]=useState("");
    const [visible, setVisible] = useState(false);
    const dataStoreContext = useContext(DataStoreContext);
    const [project, setProject] = useState({});

    const { loading, error, data, refetch } = useQuery(recentProjectsQuery, {
        variables: {title, skip, limit: 4 },
        updateData: (prevResult, result) => ({
            ...result,
            projects: [...prevResult.projects, ...result.projects]
        })
    });

    useEffect(() => {
        if (dataStoreContext.projectListUpdated) {
            dataStoreContext.setProjectListUpdated(false);
            refetch({ variables: {title, skip, limit: 4 } });
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

    //-------------- Keeping it for future task --------------

    // const showDeleteConfirm = (id ) => {
    //     confirm({
    //         title: "Are you sure delete this task?",
    //         content: "",
    //         okText: "Yes",
    //         okType: "danger",
    //         cancelText: "No",
    //         onOk() {
    //             console.log("Id from onOk:",id);
    //             deleteProject({ variables: { id } });
    //             dataStoreContext.setProjectListUpdated(true);
    //             //refetch({ variables: { skip, limit: 4 } });
    //         },
    //         onCancel() {
    //             console.log("Cancel");
    //         }
    //     });
    // };

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
                                <Button style={{border: 0, padding: 0}}
                                    onClick={() => {
                                        console.log("Id is: ", project);
                                        handleClick(project);
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
            <DeleteWarningModal
                visible={visible}
                project={project}
                handleCancel={onCancel}
                onSuccess={onDeleteProjectSuccess}
            />
        </Fragment>
    );
};

RecentProjects.propTypes = {};

export default RecentProjects;
