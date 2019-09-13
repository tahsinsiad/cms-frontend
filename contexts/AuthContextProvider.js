import React, {Component} from "react";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import cookie from "js-cookie";
import {redirectTo} from "../components/common/Redirect";
import * as PropTypes from "prop-types";

const {publicRuntimeConfig} = getConfig();
const {API_LOGIN_URL, LOGIN_PATH, DASHBOARD_PATH} = publicRuntimeConfig;

/* First we will make a new context */
export const AuthContext = React.createContext();

const initAuthState = {
    isLoggedIn: false,
    token: "",
    user: null,
    loading: false,
    error: null,
};

/* Then create a provider Component */
class AuthContextProvider extends Component {
    state = initAuthState;

    constructor(props) {
        super(props);
        this.state.user = props.user;
        this.state.token = props.token;
    }


    loginRequest = (user) => {
        this.setState({
            isLoggedIn: false,
            loading: true,
            error: null
        });
        fetch(API_LOGIN_URL, {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.status === "success") {
                    return this.loginSuccess(resp.data.user, resp.data.token);
                } else {
                    return this.loginFailed(resp);
                }
            }, err => {
                return this.loginFailed(err);
            })
            .catch(err => {
                return this.loginFailed(err);
            });
    };

    loginSuccess = async (user, token) => {
        cookie.set("user", user, {expires: 1});
        cookie.set("token", token, {expires: 1});
        this.setState({
            isLoggedIn: true,
            loading: false,
            error: null,
            user: user,
            token: token,
        });
        return await redirectTo(DASHBOARD_PATH, {status: 301});
    };

    loginFailed = async (err) => {
        cookie.remove("user");
        cookie.remove("token");
        this.setState({
            isLoggedIn: false,
            loading: false,
            error: err,
            user: null,
            token: null,
        });
        return await redirectTo(LOGIN_PATH);
    };

    logoutRequest = async () => {
        cookie.remove("user");
        cookie.remove("token");
        this.setState({
            isLoggedIn: false,
            loading: false,
            error: null,
            user: null,
            token: null,
        });
        return await redirectTo(LOGIN_PATH);
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    loading: this.state.loading,
                    error: this.state.error,
                    user: this.state.user,
                    token: this.state.token,
                    loginRequest: this.loginRequest,
                    logoutRequest: this.logoutRequest,
                    loginSuccess: this.loginSuccess,
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

AuthContextProvider.propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    children: PropTypes.element,
};

export default AuthContextProvider;
