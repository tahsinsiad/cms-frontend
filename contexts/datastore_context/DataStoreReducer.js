import {PROJECT_CREATED, SYNCED} from "./DataStoreActions";

/* DataStore State */
export const initDataStoreState = {
    projectListUpdated: false,
    updatedProject: null,
};

/* DataStore Reducer */
export const DataStoreReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case PROJECT_CREATED:
            console.log(action.type);
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
