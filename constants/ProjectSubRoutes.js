import ProjectSettings from "../components/editor_component/ProjectSettings";
import ProjectHeaders from "../components/editor_component/ProjectHeaders";
import ProjectFooters from "../components/editor_component/ProjectFooters";
import ErrorPage from "../components/error_page/ErrorPage";

const ProjectSubRoutes = {
    'default': ProjectSettings,
    'header': ProjectHeaders,
    'footer': ProjectFooters,
}

export const getComponentForRoute = ({ component }) => {
    if (!component) return ProjectSubRoutes.default;
    const comp = ProjectSubRoutes[component];
    if (!comp) return () => <ErrorPage status={404} subTitle="Sorry, Page not found." />;
    return comp;
}