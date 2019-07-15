export const PROJECT_CREATED = "PROJECT_CREATED";
export const SYNCED = "SYNCED";

/* Project Actions */
export const projectCreated = async (dispatch, project) => {
    console.log("new project created");
    dispatch({type: PROJECT_CREATED, payload: project});
};

export const synced = async (dispatch, syncedStates) => {
    console.log("data store synced", syncedStates);
    dispatch({type: SYNCED, payload: syncedStates});
};
