import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {API_LOGIN_URL} = publicRuntimeConfig;

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SYNC_AUTH = "SYNC_AUTH";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

/* Auth Actions */
export const loginRequest = (dispatch, user) => {
    console.log("from action", user);
    dispatch({type: LOGIN_REQUEST});
    fetch(API_LOGIN_URL, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(r => r.json())
        .then(resp => {
            if (resp.status === "success") {
                dispatch({type: LOGIN_SUCCESS, payload: resp});
                // document.cookie = `token=${resp.data.token}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
                document.cookie = `token=${resp.data.token}; path=/;`;
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                dispatch({type: LOGIN_FAILED, payload: resp})
            }
        }, err => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch({type: LOGIN_FAILED, payload: err})
        })
        .catch(err => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch({type: LOGIN_FAILED, payload: err})
        });
};

export const logoutRequest = (dispatch) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({type: LOGOUT_REQUEST});
};

export const syncAuth = (dispatch, user) => {
    dispatch({type: SYNC_AUTH, payload: user});
};
