import { PROJECT_CREATED } from "./DataStoreActions";

/* DataStore State */
export const initDataStoreState = {
    updatedProject: null,
};

/* DataStore Reducer */
export const DataStoreReducer = (state, action) => {
    switch (action.type) {
        case PROJECT_CREATED:
            return {
                ...state,
                updatedProject: action.payload
            };
        default:
            return state
    }

};
