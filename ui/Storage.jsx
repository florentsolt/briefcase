"use strict";

const events = require("events");
const Model = require("../inc/Model");
const superagent = require("superagent");

let cache = new Map();

var refToPath= function(ref) {
    // Todo support when ref is a Model and not a string
    return ref.replace("#", "/");
};

// Use a callback, to call again the caller setState() when the model has been updated

class Storage extends events.EventEmitter {

    get(ref) {
        if (ref instanceof Model) {
            return Promise.resolve(ref);
        } else if (cache.has(ref)) {
            return Promise.resolve(cache.get(ref));
        } else {
            return new Promise((resolve, reject) => {
                superagent.get(`/api/${refToPath(ref)}`).end((err, res) => {
                    if (err) reject(err);
                    resolve(Model.decode(res.body));
                });
            }).then((model) => {
                cache.set(model.ref, model);
                return model;
            });
        }
    }

    add(model) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: `/api/${model.constructor.name}`,
                data: model.encode(),
                contentType: "application/json",
                error: reject,
                success: (response) => {
                    let newModel = Model.decode(response);
                    cache.set(newModel.ref, newModel);
                    resolve(newModel);
                }
            });

    addParent(ref, refToParent) {
        return new Promise((resolve, reject) => {
            superagent.post(`/api/${refToPath(ref)}/parent/${refToPath(refToParent)}`)
                .end((err, res) => {
                    if (err) reject(err);
                    let newModel = Model.decode(res.body);
                    cache.set(newModel.ref, newModel);
                    resolve(newModel);
                });
        });
    }

    addDerivator(ref, refToDerivator) {
        return new Promise((resolve, reject) => {
            superagent.post(`/api/${refToPath(ref)}/derivator/${refToPath(refToDerivator)}`)
                .end((err, res) => {
                    if (err) reject(err);
                    let newModel = Model.decode(res.body);
                    cache.set(newModel.ref, newModel);
                    resolve(newModel);
                });
        });
    }

    delete(ref) {
        return new Promise((resolve, reject) => {
            superagent.del(`/api/${refToPath(ref)}`).end((err, res) => {
                if (err) reject(err);
                resolve(res.body);
            });
        });
    }

    search(query, sort, offset, size) {
        query = encodeURIComponent(query);
        sort = encodeURIComponent(sort || "");
        offset = parseInt(offset || 0, 10);
        size = parseInt(size || 50, 10);

        return new Promise((resolve, reject) => {
            superagent.get(`/api/search/${query}/${sort}/${offset}/${size}`).end((err, res) => {
                if (err) reject(err);
                resolve(res.body);
            });

        }).then((response) => {
            if (response.prefetch) {
                response.prefetch.forEach((data) => {
                    let model = Model.decode(data);
                    cache.set(model.ref, model);
                });
                delete(response.prefetch);
            }
            return response;
        });
    }

    upload(parent, files) {
        return new Promise((resolve, reject) => {
            var request = superagent.post("/api/File/upload");
            request.query({ parent: parent.ref });
            files.forEach((file)=> {
                request.attach(file.name, file, file.name);
            });
            request.end((err, res) => {
                if (err) reject(err);
                resolve(res.body.map((data) => {
                    let model = Model.decode(data);
                    cache.set(model.ref, model);
                    return model;
                }));
            });
        });
    }
}

module.exports = new Storage();