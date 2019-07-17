import React, { Component } from 'react'
import fetch from "isomorphic-unfetch";
import getConfig from 'next/config'
import cookie from "js-cookie";
import {redirectTo} from "../components/common/Redirect";
const { publicRuntimeConfig } = getConfig();
const { API_LOGIN_URL, LOGIN_PATH, DASHBOARD_PATH } = publicRuntimeConfig;

/* First we will make a new context */
export const DataStoreContext = React.createContext();

/* DataStore State */
const initDataStoreState = {
    updatedProject: null,
    projectListUpdated: false
};

/* Then create a provider Component */
class DataStoreContextProvider extends Component {
    state = initDataStoreState;

    /* Project Actions */
    projectCreated = async (project) => {
        console.log("new project created");
        this.setState({
            projectListUpdated: true,
            updatedProject: project
        })
    };

    synced = async (dispatch, syncedStates) => {
        console.log("data store synced", syncedStates);
        this.setState({
            ...syncedStates
        })
    };

    render () {
        return (
            <DataStoreContext.Provider
                value={{
                    projectListUpdated: this.state.projectListUpdated,
                    updatedProject: this.state.updatedProject,
                    projectCreated: this.projectCreated,
                    synced: this.synced,
                }}
            >
                {this.props.children}
            </DataStoreContext.Provider>
        )
    }
}

export default DataStoreContextProvider;
