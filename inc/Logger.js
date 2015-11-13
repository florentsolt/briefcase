"use strict";

var Winston = require("winston");

var config = {
    levels: {
        redis: 1,
        http: 2,
        data: 3,
        debug: 4,
        info: 5,
        warn: 6,
        error: 7
    },
    colors: {
        info: "green",
        data: "grey",
        warn: "yellow",
        debug: "blue",
        error: "red",
        http: "grey",
        redis : "grey"
    }
};

var transports = [new Winston.transports.Console({
    colorize: true,
    level: "redis",
    timestamp: true
})];

module.exports = new Winston.Logger({
    transports: transports,
    levels: config.levels,
    colors: config.colors
});
