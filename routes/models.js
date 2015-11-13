"use strict";

var express = require("express");
var router = express.Router();
var Directory = require("../inc/Directory");
var Logger = require("../inc/Logger");
var Es = require("../elasticsearch/client");

var toJson = function(res, object) {
    res.set("Content-Type", "application/json");
    if (object instanceof Error) {
        res.send(JSON.stringify({
            error: true,
            message: object.message,
            stack: object.stack
        }));
    } else if (object) {
        res.send(JSON.stringify(object));
    }
    res.end();
};

var search = function(res, req) {
    try {
        Es.search(req.params.query, req.params.sort, req.params.offset, req.params.size).then((response) => {
            if (response.prefetch) {
                response.prefetch = response.prefetch.map((model) => model.encode(true));
            }
            return toJson(res, response);
        }).catch((e) => {
            res.status(500);
            Logger.error(e);
            return toJson(res, e);
        });
    } catch (e) {
        res.status(500);
        Logger.error(e);
        return toJson(res, e);
    }
};

router.get("/search/:query/:sort/:offset/:size", (req, res) => {
    search(res, req);
});

router.get("/search/:query/:sort/:offset", (req, res) => {
    search(res, req);
});

router.get("/search/:query/:offset", (req, res) => {
    search(res, req);
});

router.get("/search/:query", (req, res) => {
    search(res, req);
});

router.get("/:klass/:id", (req, res) => {
    Directory.model(req.params.klass).find(req.params.id)
        .then((model) => model.includeRelations())
        .then((model) => {
            res.type("json");
            if (model === null) {
                res.status(404).send("Data not found.").end();
            } else {
                return toJson(res, model.encode(true));
            }
        });
});

router.post("/:klass", (req, res) => {
    Directory.model(req.params.klass).create(req.body).then((model) => {
        res.location("/" + req.params.klass + "/" + model.id);
        return toJson(res, model.encode(true));
    });
});

module.exports = router;