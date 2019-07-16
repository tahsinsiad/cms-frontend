export const PROJECT_CREATED = "PROJECT_CREATED";
export const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";

/* Project Actions */
export const projectCreated = async (dispatch, project) => {
    console.log("new project created");
    dispatch({ type: PROJECT_CREATED, payload: project });
};

export const setCurrentProjectId = async (dispatch, projectId) => {
    console.log("set current project id");
    dispatch({ type: SET_CURRENT_PROJECT_ID, payload: projectId });
};
