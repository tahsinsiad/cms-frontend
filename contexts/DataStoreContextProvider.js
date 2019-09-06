import React, { Component } from "react";
import getConfig from "next/config";
import * as PropTypes from "prop-types";
const { publicRuntimeConfig } = getConfig();
const { DASHBOARD_PATH } = publicRuntimeConfig;

/* First we will make a new context */
export const DataStoreContext = React.createContext();

/* DataStore State */
const initDataStoreState = {
    projectUpdated: false,
    projectListUpdated: false,
    pageDetailsUpdated: false,
    currentProject: null,
    selectedProjectItem: null
};

/* Then create a provider Component */
class DataStoreContextProvider extends Component {
    state = initDataStoreState;

    /* Project Actions */
    setCurrentProject = (project) => {
        console.log("set current project id");
        this.setState({ currentProject: project });
    };

    setProjectUpdated = (isUpdate) => {
        console.log("set project update");
        this.setState({ projectUpdated: isUpdate });
    };

    setProjectListUpdated = (isUpdated) => {
        console.log("data store synced", isUpdated);
        this.setState({
            projectListUpdated: isUpdated
        });
    };

    setPageDetailsUpdated = (isUpdated) => {
        console.log("data store synced", isUpdated);
        this.setState({
            pageDetailsUpdated: isUpdated
        });
    };

    setSelectedProjectItem = (item) => {
        console.log("selected project page item", item);
        this.setState({
            selectedProjectItem: item
        });
    };

    render() {
        return (
          <DataStoreContext.Provider
            value={{
                projectListUpdated: this.state.projectListUpdated,
                projectUpdated: this.state.projectUpdated,
                pageDetailsUpdated: this.state.pageDetailsUpdated,
                currentProject: this.state.currentProject,
                selectedProjectItem: this.state.selectedProjectItem,
                setCurrentProject: this.setCurrentProject,
                setProjectUpdated: this.setProjectUpdated,
                setPageDetailsUpdated: this.setPageDetailsUpdated,
                setProjectListUpdated: this.setProjectListUpdated,
                setSelectedProjectItem: this.setSelectedProjectItem,
            }}>
            {this.props.children}
          </DataStoreContext.Provider>
        );
    }
}

DataStoreContextProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default DataStoreContextProvider;
