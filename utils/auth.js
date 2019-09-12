import {redirectTo} from "../components/common/Redirect";
import nextCookie from "next-cookies";
import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { LOGIN_PATH, RESOLVE_USER_URL } = publicRuntimeConfig;

export const auth = async ctx => {
    const { token, user } = nextCookie(ctx);

    if (!token) {
        return redirectTo(LOGIN_PATH, { res: ctx.res, status: 301 });
    }

    const response = await fetch(RESOLVE_USER_URL, {
        method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        // body: JSON.stringify({ token: c.token })
    })
        .then(r => r.json())
        .then(resp => {
            // console.log("auth", resp);
            //if auth check was successful, send to dashboard
            if (resp.status !== "success") {
                //setting the cookie to expire way back when removes it
                cookie.remove("token");
                return redirectTo(LOGIN_PATH, { res: ctx.res, status: 301 });
            }
            return resp;
        })
        .catch((err) => {
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // redirectTo(LOGIN_PATH, { res: ctx.res, status: 302 });
            console.error(err);
            return false;
        });

    return response ? {user, token} : null;
};

/**
 * Usage
 * import { withAuthSync } from '../utils/auth'
 *
 * const Profile = props =>
 * <div>If you can see this, you are logged in.</div>
 *
 * export default withAuthSync(Profile)
 */
