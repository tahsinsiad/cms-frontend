import React from "react";
import {Modal} from "antd";


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

export default DeleteWarningModal;