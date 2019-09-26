import React from "react";
import Profile from "../components/layout/header/Profile";
const ProfileDetails = () => {
    return (
        <div>
            <Profile/>
        </div>
    );
};

ProfileDetails.routeInfo = {
    slug: "profile-setting",
    path: "/profile-setting",
    pathAs: "/profile-setting"
};

export default ProfileDetails;
