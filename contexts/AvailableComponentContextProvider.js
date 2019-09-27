import React, {Component} from "react";
import * as PropTypes from "prop-types";

export const AvailableComponentContext = React.createContext();

const initComponentState = {
    loadComponent: false,
    componentList: []
};

class AvailableComponentContextProvider extends Component {
    state = initComponentState;

    addComponent = async (component) =>{
        this.setState({
            componentList: this.state.componentList.concat(component)
        });
    }

    render() {
        return (
            <AvailableComponentContext.Provider
                value={{
                    loadComponent: this.state.loadComponent,
                    componentList: this.state.componentList,
                    addComponent: this.addComponent,
                }}
            >
                {this.props.children}
            </AvailableComponentContext.Provider>
        );
    }
}

AvailableComponentContextProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default AvailableComponentContextProvider;