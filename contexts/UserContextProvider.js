import React, { Component } from 'react'
import fetch from "isomorphic-unfetch";
import getConfig from 'next/config'
import cookie from "js-cookie";
import {redirectTo} from "../components/common/Redirect";
import {ADD_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "./user_context/UserActions";
const { publicRuntimeConfig } = getConfig();
const { API_LOGIN_URL, LOGIN_PATH, DASHBOARD_PATH } = publicRuntimeConfig;

/* First we will make a new context */
export const UserContext = React.createContext();

/* User State */
const initUserState = {
    loading: false,
    users: [
        {id: 1, firstName: 'Md', lastName: 'Shamim'}, {id: 2, firstName: 'Md', lastName: 'Mehedi'}
    ]
};

/* Then create a provider Component */
class UserContextProvider extends Component {
    state = initUserState;

    /* User Actions */
    addUser = async (user) => {
        this.setState({
            users: this.state.users.concat(user)
        })
    };

    render () {
        return (
            <UserContext.Provider
                value={{
                    loading: this.state.loading,
                    users: this.state.users,
                    addUser: this.addUser,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserContextProvider;
