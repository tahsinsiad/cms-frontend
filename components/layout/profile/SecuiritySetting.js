import React from "react";
import {
    List
} from "antd";

const data = [
    {
        title: "Account Password",
        description: "Change your password"
    },
    {
        title: "Security Phone",
        description: "Current phone number is +88017xxxxxxxx71"
    },
    {
        title: "Backup Email",
        description: "tak.siad16@gmail.com"
    },
    {
        title: "Security Question",
        description: "Answer to sercure your account"
    }
];

const SecuritySetting = () => {
    return (
        <List
            dataSource={data}
            itemLayout="horizontal"
            style={{ width: 650 }}
            renderItem={item => (
                <List.Item actions={[<a key="list-loadmore-edit">edit</a>]}>
                    <List.Item.Meta
                        title={item.title}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    );
};

export default SecuritySetting;
