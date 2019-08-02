import {redirectTo} from "../components/common/Redirect";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {LOGIN_PATH} = publicRuntimeConfig;

export async function executeAllPagesQuery(graphQLClient, projectId) {
    return new Promise((resolve, reject)=>{
        graphQLClient.fetch(graphQLClient.url, {
            method: "POST",
            headers: {
                ...graphQLClient.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                query projectPages {
                    allPages {
                        slug
                        key
                        title
                        path
                        pathAs
                        pathParam
                    }
                }
            `,
                projectId: projectId
            })
        }).then( r => r.json() )
            .then(response=>{
                if (response.errors) {
                    response.errors.forEach((err)=>{
                        err.extensions && err.extensions.code==="FORBIDDEN" && redirectTo(LOGIN_PATH);
                    });
                    reject(response.errors);
                } else {
                    resolve(response.data);
                }
            });
    });
}
