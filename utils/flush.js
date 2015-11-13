"use strict";

var Redis = require("../redis/client");
var Es = require("../elasticsearch/client");

Es.flush().then(() => {
    return Redis.flushdb();
}).then(() => {
    Redis.disconnect();
});
