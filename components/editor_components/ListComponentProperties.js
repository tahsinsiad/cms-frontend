import React, { useContext, useState, Fragment } from "react";
import { Collapse, Input, Button, Icon } from "antd";
import * as PropTypes from "prop-types";
import { DataStoreContext } from "../../contexts/DataStoreContextProvider";
import { startCase } from "lodash";
import JsonComponentList from "./JsonComponent";

const ListComponentProperties = ({ pageDetails }) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([Object.keys(pageDetails)[0]]);

    const onChange = key => {
        console.log(key);
    };

    const selectedProjectItem = dataStoreContext.selectedProjectItem;

    //console.log("Data context is: ", selectedProjectItem.name);
    //console.log("Name is : ", selectedProjectItem.attributes.name)

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    const generatePanelItem = item => {
        if (!item.attributes) return null;
        return item.attributes.map(attr => {
            return (
                <Fragment key={attr.name}>
                    <span>{startCase(attr.name)}: </span>
                    <span>
                        {attr.name === "style" ? (
                            <Button onClick={showModal}>
                                <Icon type="edit" />
                            </Button>
                        ) : (
                            <>
                                <Input
                                    style={{ width: 200 }}
                                    defaultValue={attr.name}
                                />
                                <Button style={{ border: "1px solid green" }}>
                                    <b>
                                        <Icon
                                            type="check"
                                            style={{ color: "green" }}
                                        />
                                    </b>
                                </Button>
                            </>
                        )}
                    </span>
                    <br />
                    <br />
                    <JsonComponentList
                        visible={visible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                    />
                </Fragment>
            );
        });
    };
    if (!selectedProjectItem)
        return <p>Select an item to view the properties</p>;
    return (
        <Collapse
            defaultActiveKey={openKeys}
            onChange={onChange}
            style={{ flex: "0 0 100%" }}
        >
            {generatePanelItem(selectedProjectItem)}
        </Collapse>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
