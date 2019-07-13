// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ---------------- API ---------------- //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
export const API_BASE_URL = process.env.API_BASE_URL || "//localhost:5000";
export const GRAPHQL_URL = `${API_BASE_URL}${process.env.GRAPHQL_PATH}`;
export const RESOLVE_USER_URL = `${API_BASE_URL}/auth/resolve`;
export const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ---------------- Application ---------------- //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
export const ROOT_PATH = '/';
export const DASHBOARD_PATH = `${ROOT_PATH}dashboard`;

export const LOGIN_PATH = `${ROOT_PATH}login`;
export const LOGOUT_PATH = `${ROOT_PATH}logout`;
export const FORGOT_PASSWORD_PATH = `${ROOT_PATH}forgot-password`;

export const ABOUT_PATH = `${ROOT_PATH}about`;

export const CREATE_PROJECT_PATH = `${ROOT_PATH}create-project`;

export const ERROR_PAGE = `${ROOT_PATH}_error`;
