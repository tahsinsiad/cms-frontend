import React, { Component } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;

/* First we will make a new context */
export const DataStoreContext = React.createContext();

/* DataStore State */
const initDataStoreState = {
    updatedProject: null,
    projectListUpdated: false,
    currentProjectId: null
};

/* Then create a provider Component */
class DataStoreContextProvider extends Component {
    state = initDataStoreState;

    /* Project Actions */
    projectCreated = (project) => {
        console.log("new project created");
        this.setState({
            projectListUpdated: true,
            updatedProject: project
        })
    };

    setCurrentProjectId = (projectId) => {
        console.log("set current project id");
        this.setState({currentProjectId: projectId})
    };

    synced = (dispatch, syncedStates) => {
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
                    currentProjectId: this.state.currentProjectId,
                    projectCreated: this.projectCreated,
                    setCurrentProjectId: this.setCurrentProjectId,
                    synced: this.synced,
                }}
            >
                {this.props.children}
            </DataStoreContext.Provider>
        )
    }
}

export default DataStoreContextProvider;
