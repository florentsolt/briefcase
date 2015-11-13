"use strict";

var Es = require("../elasticsearch/client");
var Redis = require("../redis/client");
var path = require("path");

var query = process.argv[2];
var sort = process.argv[3];

if (query === undefined) {
    console.log(`node ${path.basename(process.argv[1])} "QUERY" "SORT"`);
    process.exit();
}

Es.search(query, sort).then((response) => {
    console.log("Total: ", response.total);
    response.models.forEach((model) => {
        console.log(model);
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