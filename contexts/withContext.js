import React, {createContext, useContext, useEffect, useReducer} from 'react';
import { UserReducer, initUserState } from './user_context/UserReducer';
import { AuthReducer, initAuthState } from './auth_context/AuthReducer';
import { loginRequest, logoutRequest, syncAuth } from './auth_context/AuthActions';
import { addUser } from './user_context/UserActions';
import { ContextBinder } from './ContextBinder';
import cookies from "next-cookies";
import {ClientContext} from "graphql-hooks";

export const GlobalContext = createContext();

const withContext = (Component, {user}) => {
    return function GlobalContextProvider(props) {

        const authContext = ContextBinder(useReducer(AuthReducer, initAuthState), {
            loginRequest,
            logoutRequest,
            syncAuth
        });

        const userContext = ContextBinder(useReducer(UserReducer, initUserState), { addUser });
        const client = useContext(ClientContext);

        useEffect(() => {
            authContext.syncAuth(user);
            client.setHeader("Authorization", `Bearer ${authContext.token}`);
        }, [authContext.token]);

        return (
            <GlobalContext.Provider
                value={{
                    authContext,
                    userContext
                }}
            >
                <Component {...props} />
            </GlobalContext.Provider>
        );
    }
};

export default withContext;
