import React, { useEffect, useState,useContext, Fragment } from "react";
import { Checkbox, Col, message, Row, List, Spin, AutoComplete, Button } from "antd";
import * as PropTypes from "prop-types";
import { useQuery } from "graphql-hooks";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import {AvailableComponentContext} from "../../contexts/AvailableComponentContextProvider";

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
    const [load, setLoad] = useState(false);
    const [hasMore, setHasmore] = useState(true);
    const componentContext = useContext(AvailableComponentContext);
    //const dataStoreContext = useContext(DataStoreContext);
    const router = useRouter();
    const projectId = router.query.id;

    const { loading, error, data, refetch } = useQuery(
        availableComponentQuery,
        {
            variables: { projectId, skip, limit },
            updateData: (prevResult, result) => ({
                ...result,
                allAvailableComponents: [
                    ...prevResult.allAvailableComponents,
                    ...result.allAvailableComponents
                ]
            })
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

    // const getComponents = item => {
    //     return item.map(item => {
    //         return (<Col span={8} key={item.importSignature}>
    //             <Checkbox value={item.importSignature}>{item.name}</Checkbox>
    //         </Col>);
    //     });
    // };

    const handleInfiniteLoad = () => {
        console.log("handle called");
        setLoad(true);
        if(skip >= 18){  
            setHasmore(false);
            setLoad(false);
        }
        else {

            let newSkip = skip + limit;
            setSkip(newSkip);
            console.log("new skip:" ,newSkip);
            setLoad(false);

        }
        
        
        
        
    };
    
    // const onChange = checkedValues => {
    //     console.log("checked = ", checkedValues);
    //     onSelect(checkedValues);
    // };
    return (

        //----- Using it for infinite scroll view -----

        <div style={{border: "1px solid #e8e8e8", borderRadius: 4, overflow: "auto", padding: "8px 24px", height: "420px"}}>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                threshold={10}
                loadMore={handleInfiniteLoad}
                hasMore={!load && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={allAvailableComponents}
                    renderItem={item => (
                        <List.Item key={item.importSignature}>
                            <Checkbox value={item.importSignature}>{item.name}</Checkbox>
                        </List.Item>
                    )}
                >
                    {loading && hasMore && (
                        <div style={{position: "absolute", bottom: 40, width: "100%", textAlign: "center"}}>
                            <Spin />
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    );
};


AvailableComponentList.propTypes = {
    onSelect: PropTypes.func,
    selectedComponents: PropTypes.array
};

export default AvailableComponentList;
