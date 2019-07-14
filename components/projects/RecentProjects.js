import React, {useEffect, useState} from 'react';
import {Card, Col, Icon, Row} from "antd";
import {useQuery} from "graphql-hooks";
import { message } from 'antd';

const { Meta } = Card;

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

RecentProjects.propTypes = {

};

function RecentProjects(props) {
    const [skip, setSkip] = useState(0);
    const { loading, error, data, refetch } = useQuery(recentProjectsQuery, {
        variables: { skip, limit: 4 },
        updateData: (prevResult, result) => ({
            ...result,
            projects: [...prevResult.projects, ...result.projects]
        })
    });

    useEffect(()=>{
        if (error) {
            message.error('Error loading recent projects.');
            // refetch();
        }
        let hide;
        if (loading) {
            hide = message.loading('Loading recent projects...', 0);
        } else {
            hide && hide();
        }
    }, [error, data, loading]);

    if (error || !data) return <Row gutter={4}/>;
    const { projects, _projectsMeta } = data;

    // const areMoreProjects = projects.length < _projectsMeta.count;
    return (
        <Row gutter={4}>
            {projects.map((project) => (
            <Col key={project.id} xs={24} sm={6}>
                <Card
                    cover={<img alt="Default Project Cover"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                    actions={[<Icon type="edit"/>, <Icon type="delete"/>]}
                >
                    <Meta title="Project Title" description="This is the description"/>
                </Card>
            </Col>))}
        </Row>
    );
}

export default RecentProjects;
