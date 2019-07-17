import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
import cookie from "js-cookie";
import {redirectTo} from "../../components/common/Redirect";
const { publicRuntimeConfig } = getConfig();
const { API_LOGIN_URL, LOGIN_PATH, DASHBOARD_PATH } = publicRuntimeConfig;

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SYNC_AUTH = "SYNC_AUTH";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

/* Auth Actions */
export const loginRequest = async (dispatch, user) => {
    dispatch({ type: LOGIN_REQUEST });
    fetch(API_LOGIN_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(r => r.json())
        .then(resp => {
            if (resp.status === "success") {
                return loginSuccess(dispatch, resp.data.user, resp.data.token);
            } else {
                return loginFailed(dispatch, resp);
            }
        }, err => {
            return loginFailed(dispatch, err);
        })
        .catch(err => {
            return loginFailed(dispatch, err);
        });
};

export const loginSuccess = async (dispatch, user, token) => {
    dispatch({ type: LOGIN_SUCCESS, payload: {user, token} });
    cookie.set('user', user, {expires: 1})
    cookie.set('token', token, {expires: 1})
    redirectTo(DASHBOARD_PATH, { status: 301 });
};

export const loginFailed = async (dispatch, resp) => {
    cookie.remove('user');
    cookie.remove('token');
    dispatch({ type: LOGIN_FAILED, payload: resp })
    redirectTo(LOGIN_PATH)
};

export const logoutRequest = async (dispatch) => {
    cookie.remove('user');
    cookie.remove('token');
    dispatch({ type: LOGOUT_REQUEST });
    redirectTo(LOGIN_PATH)
};

// export const syncAuth = async (dispatch, user) => {
//     dispatch({ type: SYNC_AUTH, payload: user });
// };
