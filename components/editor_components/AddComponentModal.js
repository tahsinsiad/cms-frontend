import React, {useState} from "react";
import {Modal} from "antd";
import * as PropTypes from "prop-types";
import AvailableComponentList from "./AvailableComponentList";

const AddComponentModal = ({visible, handleOk, handleCancel}) => {
    const [selectedComponents, setSelectedComponents] = useState([]);

    const onSelect = (_selectedComponents) => {
        console.log(_selectedComponents);
        setSelectedComponents(_selectedComponents);
    };

    const _handleOk = (e) => {
        console.log(e);
        handleOk(selectedComponents);
        setSelectedComponents([]);
    };

    // useEffect(()=>{
    //     if (visible) {
    //         setSelectedComponents([]);
    //     }
    // }, [visible]);

    return (
        <Modal
            title="Component Lists"
            visible={visible}
            onOk={_handleOk}
            onCancel={handleCancel}
        >
            <AvailableComponentList onSelect={onSelect} selectedComponents={selectedComponents}/>
        </Modal>
    );
};

AddComponentModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default AddComponentModal;
