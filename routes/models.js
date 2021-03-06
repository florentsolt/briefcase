"use strict";

var path = require("path");
var express = require("express");
var router = express.Router();
var formidable = require("formidable");
var Promise = require("bluebird");

var Directory = require("../inc/Directory");
var Logger = require("../inc/Logger");
var Es = require("../elasticsearch/client");
var Model = require("../inc/Model");
var File = require("../models/File/Model");


var toJson = function(res, object) {
    res.type("json");
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

router.delete("/:klass/:id", (req, res) => {
    Directory.model(req.params.klass)
        .find(req.params.id)
        .then((model) => model.delete())
        .then(() => Es.indexRelations())
        .then(() => res.status(200).end());
});

router.get("/:klass/:id", (req, res) => {
    Directory.model(req.params.klass)
        .find(req.params.id)
        .then((model) => model.includeRelations())
        .then((model) => {
            if (model === null) {
                res.status(404).send("Data not found.").end();
            } else {
                return toJson(res, model.encode(true));
            }
        });
});

var processFile = function(parent, name, file) {
    return File.create({
        name: name,
        size: file.size,
        type: file.type,
        path: path.basename(file.path)
    }).then((model) => model.addParent(parent))
    .then((model) => model.encode(true));
};

router.post("/File/upload", (req, res) => {
    var form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, "..", "uploads"),
        multiples: true
    });

    form.parse(req, function(err, fields, files) {
        Logger.debug("upload", req.query.parent, JSON.stringify(files));
        return Promise.map(Object.keys(files), (name) => processFile(req.query.parent, name, files[name]))
            .then((models) => toJson(res, models))
            .then(() => Es.indexRelations())
            .catch((e) => Logger.error(e));
    });
});

router.post("/:klass", (req, res) => {
    Model.decode(req.body).save().then((newModel) => {
        res.location("/" + req.params.klass + "/" + newModel.id);
        return toJson(res, newModel.encode(true));
    });
});

// FIXME Use a generic route to manage all relations

router.post("/:klass/:id/parent/:parentKlass/:parentId", (req, res) => {
    Directory.model(req.params.klass)
        .find(req.params.id)
        .then((model) => model.addParent(req.params.parentKlass + "#" + req.params.parentId))
        .then((model) => Es.indexRelations().then(() => model))
        .then((model) => model.includeRelations())
        .then((model) => toJson(res, model.encode(true)))
        .catch((e) => Logger.error(e));
});

router.post("/:klass/:id/derivator/:derivatorKlass/:derivatorId", (req, res) => {
    Directory.model(req.params.klass)
        .find(req.params.id)
        .then((model) => model.addDerivator(req.params.derivatorKlass + "#" + req.params.derivatorId))
        .then((model) => Es.indexRelations().then(() => model))
        .then((model) => model.includeRelations())
        .then((model) => toJson(res, model.encode(true)))
        .catch((e) => Logger.error(e));
});

module.exports = router;