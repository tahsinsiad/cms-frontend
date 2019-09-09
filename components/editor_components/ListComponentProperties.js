import React, {useContext, useState} from "react";
import {Collapse} from "antd";
import * as PropTypes from "prop-types";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {startCase} from "lodash";

const {Panel} = Collapse;

const ListComponentProperties = ({pageDetails}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [openKeys, setOpenKeys] = useState([Object.keys(pageDetails)[0]]);

    const onChange = key => {
        console.log(key);
    };

    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    const selectedProjectItem = dataStoreContext.selectedProjectItem;

    const generatePanelItem = (item) => {
        if (!item.attributes) return null;
        return item.attributes.map(attr => {
            return (
                <Panel header={startCase(attr.name)} key={attr.name}>
                    <p>{text}</p>
                </Panel>
            );
        });
    };
    if (!selectedProjectItem) return <p>Select an item to view the properties</p>;
    return (
        <Collapse defaultActiveKey={openKeys} onChange={onChange} style={{flex: "0 0 100%"}}>
            {generatePanelItem(selectedProjectItem)}
        </Collapse>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
