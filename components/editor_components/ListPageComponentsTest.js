import React, {useContext, useEffect, useState} from "react";
import * as PropTypes from "prop-types";

import {Button, message, Tree} from "antd";
import {DataStoreContext} from "../../contexts/DataStoreContextProvider";
import {useMutation} from "graphql-hooks";
import {useRouter} from "next/router";

const {TreeNode} = Tree;

class ListPageComponents extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
             expandKeys: [],
             
             
        }
    }

    componentDidUpdate(pageDetails){
        this.setState({
            pageChildren: pageDetails.children || []
        });
        for(let i=0;i<pageChildren.length; i++){
            console.log("Data: " + JSON.stringify(pageChildren[i]));
        }
        
    }

    render(){
        return(
            <div></div>
        )
    }
    

}

export default ListPageComponents