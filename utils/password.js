"use strict";

var path = require("path");

var User = require("../models/User/model");
var Redis = require("../redis/client");
var Logger = require("../inc/Logger");

var username = process.argv[2];
var password = process.argv[3];

if (username === undefined || password === undefined) {
    console.log(`node ${path.basename(process.argv[1])} "USERNAME" "PASSWORD"`);
    process.exit();
}

User.find(username).then((user) => {
    if (!user) {
        Logger.error("No user found");
    } else {
        return user.at("/password", password).save();
    }
}).then(() => {
    Logger.info("done");
    Redis.disconnect();
});