import React from "react";
import {withAuthSync} from "../../utils/withAuthSync";
import getConfig from "next/config";
import {redirectTo} from "../../components/common/Redirect";
import {useRouter} from "next/router";

const {publicRuntimeConfig} = getConfig();
const {PROJECT_SETTINGS_PATH} = publicRuntimeConfig;

const Project = (props) => {
    const router = useRouter();
    console.log(router);
    return {};
};

Project.getInitialProps = async (ctx) => {
    return await redirectTo(`${PROJECT_SETTINGS_PATH}?id=${ctx.query.id}`, ctx);
};

const WrappedProject = withAuthSync(Project);

WrappedProject.routeInfo = {
    slug: "project",
    path: "/project",
    pathAs: "/project"
};

export default WrappedProject;
