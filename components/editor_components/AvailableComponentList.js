import React, {useEffect, useState} from "react";
import {Checkbox, Col, message, Row} from "antd";
import * as PropTypes from "prop-types";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";

export const availableComponentQuery = `
  query availableComponentQuery($projectId: String!, $limit: Int!, $skip: Int!) {
    allAvailableComponents(projectId: $projectId, limit: $limit, skip: $skip) {
      id
      importSignature
      name
      props
    }
  }
`;

const AvailableComponentList = ({onSelect, selectedComponents}) => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    //const dataStoreContext = useContext(DataStoreContext);
    const router = useRouter();
    const projectId = router.query.id;

    const { loading, error, data, refetch } = useQuery(
        availableComponentQuery,
        {
            variables: {projectId, skip, limit: limit},
            // updateData: (prevResult, result) => ({
            //     ...result,
            //     allAvailableComponents: [
            //         ...prevResult.allAvailableComponents,
            //         ...result.allAvailableComponents
            //     ]
            // })
        }
    );

    useEffect(() => {
        if (error) {
            message.error("Error retrieving available components.");
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading available components...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4} />;
    const { allAvailableComponents } = data;

    console.log("allAvailableComponents", allAvailableComponents);

    const getComponents = item => {
        return item.map(item => {
            return (<Col span={8} key={item.id}>
                <Checkbox value={item.id}>{item.name}</Checkbox>
            </Col>);
        });
    };

    const onChange = checkedValues => {
        console.log("checked = ", checkedValues);
        onSelect(checkedValues);
    };
    return (
        <Checkbox.Group style={{width: "100%"}} onChange={onChange} value={selectedComponents}>
            <Row>{getComponents(allAvailableComponents)}</Row>
        </Checkbox.Group>
    );
};

AvailableComponentList.propTypes = {
    onSelect: PropTypes.func,
    selectedComponents: PropTypes.array
};

export default AvailableComponentList;
