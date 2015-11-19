"use strict";

var Logger = require("../inc/Logger");
var Es = require("../elasticsearch/client");
var Redis = require("../redis/client");
var Model = require("../inc/Model");

Model._resolveRef(process.argv[2]).then((model) => {
    Logger.info("Model " + model.ref + " has been found");
    return model;
}).then((model) => {
    return model.delete();
}).then((model) => {
    return Es.indexRelations().then(() => model);
}).then((model) => {
    Logger.warn("Model " + model.ref + " has been deleted");
    Redis.disconnect();
}).catch((e) => {
    Logger.error(e);
});
