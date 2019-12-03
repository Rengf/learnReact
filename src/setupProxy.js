const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/api/*", {
            target: "http://localhost:3333",
            changeOrigin: true
        })
    )
    app.use(
        proxy(
            "/main/*", {
                target: "http://localhost:3333",
                changeOrigin: true
            }
        )
    );
    app.use(
        proxy(
            "/admin/*", {
                target: "http://localhost:3333",
                changeOrigin: true
            })
    );
};