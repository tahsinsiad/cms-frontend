import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import unfetch from 'isomorphic-unfetch';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {GRAPHQL_URL} = publicRuntimeConfig;

let graphQLClient = null;

function create (initialState, token) {
    // const c = cookies(initialState.ctx);
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const isBrowser = typeof window !== 'undefined';
    return new GraphQLClient({
        connectToDevTools: isBrowser,
        headers: {
            Authorization: `Bearer ${token}`
        },
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        url: GRAPHQL_URL, // Server URL (must be absolute)
        fetch: typeof window !== 'undefined' ? fetch.bind() : unfetch, // eslint-disable-line
        cache: memCache({ initialState }),
    })
}

export default function initGraphQL (initialState, token) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return create(initialState, token)
    }

    // Reuse client on the client-side
    if (!graphQLClient) {
        graphQLClient = create(initialState, token)
    }

    return graphQLClient
}
