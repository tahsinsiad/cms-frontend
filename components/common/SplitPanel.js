import {Divider, Row} from "antd";
import React, {useRef, useState} from "react";
import * as PropTypes from "prop-types";
import "./splitter.scss";

export const SplitPanel = ({onChange, children}) => {
    const [splitPosition1, setSplitPosition1] = useState(16.3);
    const [splitPosition2, setSplitPosition2] = useState(16.3);

    const [dragging, setDragging] = useState(null);
    // const [dragStartX, setDragStartX] = useState(null);
    const handleMouseDown = (e, target)=>{
        setDragging(target);
        // setDragStartX(e.pageX);
    };

    const handleMouseUp = (e)=>{
        setDragging(null);
        // setDragStartX(null);
    };

    const handleMouseMove = (e)=>{
        if (dragging===1) {
            e.preventDefault();
            e.persist();
            setSplitPosition1(Math.max(5, Math.min(40, splitPosition1 + e.movementX/12)));
            // console.log(splitPosition1 + e.movementX/12);
        } else if (dragging===2) {
            e.preventDefault();
            e.persist();
            setSplitPosition2(Math.max(5, Math.min(40, splitPosition2 - e.movementX/12)));
            // console.log(splitPosition2 + e.movementX/12);
        }
    };

    // console.log(dragging, splitPosition1);
    return (
      <Row style={{flex: "0 0 100%"}} type="flex" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
        <div style={{
            flex: `0 0 ${splitPosition1}%`,
            display: "flex"
        }}>
          {children[0]}
        </div>
        <div className="draggable-splitter-wrapper">
          <Divider className="draggable-splitter" type="vertical" onMouseDown={(e)=>handleMouseDown(e, 1)} />
        </div>
        <div style={{
            flex: "1 0 auto",
            display: "flex"
        }}>
          {children[1]}
        </div>
        <div className="draggable-splitter-wrapper">
          <Divider className="draggable-splitter" type="vertical" onMouseDown={(e)=>handleMouseDown(e, 2)} />
        </div>
        <div style={{
              flex: `0 0 ${splitPosition2}%`,
              display: "flex"
          }}>
          {children[2]}
        </div>
      </Row>
    );
};

SplitPanel.propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.array
};
