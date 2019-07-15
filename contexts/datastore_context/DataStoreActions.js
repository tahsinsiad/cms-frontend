export const PROJECT_CREATED = "PROJECT_CREATED";

/* Project Actions */
export const projectCreated = async (dispatch, project) => {
    console.log("new project created");
    dispatch({ type: PROJECT_CREATED, payload: project });
};
