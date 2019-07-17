// Gets the display name of a JSX component for dev tools
import React, {Component} from "react";
import {auth} from "./auth";

const getDisplayName = Component =>
    Component.displayName || Component.name || 'Component';

export const withAuthSync = WrappedComponent => {
    return class extends Component {
        static displayName = `AuthSyncHooks(${getDisplayName(WrappedComponent)})`;

        static async getInitialProps(ctx) {
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
            return {...componentProps, token: token, user: user}
        }

        // We bind our methods
        // constructor (props) {
        //     super(props);
        //
        //     this.syncLogout = this.syncLogout.bind(this)
        // }

        // New: Add event listener when a restricted Page Component mounts
        // componentDidMount () {
        //     window.addEventListener('storage', this.syncLogout)
        // }

        // New: Remove event listener when the Component unmount and
        // delete all data
        // componentWillUnmount () {
        //     window.removeEventListener('storage', this.syncLogout)
        //     window.localStorage.removeItem('logout')
        // }

        // New: Method to redirect the user when the event is called
        // syncLogout (event) {
        //     if (event.key === 'logout') {
        //         console.log('logged out from storage!')
        //         Router.push('/login')
        //     }
        // }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
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
