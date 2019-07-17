export function concatQueryParamsToPath(path, params) {
    let modifiedPath = path;
    let f = false;
    for (const paramKey in params) {
        if (params.hasOwnProperty(paramKey) && typeof params[paramKey] != 'undefined') {
            if (f) modifiedPath += '&';
            else modifiedPath += '?';
            modifiedPath += `${paramKey}=${params[paramKey]}`;
            f = true;
        }
    }
    return modifiedPath;
}

export function concatPathParamsToPath(path, params) {
    console.log("concatPathParamsToPath", params);
    let modifiedPath = path;
    for (const param of Object.values(params)) {
        if (typeof param != 'undefined') {
            modifiedPath += `/${param}`;
        }
    }
    return modifiedPath;
}

export function getNewNavWithParamsToPath(nav, params) {
    return {
        ...nav,
        path: concatQueryParamsToPath(nav.path, {...params.query, component: nav.pathParam}),
        pathAs: concatQueryParamsToPath(concatPathParamsToPath(nav.path, {pathParam: nav.pathParam}), params.query)
    }
}

export function getNavsWithParamsToPath(navs, params) {
    let modifiedNavs = [];
    for (const nav of navs) {
        modifiedNavs.push(getNewNavWithParamsToPath(nav, params))
    }
    return modifiedNavs;
}
