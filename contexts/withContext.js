import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { UserReducer, initUserState } from './user_context/UserReducer';
import { AuthReducer, initAuthState } from './auth_context/AuthReducer';
import { DataStoreReducer, initDataStoreState } from "./datastore_context/DataStoreReducer";
import { syncAuth, loginRequest, logoutRequest } from './auth_context/AuthActions';
import { addUser } from './user_context/UserActions';
import { projectCreated, setCurrentProjectId } from './datastore_context/DataStoreActions';
import { ContextBinder } from './ContextBinder';
import { ClientContext } from "graphql-hooks";

export const GlobalContext = createContext({});

const withContext = (Component, { user }) => {
    return function GlobalContextProvider(props) {

        const authContext = ContextBinder(useReducer(AuthReducer, initAuthState), { syncAuth, loginRequest, logoutRequest });
        const userContext = ContextBinder(useReducer(UserReducer, initUserState), { addUser });
        const dataStoreContext = ContextBinder(useReducer(DataStoreReducer, initDataStoreState), { projectCreated, setCurrentProjectId });
        const graphQLClient = useContext(ClientContext);

        useEffect(() => {
            authContext.syncAuth(user);
            graphQLClient.setHeader("Authorization", `Bearer ${authContext.token}`);
        }, [authContext.token]);

        return (
            <GlobalContext.Provider
                value={{
                    authContext,
                    userContext,
                    dataStoreContext,
                    graphQLClient
                }}
            >
                <Component {...props} />
            </GlobalContext.Provider>
        );
    }
};

export default withContext;
