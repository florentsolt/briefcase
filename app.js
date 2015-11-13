"use strict";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var Logger = require("./inc/Logger");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use((req, res, next) => {
    Logger.http(`${req.method} ${req.url}`);
    next();
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    store: new RedisStore({
        client: require("./redis/client"),
        prefix: "Session."
    }),
    saveUninitialized: false
}));

app.use("/", require("./routes/passport"));
app.use("/api/", require("./routes/models"));

app.get("/*", (req, res) => {
    if (req.xhr) {
        res.status(404).end();
    } else {
        res.render("index");
    }
});

app.use((err, req, res) => {
    // FIXME manage JSON response
    Logger.error(err);
    if (req.xhr) {
        res.status(500).send({ error: "Something blew up!" });
    } else {
        res.status(500).render("error", { error: err });
    }
});

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    Logger.info("Listening at http://%s:%s", host, port);
});
