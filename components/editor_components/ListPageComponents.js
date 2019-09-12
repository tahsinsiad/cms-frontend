import React, {useContext, useEffect, useState} from "react";
import * as PropTypes from "prop-types";

import {Button, message, Tree} from "antd";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {useMutation} from "graphql-hooks";
import {useRouter} from "next/router";

const {TreeNode} = Tree;

const ADD_COMPONENT = `
mutation addComponent($componentId: String!, $parent: JSONObject, $projectId: String!, $page: String!) {
  addComponent(componentId: $componentId, parent: $parent, projectId: $projectId, page: $page)
}`;

const ListPageComponents = ({pageDetails}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([]);
    const [pageChildren, setPageChildren] = useState(pageDetails.children || []);
    const [addComponent, pageDetailsData] = useMutation(ADD_COMPONENT);
    const router = useRouter();
    const projectId = router.query.id;
    const pageName = router.query.pageName;

    useEffect(() => {
        setPageChildren(pageDetails.children);
    }, [pageDetails]);

    const retrieveItemByKey = (itemList, keys, p) => {
        if (p === keys.length) return itemList;
        if (p < keys.length) {
            return retrieveItemByKey(itemList.children[Number(keys[p])], keys, p + 1);
        }
    };

    const onSelect = (selectedKeys, {selected, selectedNodes, node, event}) => {
        dataStoreContext.setSelectedProjectItem(retrieveItemByKey(pageDetails, node.props.eventKey.split("-"), 0));
    };

    const onDragEnter = info => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    };

    const onDrop = info => {
        console.log(info);
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
        let dragObj = {};
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else {
            let ar = [];
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
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={key} title={item.name}>
                        {loop(item.children, key)}
                    </TreeNode>
                );
            }
            return <TreeNode key={key} title={item.name}/>;
        });

    return (
        <div style={{flex: "0 0 100%"}}>
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
            <Button type="primary" onClick={addComponentClick}>Add Component</Button>
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
