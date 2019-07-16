import { PROJECT_CREATED, SET_CURRENT_PROJECT_ID } from "./DataStoreActions";

/* DataStore State */
export const initDataStoreState = {
    updatedProject: null,
    currentProjectId: null
};

/* DataStore Reducer */
export const DataStoreReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_CREATED:
            return {
                ...state,
                updatedProject: action.payload
            };
        case SET_CURRENT_PROJECT_ID:
            return {
                ...state,
                currentProjectId: action.payload
            };
        default:
            return state
    }

};
