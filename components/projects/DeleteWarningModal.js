import React, {useContext} from "react";
import {message, Modal} from "antd";
import * as PropTypes from "prop-types";
import {useMutation} from "graphql-hooks";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider.js";

const DELETE_PROJECT = `
  mutation DeleteProject($id: ID!){
    deleteProject(id: $id)
  }
`;

const DeleteWarningModal = ({visible, project, handleCancel, onSuccess}) => {
    const dataStoreContext = useContext(DataStoreContext);
    const [deleteProject] = useMutation(DELETE_PROJECT);

    const deleteHandler = async (project) => {
        console.log("Id from onOk:", project.id);
        const result = await deleteProject({variables: {id: project.id}});
        if (!result.error) {
            dataStoreContext.setProjectListUpdated(true);
            onSuccess && onSuccess();
        } else {
            message.error((result.httpError && result.httpError.statusText) ||
                (result.graphQLErrors && result.graphQLErrors[0].message));
        }
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
    onSuccess: PropTypes.func
};

export default DeleteWarningModal;
