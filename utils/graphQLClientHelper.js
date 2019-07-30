export async function executeAllPagesQuery(graphQLClient, projectId) {
    return await graphQLClient.fetch(graphQLClient.url, {
        method: "POST",
        headers: {
            ...graphQLClient.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                        query projectPages {
                            allPages {
                                id
                                key
                                title
                                slug
                            }
                        }
                    `,
            projectId: projectId
        })
    }).then( r => r.json() )
}
