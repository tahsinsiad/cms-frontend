import React from "react";
import {
    Icon,
    List,
    Switch
} from "antd";

const dataPrivacy = [
    {
        title: "Allow Notifications",
        description: "Accept the notification from server"
    },
    {
        title: "Allow third party library",
        description: "Third party library permission"
    },
    {
        title: "Show Email",
        description: "Make your email public to others"
    },
    {
        title: "Security Question",
        description: "Answer to sercure your account"
    }
];

const PrivacySetting = () => {
    return (
        <List
            dataSource={dataPrivacy}
            itemLayout="horizontal"
            style={{ width: 650 }}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            defaultChecked
                        />
                    ]}
                >
                    <List.Item.Meta
                        title={item.title}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    );
};

export default PrivacySetting;
