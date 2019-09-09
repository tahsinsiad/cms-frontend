import React, {useEffect, useRef} from "react";
import * as PropTypes from "prop-types";

import getConfig from "next/config";
import {useRouter} from "next/router";

const {publicRuntimeConfig} = getConfig();
const {API_NEXT_PROJECT_URL} = publicRuntimeConfig;

const PreviewPageComponents = ({pageDetails, pageName}) => {
    const ref = useRef();
    const router = useRouter();
    const projectId = router.query.id;
    const [style, setStyle] = React.useState({});
    useEffect(() => {
        ref.current.src = `${API_NEXT_PROJECT_URL}/${pageName}?projectId=${projectId}`;
        setStyle({visibility: "visible", background: "url(/static/loader.gif) center center no-repeat"});
    }, [pageName]);
    const onLoad = () => {
        setStyle({});
    };
    return (
        <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={style} onLoad={onLoad}/>
    );
    // return (
    {/*<iframe ref={ref} id="ifPageComponents" width="100%" height="100%"/>*/
    }
    // );
};

PreviewPageComponents.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default PreviewPageComponents;
