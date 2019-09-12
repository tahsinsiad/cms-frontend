import React, { useContext, useEffect, useState } from "react";
import * as PropTypes from "prop-types";

import { Button, message, Tree, Modal, Checkbox, Row, Col } from "antd";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import { useMutation } from "graphql-hooks";
import { useRouter } from "next/router";



const { TreeNode } = Tree;



const ADD_COMPONENT = `
mutation addComponent($componentId: String!, $parent: JSONObject, $projectId: String!, $page: String!) {
  addComponent(componentId: $componentId, parent: $parent, projectId: $projectId, page: $page) {
    error
  }
}`;

const ListPageComponents = ({ pageDetails }) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([]);
    const [pageChildren, setPageChildren] = useState(pageDetails.children || []);
    const [addComponent, pageDetailsData] = useMutation(ADD_COMPONENT);
    const router = useRouter();
    const projectId = router.query.id;
    const pageName = router.query.subComponent;

    useEffect(() => {
        console.log("useEffect called")
        setPageChildren(pageDetails.children);
    }, [pageDetails]);

    const retrieveItemByKey = (itemList, keys, p) => {
        if (p === keys.length) {
            return itemList;
        }

        if (p < keys.length) {
            return retrieveItemByKey(itemList.children[Number(keys[p])], keys, p + 1);
        }
    };

    const onSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
        console.log("Onselect called")
        dataStoreContext.setSelectedProjectItem(retrieveItemByKey(pageDetails, node.props.eventKey.split("-"), 0));
    };



    const onDragEnter = info => {
        console.log(info);
        // expandedKeys
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    };

    const onDrop = info => {

        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split("-");
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...pageChildren];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.push(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert
                item.children.unshift(dragObj);
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }

        setPageChildren(data);
    };

    const addComponentClick = async () => {
        const selectedProjectItem = dataStoreContext.selectedProjectItem;
        const result = await addComponent({
            variables: {
                componentId: "div",
                parent: selectedProjectItem,
                projectId: projectId,
                page: pageName
            }
        });
        if (!result.error) {
            dataStoreContext.setPageDetailsUpdated(true);
        } else {
            message.error((result.httpError && result.httpError.statusText) ||
                (result.graphQLErrors && result.graphQLErrors[0].message));
        }
    };

    const loop = (data, preKey) =>
        data.map((item, i) => {
            const key = preKey ? `${preKey}-${i}` : `${i}`;
            item.key = key;
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={key} title={item.name}>
                        {loop(item.children, key)}
                    </TreeNode>
                );
            }
            return <TreeNode key={key} title={item.name} />;
        });

    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = e => {
        console.log(e);
        setVisible(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false)

    };

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
      }

    return (
        <div style={{ flex: "0 0 100%" }}>
            <Tree
                className="draggable-tree"
                defaultExpandedKeys={openKeys}
                draggable
                blockNode
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                onSelect={onSelect}
            >
                {loop(pageChildren)}
            </Tree>
            <Modal
                title="Component Lists"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="A">Div</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="B">Span</Checkbox>
                        </Col>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="C">Button</Checkbox>
                            </Col>
                        </Row>
                        <Col span={8}>
                            <Checkbox value="D">Image</Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="E">Menu</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
          </Modal>
            <Button type="primary" onClick={addComponentClick}>Add Component</Button>
            <br />
            <br />
            <Button type="primary" onClick={showModal}>Component Lists</Button>
        </div>
    );
};

ListPageComponents.propTypes = {
    pageDetails: PropTypes.object
};

ListPageComponents.defaultProps = {
    pageDetails: {}
};

export default ListPageComponents;
