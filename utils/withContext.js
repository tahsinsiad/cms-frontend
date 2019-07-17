import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { UserReducer, initUserState } from '../contexts/user_context/UserReducer';
import { AuthReducer, initAuthState } from '../contexts/auth_context/AuthReducer';
import { DataStoreReducer, initDataStoreState } from "../contexts/datastore_context/DataStoreReducer";
import {loginRequest, logoutRequest, loginSuccess} from '../contexts/auth_context/AuthActions';
import { addUser } from '../contexts/user_context/UserActions';
import { projectCreated, synced } from '../contexts/datastore_context/DataStoreActions';
import { ContextBinder } from './ContextBinder';
import { ClientContext } from "graphql-hooks";
import {auth} from "./auth";

export const GlobalContext = createContext({});

const withContext = (Component) => {
    const GlobalContextProvider = (props) => {
        const {user, token} = props;
        const authContext = ContextBinder(useReducer(AuthReducer, {...initAuthState, user, token, isLoggedIn: user && token}),
            { loginRequest, loginSuccess, logoutRequest });
        const userContext = ContextBinder(useReducer(UserReducer, initUserState), { addUser });
        const dataStoreContext = ContextBinder(useReducer(DataStoreReducer, initDataStoreState), { projectCreated, synced });
        // const graphQLClient = useContext(ClientContext);

        // useEffect(() => {
        //     props.graphQLClient.setHeader("Authorization", `Bearer ${authContext.token || token}`);
        // });

        // useEffect(() => {
        //     console.log('syncyng auth', user, token, props);
        //     if (user && token) {
        //         authContext.loginSuccess(JSON.parse(user), token);
        //     }
        // }, []);

        return (
            <GlobalContext.Provider
                value={{
                    authContext,
                    userContext,
                    dataStoreContext,
                    // graphQLClient: props.graphQLClient
                }}
            >
                {/*<ClientContext.Provider value={props.graphQLClient}>*/}
                    <Component {...props} />
                {/*</ClientContext.Provider>*/}
            </GlobalContext.Provider>
        );
    };
    GlobalContextProvider.getInitialProps = async (ctx) => {
        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        // console.log("GlobalContextProvider initial props: ", {...componentProps});
        return {...componentProps}
    };
    return GlobalContextProvider;
};

export default withContext;
