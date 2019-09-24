import React from "react";
import {
    Tabs,
    PageHeader
} from "antd";
import PageWrapper from "../../common/PageWrapper";
import BasicSetting from "../profile/BasicSetting";
import SecuritySetting from "../profile/SecuiritySetting";
import PrivacySetting from "../profile/PrivacySetting";

const { TabPane } = Tabs;

const Profile = props => {
    const pageHeader = (
        <PageHeader
            title="Profile"
            subTitle="Here you can update your profile."
        />
    );

    return (
        <div>
            <PageWrapper pageHeader={pageHeader}>
                <Tabs tabPosition="left" tabBarStyle={{ width: 170 }}>
                    <TabPane forceRender tab="Basic Setting" key="1">
                        <h2>Basic Setting</h2>
                        <BasicSetting/>
                    </TabPane>
                    <TabPane tab="Security Setting" key="3">
                        <h2>Security Setting</h2>
                        <SecuritySetting/>
                    </TabPane>
                    <TabPane tab="Privacy Setting" key="2">
                        <h2>Privacy Setting</h2>
                        <PrivacySetting/>
                    </TabPane>
                </Tabs>
            </PageWrapper>
        </div>
    );
};

export default Profile;
