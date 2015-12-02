"use strict";

var Promise = require("bluebird");
var elasticsearch = require("elasticsearch");
var extend = require("util")._extend;
var Directory = require("../inc/Directory");
var Logger = require("../inc/Logger");

var client = new elasticsearch.Client({
    // log: "trace",
    host: "localhost:9200"
});

var index = "briefcase";
if (process.env.NODE_ENV === "development") index = "briefcase_dev";
if (process.env.NODE_ENV === "test") index = "briefcase_test";

var filter = function(query) {
    return query
        .replace(/\b(type|id|createdAt|updatedAt|childrenOf|parentsOf|deriveTo|deriveFrom|followersOf|followeesOf):/g, "_$1:")
        .replace(/\bnot:(childrenOf|parentsOf|deriveTo|deriveFrom|followersOf|followeesOf)\b/g, "_missing_:_$1")
        .replace(/^\s*(\w+)#(\d+)\s*$/, "(_type:$1 _id:$2)");
};

var bulk = [];

var relations = {
    children: "_parentsOf",
    parents: "_childrenOf",
    followees: "_followersOf",
    followers: "_followeesOf",
    derivatives: "_deriveTo",
    derivators: "_deriveFrom"
};

module.exports = {
    flush: function() {
        return client.indices.delete({index: index}).catch(() => {
            // Ignore when the index does not exist
        }).then(() => this.createIndex());
    },

    refresh: function() {
        Logger.debug("Refresh index");
        return client.indices.refresh({index: index});
    },

    addRelation: function(model, name, ref) {
        // Logger.debug(`Indexing new "${name}" relation ${model.ref} -> ${ref}...`);
        let script = "if (!ctx._source.%PROP%.contains(relation)) { ctx._source.%PROP% += relation }";
        bulk.push(
            { update: { _type: model.constructor.name, _id: model.id } },
            { params: { relation: ref }, script: script.replace(/%PROP%/g, relations[name]) }
        );
    },

    removeRelation: function(model, name, ref) {
        Logger.debug(`Indexing "${name}" relation removal ${model.ref} -> ${ref}...`);
        let script = "ctx._source.%PROP% -= relation";
        bulk.push(
            { update: { _type: model.constructor.name, _id: model.id } },
            { params: { relation: ref }, script: script.replace(/%PROP%/g, relations[name]) }
        );
    },

    setGrandRelation: function(model, name, refs) {
        if (!Array.isArray(refs) || refs.length === 0) return;

        var doc = {};
        switch (name) {
        case "children":
            doc._grandChildrenOf = refs;
            break;
        case "parents":
            doc._grandParentsOf = refs;
            break;
        }

        bulk.push(
            { update: { _type: model.constructor.name, _id: model.id } },
            doc
        );
    },


    indexRelations: function() {
        if (bulk.length > 0) {
            Logger.warn("Flushing buffered relations list, " + (bulk.length / 2) + " entries");
            return client.bulk({
                body: bulk,
                index: index
            }).then(() => {
                bulk = [];
                return this.refresh();
            });
        } else {
            return Promise.resolve();
        }
    },

    add: function(model) {
        var data = {
            _createdAt: model.meta.c,
            _updatedAt: model.meta.u,
            _parentsOf: [],
            _grandParentsOf: [],
            _childrenOf: [],
            _grandChildrenOf: [],
            _followeesOf: [],
            _followersOf: [],
            _deriveFrom: [],
            _deriveTo: []
        };

        // Logger.debug(`Adding to index ${model.ref}...`);
        return client.index({
            index: index,
            type: model.constructor.name,
            id: model.id,
            body: extend(data, model.data)
        }).then(() => this.refresh());
    },

    delete: function(model) {
        return client.delete({
            index: index,
            type: model.constructor.name,
            id: model.id
        }).then(() => this.refresh());
    },

    update: function(model) {
        var doc = {
            _createdAt: model.meta.c,
            _updatedAt: model.meta.u
        };

        // Logger.debug(`Updating index for ${model.ref}...`);
        return client.update({
            index: index,
            type: model.constructor.name,
            id: model.id,
            body: {doc: extend(doc, model.data)}
        }).then(() => this.refresh());
    },

    search: function(query, sort, offset, size) {
        var Model = require("../inc/Model"); // require is done here to prevent cycle

        if (typeof sort === "string" && sort.trim().match(/^\d+$/)) {
            sort = false;
            offset = sort;
            size = offset;
        }
        size = parseInt(size, 10) || 50;
        offset = parseInt(offset || 0, 10);

        let request = {
            index: index,
            body: {
                query: {
                    query_string: {
                        query: filter(query),
                        default_operator: "AND"
                    }
                }
            },
            sort: filter(sort || ""),
            size: size,
            from: offset,
            _source: true
        };

        if (offset === 0) {
            request.body.aggregations = {
                models_over_time : {
                    date_histogram : {
                        field : "_createdAt",
                        interval : "1d",
                        format : "yyyy-MM-dd"
                    }
                }
            };
        }

        return client.search(request).then((response) => {
            return Promise.map(response.hits.hits, (hit) => {
                var klass = Directory.model(hit._type);
                if (klass) {
                    return klass.find(hit._id);
                } else {
                    return undefined;
                }

            }).filter((model) => {
                // If find() did not work or if the object was unkown
                return model && model instanceof Model;

            }).map((model) => {
                return model.includeRelations();

            }).then((models) => {
                var existingRefs = models.map((model) => model.ref);
                var refs = models.map((model) => model.getAllRelationsRefs())
                    .reduce((a, b) => a.concat(b), []) // flatten
                    .filter((ref) => { // uniq
                        if (existingRefs.indexOf(ref) === -1) {
                            existingRefs.push(ref);
                            return true;
                        } else {
                            return false;
                        }
                    });


                return Promise
                    .map(refs, (ref) => Model._resolveRef(ref))
                    .each((model) => models.push(model))
                    .then(() => [existingRefs, models]);

            }).spread((allRefs, models) => {

                let refs = response.hits.hits.map((hit) => hit._type + "#" + hit._id)
                    .filter((ref) => allRefs.indexOf(ref) !== -1); // skip refs that can't be prefetched, ie. not found

                return {
                    total: response.hits.total,
                    refs: refs,
                    prefetch: models,
                    offset: offset,
                    size: size,
                    aggregation: response.aggregations ? response.aggregations.models_over_time.buckets : false
                };
            });
        });
    },

    createIndex: function() {
        var mappings = {
            index: index,
            body: {
                "mappings": {},
                "settings": {
                    "refresh_interval": -1
                }
            }
        };

        Directory.each((klass) => {
            mappings.body.mappings[klass.name] = { properties: klass.mapping };
            let properties = mappings.body.mappings[klass.name].properties;
            // properties._id = {"type": klass.idType === "string" ? "string" : "long", "index": "not_analyzed"};
            properties._createdAt = {"type":"date"};
            properties._updatedAt = {"type":"date"};
            properties._parentsOf = {"type": "string", "index": "not_analyzed"};
            properties._childrenOf = {"type": "string", "index": "not_analyzed"};
            properties._followeesOf = {"type": "string", "index": "not_analyzed"};
            properties._followersOf = {"type": "string", "index": "not_analyzed"};
            properties._deriveFrom = {"type": "string", "index": "not_analyzed"};
            properties._deriveTo = {"type": "string", "index": "not_analyzed"};
        });
        return client.indices.create(mappings);
    }
};