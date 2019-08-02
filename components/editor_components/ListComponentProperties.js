import React, {useState} from "react";
import {Collapse} from "antd";
import * as PropTypes from "prop-types";

const { Panel } = Collapse;

const ListComponentProperties = ({pageDetails}) => {

    const [openKeys, setOpenKeys] = useState([Object.keys(pageDetails)[0]]);

    const onChange = key => {
        console.log(key);
    };

    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    return (
      <Collapse defaultActiveKey={openKeys} onChange={onChange}>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3" disabled>
          <p>{text}</p>
        </Panel>
      </Collapse>
    );
};

ListComponentProperties.propTypes = {
    pageDetails: PropTypes.object
};

export default ListComponentProperties;
