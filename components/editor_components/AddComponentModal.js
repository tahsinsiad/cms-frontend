import React from "react";
import {Modal} from "antd";
import * as PropTypes from "prop-types";
import AvailableComponentList from "./AvailableComponentList";

const AddComponentModal = ({visible, handleOk, handleCancel}) => {
    let selectedComponents = [];

    const onSelect = (_selectedComponents) => {
        console.log(_selectedComponents);
        selectedComponents = _selectedComponents;
    };

    const _handleOk = (e) => {
        console.log(e);
        handleOk(selectedComponents);
    };

    return (
        <Modal
            title="Component Lists"
            visible={visible}
            onOk={_handleOk}
            onCancel={handleCancel}
        >
            <AvailableComponentList onSelect={onSelect}/>
        </Modal>
    );
};

AddComponentModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default AddComponentModal;
