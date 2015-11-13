"use strict";

var Redis = require("ioredis");

let db = 0;
if (process.env.NODE_ENV === "development") db = 1;
if (process.env.NODE_ENV === "test") db = 2;

var client = new Redis({
    path: "/tmp/redis.sock",
    db: db
});

var Logger = require("../inc/Logger");

client.on("error", function (err) {
    Logger.redis(err);
});

module.exports = client;