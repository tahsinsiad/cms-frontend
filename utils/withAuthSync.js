// Gets the display name of a JSX component for dev tools
import React from "react";
import {auth} from "./auth";

const getDisplayName = Component =>
    Component.displayName || Component.name || "Component";

export const withAuthSync = WrappedComponent => {
    const Component = (props) => {
        // const authContext = useContext(AuthContext);
        // const graphQLClient = useContext(ClientContext);

        // useEffect(()=>{
        //     console.log("setting graphql client auth header");
        //     graphQLClient.setHeader("Authorization", `Bearer ${authContext.token}`);
        // }, [authContext.token]);

        return <WrappedComponent {...props} />;
    };
    Component.displayName = `AuthSyncHooks(${getDisplayName(WrappedComponent)})`;
    Component.getInitialProps = async (ctx) => {
        const authResp = await auth(ctx);
        let user = null;
        let token = null;
        if (authResp) {
            token = authResp.token;
            user = authResp.user;
        }

        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

        console.log(WrappedComponent.displayName, {...componentProps, token: authResp.token, user: authResp.user});
        return {...componentProps, token: token, user: user};
    };

    return Component;
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
