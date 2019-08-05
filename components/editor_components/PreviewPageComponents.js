import React, {useEffect, useRef} from "react";
import * as PropTypes from "prop-types";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_NEXT_PROJECT_URL } = publicRuntimeConfig;

const PreviewPageComponents = ({pageDetails, pageName}) => {
    const ref = useRef();
    useEffect(()=>{
        ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=5d36a94f10d48f2cfe05d4be`;
    }, [pageName]);
    return (
      <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={{visibility: "visible"}} />
    );
};

PreviewPageComponents.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default PreviewPageComponents;
