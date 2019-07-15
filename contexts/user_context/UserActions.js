export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILED = "ADD_USER_FAILED";

/* User Actions */
export const addUser = async (dispatch, user) => {
    dispatch({type: ADD_USER_REQUEST});
    dispatch({type: ADD_USER_SUCCESS, payload: user});
    dispatch({type: ADD_USER_FAILED});
};
