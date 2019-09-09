const getURLConstants = require("./constants/URLs");

const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const dotenv = require("dotenv");

dotenv.config();

const webpackConfig = (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
        fs: "empty"
    };
    if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [
            (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                    origExternals[0](context, request, callback);
                } else {
                    callback();
                }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];

        config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
        });
    }
    return config;
};

// module.exports = {
//   webpack: webpackConfig
// };

module.exports = withCss(withSass({
    webpack: webpackConfig,
    publicRuntimeConfig: {
        ...getURLConstants(process.env)
    },
    pageExtensions: ["js"],
}));
