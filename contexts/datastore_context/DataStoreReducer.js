import {PROJECT_CREATED, SYNCED} from "./DataStoreActions";

/* DataStore State */
export const initDataStoreState = {
    updatedProject: null,
    projectListUpdated: false
};

/* DataStore Reducer */
export const DataStoreReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_CREATED:
            return {
                ...state,
                projectListUpdated: true,
                updatedProject: action.payload
            };
        case SYNCED:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }

};
