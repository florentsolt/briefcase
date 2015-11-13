"use strict";

var path = require("path");
var Es = require("../elasticsearch/client");
var Redis = require("../redis/client");
var Logger = require("../inc/Logger");

var query = process.argv[2];
var sort = process.argv[3];

if (query === undefined) {
    console.log(`node ${path.basename(process.argv[1])} "QUERY" "SORT"`);
    process.exit();
}

Es.search(query, sort).then((response) => {
    Logger.info("Total:", response.total);
    response.refs.forEach((refs) => {
        Logger.info(refs);
    });
}).then(() => {
    Redis.disconnect();
});

/*
chilrenOf:Model#42
parentsOf:Model#42

deriveTo:Model#42
deriveFrom:Model#42

followersOf:Model#42
followeesOf:Model#42

*/