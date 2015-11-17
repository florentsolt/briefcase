"use strict";

const events = require("events");
const Model = require("../inc/Model");

let cache = new Map();

var refToPath= function(ref) {
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
                $.get(`/api/${refToPath(ref)}`, (response) => {
                    resolve(Model.decode(response));
                }).fail(reject);

            }).then((model) => {
                cache.set(model.ref, model);
                return model;
            });
        }
    }

    search(query, sort, offset, size) {
        query = encodeURIComponent(query);
        sort = encodeURIComponent(sort || "");
        offset = parseInt(offset || 0, 10);
        size = parseInt(size || 50, 10);

        return new Promise((resolve, reject) => {
            $.get(`/api/search/${query}/${sort}/${offset}/${size}`, (response) => {
                resolve(response);
            }).fail(reject);

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
}

module.exports = new Storage();