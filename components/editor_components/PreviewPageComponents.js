import React, {useEffect, useRef} from "react";
import * as PropTypes from "prop-types";
import ListPageComponents from "./ListPageComponents";

const PreviewPageComponents = ({pageDetails, pageName}) => {
    const ref = useRef();
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            ref.current.src = `http://localhost:3001/${pageName}`;
        });
        return ()=>clearTimeout(timeout);
    }, [pageName]);
    return (
      <iframe ref={ref} id="ifPageComponents" width="100%" height="100%" style={{visibility: "visible"}}
        src={`http://localhost:3001/${pageName}`} />
    );
};

PreviewPageComponents.propTypes = {
    pageDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default PreviewPageComponents;
