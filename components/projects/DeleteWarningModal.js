import React from "react";
import {Modal} from "antd";
import * as PropTypes from "prop-types";

const DeleteWarningModal = ({visible, handleOk, handleCancel}) => {
    return (
        <Modal
            title="Delete Project"
            okText="Yes"
            okType="danger"
            cancelText="No"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Do you want to delete the project?</p>
        </Modal>
    );
};

DeleteWarningModal.propTypes = {
    visible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func
};

export default DeleteWarningModal;