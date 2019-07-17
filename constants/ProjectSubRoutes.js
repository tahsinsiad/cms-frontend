import ProjectSettings from "../components/editor_components/ProjectSettings";
import ProjectPages from "../components/editor_components/ProjectPages";
import ProjectHeaders from "../components/editor_components/ProjectHeaders";
import ProjectFooters from "../components/editor_components/ProjectFooters";
import ErrorPage from "../components/error_page/ErrorPage";
import React from "react";

const ProjectSubRoutes = {
    'default': ProjectSettings,
    'pages': ProjectPages,
    'header': ProjectHeaders,
    'footer': ProjectFooters,
};

export const getComponentForRoute = ({ component }) => {
    if (!component) return ProjectSubRoutes.default;
    const comp = ProjectSubRoutes[component];
    if (!comp) return () => <ErrorPage status={404} subTitle="Sorry, Page not found." />;
    return comp;
};
