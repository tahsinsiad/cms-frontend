import React from "react";
import {Modal} from "antd";
import * as PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { useQuery, useMutation } from "graphql-hooks";
import { DataStoreContext } from "/home/vivasoft/Downloads/cms-frontend/contexts/DataStoreContextProvider.js";

const DELETEPROJECT = `
  mutation DeleteProject($id: ID!){
    deleteProject(id: $id)
  }
`;

const DeleteWarningModal = ({visible, project, handleCancel, success}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [deleteProject] = useMutation(DELETEPROJECT);
    console.log("Delete", project);

    const deleteHandler = (project) => {
        console.log("Id from onOk:", project.id);
        deleteProject({ variables:  { id: project.id }  });
        dataStoreContext.setProjectListUpdated(true);
        success();
        
    };
    return (
        <Modal
            title="Delete Project"
            okText="Yes"
            okType="danger"
            cancelText="No"
            visible={visible}
            onOk={() => deleteHandler(project)}
            onCancel={handleCancel}
        >
            <p>Do you want to delete {project.title}?</p>
        </Modal>
    );
};

DeleteWarningModal.propTypes = {
    visible: PropTypes.bool,
    project: PropTypes.object,
    handleCancel: PropTypes.func,
    success: PropTypes.func
};

export default DeleteWarningModal;