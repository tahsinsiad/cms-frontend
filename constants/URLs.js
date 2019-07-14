/**
 * This file is meant to be loaded by next.config.js to populate the runtimeConfig. It is not meant to be imported
 * to be compiled by webpack.
 */
module.exports = function getURLConstants(env) {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // ---------------- API ---------------- //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    const API_BASE_URL = env.API_BASE_URL || "//localhost:5000";
    const GRAPHQL_URL = `${API_BASE_URL}${env.GRAPHQL_PATH || "/graphql"}`;
    const RESOLVE_USER_URL = `${API_BASE_URL}/auth/resolve`;
    const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    // ---------------- Application ---------------- //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
    const ROOT_PATH = '/';
    const DASHBOARD_PATH = `${ROOT_PATH}dashboard`;

    const LOGIN_PATH = `${ROOT_PATH}login`;
    const LOGOUT_PATH = `${ROOT_PATH}logout`;
    const FORGOT_PASSWORD_PATH = `${ROOT_PATH}forgot-password`;

    const ABOUT_PATH = `${ROOT_PATH}about`;

    const CREATE_PROJECT_PATH = `${ROOT_PATH}create-project`;

    const ERROR_PAGE = `${ROOT_PATH}_error`;

    return {
        API_BASE_URL,
        GRAPHQL_URL,
        RESOLVE_USER_URL,
        API_LOGIN_URL,
        ROOT_PATH,
        DASHBOARD_PATH,
        LOGIN_PATH,
        LOGOUT_PATH,
        FORGOT_PASSWORD_PATH,
        ABOUT_PATH,
        CREATE_PROJECT_PATH,
        ERROR_PAGE
    }
};
