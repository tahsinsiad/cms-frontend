import React, {useState} from "react";
import {Button} from "antd";

const ComponentList = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);

    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

        </div>
    );

};

export default ComponentList;
