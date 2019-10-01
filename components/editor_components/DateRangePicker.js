
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { DatePicker } from "antd";


const DateRangePicker = (props) =>  {

  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [endOpen, setEndOpen] = useState(false);

  const disabledStartDate = startValue => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {

    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => {
    if(field === "startValue"){
        setStartValue(value);
        
    }
    else
    {
        setEndValue(value);
        // eslint-disable-next-line react/prop-types
        //props.end(endValue);
        
    }
};

const onStartChange = value => {
    onChange("startValue", value);
    // eslint-disable-next-line react/prop-types
    props.start(value);
    console.log("Value-1", value);
  };

  const onEndChange = value => {
    onChange("endValue", value);
     // eslint-disable-next-line react/prop-types
     props.end(value);
    console.log("Value-2", value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };


    return (
        <div>
            <DatePicker
          disabledDate={disabledStartDate}
          showTime
          value={startValue}
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Start"
          onChange={onStartChange}
          onOpenChange={handleStartOpenChange}
        />
            <DatePicker
          disabledDate={disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
        </div>
    );
  };

export default DateRangePicker;
          