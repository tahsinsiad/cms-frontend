const express = require("express");
const next = require("next");
const dotenv = require("dotenv");

dotenv.config();
const port = parseInt(process.env.SERVER_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

function setupRobotsTXT(server) {
    const robotsOptions = {
        root: __dirname + "/public/",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
        }
    };
    server.get("/robots.txt", (req, res) => (
        res.status(200).sendFile("robots.txt", robotsOptions)
    ));
}

function setupSiteMapXML(server) {
    const siteMapOptions = {
        root: __dirname + "/public/",
        headers: {
            "Content-Type": "text/xml;charset=UTF-8",
        }
    };
    server.get("/sitemap.xml", (req, res) => (
        res.status(200).sendFile("sitemap.xml", siteMapOptions)
    ));
}

function setupFavicon(server) {
    const faviconOptions = {
        root: __dirname + "/public/"
    };
    server.get("/favicon.ico", (req, res) => (
        res.status(200).sendFile("favicon.ico", faviconOptions)
    ));
}

app.prepare().then(() => {
    const server = express();

    setupRobotsTXT(server);
    setupSiteMapXML(server);
    setupFavicon(server);

    // server.get("/project/:component", (req, res) => {
    //     console.log(req.params, req.query);
    //     return app.render(req, res, "/project", { component: req.params.component, ...req.query });
    // });
    // server.get("/project/:component/:subComponent", (req, res) => {
    //     console.log(req.params, req.query);
    //     return app.render(req, res, "/project", { component: req.params.component, ...req.query });
    // });

    server.get("*", (req, res) => {
        // console.log(req.params, req.query);
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
