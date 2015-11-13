"use strict";

const SerializableModel = require("./SerializableModel");

var keys = {
    parents: "par",
    children: "chn",
    followees: "fee",
    followers: "fer",
    derivatives: "div",
    derivators: "dor"
};

if (process.env.__BROWSER) {
    class RelatedModel extends SerializableModel {

        constructor(meta, data) {
            super(meta, data);

            if (meta && meta.r && data) {
                this.meta.r = meta.r;

                for (let key in keys) {
                    if (this.meta.r[keys[key]]) {
                        // If an entry in meta.r is avail, inline the data at the toplevel on the model
                        this[key] = this.meta.r[keys[key]];
                    }
                }

                delete(this.meta.r);
            }
        }
    }

    module.exports = RelatedModel;
} else {
    const Promise = require("bluebird");
    const Redis = require("../redis/client");
    const Es = require("../elasticsearch/client");
    const Logger = require("./Logger");
    const Directory = require("./Directory");

    class RelatedModel extends SerializableModel {

        // Parents

        addParent(parent) {
            return this._push("parents", "children", parent);
        }

        parents(scores) {
            return this._list("parents", scores);
        }

        grandParents(scores) {
            return this._grandList("parents", scores);
        }

        // Children

        addChild(child) {
            return this._push("children", "parents", child);
        }

        children(scores) {
            return this._list("children", scores);
        }

        // Followees

        addFollowee(followee) {
            return this._push("followees", "followers", followee);
        }

        followees(scores) {
            return this._list("followees", scores);
        }

        // Followers

        addFollower(follower) {
            return this._push("followers", "followees", follower);
        }

        followers(scores) {
            return this._list("followers", scores);
        }

        // Derivatives

        addDerivative(derivative) {
            return this._push("derivatives", "derivators", derivative);
        }

        derivatives(scores) {
            return this._list("derivatives", scores);
        }

        // Derivators

        addDerivator(derivator) {
            return this._push("derivators", "derivatives", derivator);
        }

        derivators(scores) {
            return this._list("derivators", scores);
        }

        // Relation inclusion or list

        includeRelations() {
            this.meta.r = {};
            return Promise.each(Object.keys(keys), (include) => {
                return this._refList(include).then((refs) => {
                    this.meta.r[keys[include]] = refs;
                });
            }).then(() => this);
        }

        getAllRelationsRefs() {
            if (this.meta.r) {
                var allRefs = [];
                for (let key in this.meta.r) {
                    allRefs = allRefs.concat(this.meta.r[key]);
                }
                return allRefs;
            } else {
                return [];
            }
        }

        // Private

        static _resolveRef(ref) {
            ref = ref.split("#", 2);
            let klass = Directory.model(ref[0]);
            if (klass !== undefined) {
                return klass.find(ref[1]);
            } else {
                throw new Error("Unknown class in the reference " + ref);
            }
        }

        _list(key, scores) {
            return Promise.map(this._refList(key, scores), (ref) => this.constructor._resolveRef(ref));
        }

        _refList(key, scores) {
            if (scores) {
                return Redis.zrange(this.constructor.key(this.id, keys[key]), 0, -1, "withscores").then((data) => {
                    let result = {};
                    while (data.length > 1) {
                        let ref = data.shift();
                        let date = parseInt(data.shift(), 10);
                        result[ref] = date;
                    }
                    return result;
                });
            } else {
                return Redis.zrange(this.constructor.key(this.id, keys[key]), 0, -1);
            }
        }

        _grandListRecurse(ref, key, result) {
            result = result || [];
            return Redis.zrange(ref + "." + keys[key], 0, -1).then((grandRefs) => {
                var newRefs = [];
                grandRefs.forEach((grandRef) => {
                    if (result.indexOf(grandRef) === -1) {
                        result.push(grandRef);
                        newRefs.push(grandRef);
                    }
                });
                return newRefs;
            }).each((grandRef) => {
                return this._grandListRecurse(grandRef, key, result);
            }).then(() => {
                return result;
            });
        }

        _grandList(key) {
            // TODO: remove first level of relations ?
            return this._grandListRecurse(this.ref, key);
        }

        _push(key1, key2, modelOrRef) {
            let ts = new Date().getTime();
            if (modelOrRef instanceof RelatedModel) {
                let model = modelOrRef;
                return Promise.all([
                    Redis.zadd(this.constructor.key(this.id, keys[key1]), "nx", ts, model.ref),
                    Redis.zadd(model.constructor.key(model.id, keys[key2]), "nx", ts, this.ref)
                ]).then(() => {
                    Es.addRelation(this, key1, model.ref);
                    Es.addRelation(this, key1, model.ref.split("#", 2)[0]);

                    Es.addRelation(model, key2, this.ref);
                    Es.addRelation(model, key2, this.ref.split("#", 2)[0]);
                }).then(() => {
                    return this;
                });
            } else if (typeof modelOrRef === "string") {
                let ref = modelOrRef;
                return this.constructor._resolveRef(ref).then((model) => {
                    if (model) {
                        return this._push(key1, key2, model);
                    } else {
                        Logger.warn(`Model ${model} not found, skip the relation`);
                    }
                });
            } else {
                return Promise.reject(new Error("You can only define a relation between models"));
            }
        }
    }

    module.exports = RelatedModel;
}
