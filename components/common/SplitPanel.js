import {Divider, Row} from "antd";
import React, {useRef, useState} from "react";
import * as PropTypes from "prop-types";

export const SplitPanel = ({onChange, children}) => {
    const [splitPosition, setSplitPosition] = useState(20);

    const [dragging, setDragging] = useState(false);
    // const [dragStartX, setDragStartX] = useState(null);
    const handleMouseDown = (e)=>{
        setDragging(true);
        // setDragStartX(e.pageX);
    };

    const handleMouseUp = (e)=>{
        setDragging(false);
        // setDragStartX(null);
    };

    const handleMouseMove = (e)=>{
        e.preventDefault();
        // e.stopPropagation();
        if (dragging) {
            e.persist();
            // console.log(e);
            // const newX = e.pageX;
            // setSplitPosition(splitPosition - (dragStartX - newX));
            setSplitPosition(Math.max(15, Math.min(60, splitPosition + e.movementX/12)));
            // setDragStartX(e.pageX);
        }
    };

    // console.log(dragging, splitPosition);
    return (
      <Row style={{flex: "0 0 100%"}} type="flex" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
        <div style={{
            flex: `0 0 ${splitPosition}%`,
            display: "flex"
        }}>
          {children[0]}
        </div>
        <div className="draggable-splitter-wrapper">
          <Divider className="draggable-splitter" type="vertical" onMouseDown={handleMouseDown} />
        </div>
        <div style={{
            flex: "1 0 0",
            display: "flex"
        }}>
          {children[1]}
        </div>
      </Row>
    );
};

SplitPanel.propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.array
};
