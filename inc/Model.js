"use strict";

var pointer = require("json-pointer");
var Promise = require("bluebird");
var RelatedModel = require("./RelatedModel");

if (process.env.__BROWSER) {

    class Model extends RelatedModel {
        static find(conditions) {
            return Promise.resolve(this.name + "#" + conditions);
        }
    }

    module.exports = Model;
} else {

    var Redis = require("../redis/client");
    var Es = require("../elasticsearch/client");

    class Model extends RelatedModel {

        constructor(meta, data, isNew) {
            super(meta, data);
            this.isNew = isNew || false;
        }

        // Static

        static key(id, label) {
            if (label) {
                return this.name + "#" + id + "." + label;
            } else {
                return this.name + "." + id;
            }
        }

        static create(meta, data) {
            return new this(meta, data, true).save();
        }

        static find(conditions) {
            return this._find(conditions);
        }

        static all() {
            return Redis.lrange(this.key("all"), 0, -1).then((ids) => {
                if (!Array.isArray(ids) || ids.length === 0) {
                    return Promise.resolve([]);
                } else {
                    return this._find(ids);
                }
            });
        }

        static each(callback) {
            // .map exists because Redis use Bluebird
            return Redis.lrange(this.key("all"), 0, -1).each((id) => {
                return this._find(id).then((model) => {
                    return callback(model);
                });
            });
        }

        // Prototype

        remove(path) {
            let value = pointer.get(this.data, path);
            pointer.remove(this.data, path);
            return value;
        }

        push(path, value) {
            var list = [];
            try {
                list = pointer.get(this.data, path);
            } catch (e) {
                // if nothing found at the path, ignore, use []
                pointer.set(this.data, path, list);
            }
            if (!Array.isArray(list)) {
                throw new Error(`You tried to push a ${typeof value}  at ${path}`);
            }
            list.push(value);
        }

        save() {
            // If no ID, generate one
            this.meta.u = new Date().getTime();
            if (!this.meta.c) this.meta.c = this.meta.u;

            if (this.meta.i === null) {
                // Auto increment type
                if (this.constructor.idType === "auto-increment") {
                    return Redis.incr(this.constructor.key("id")).then((id) => {
                        this.meta.i = parseInt(id, 10);
                    }).then(() => {
                        return this._save(false);
                    });
                } else {
                    throw new Error(`Model ${this.ref} has no id id`);
                }
            } else {
                // Fixed value ID, string or long

                // TODO check if the ID already exists
                if (!this.id) {
                    throw new Error(`Model ${this.ref} has no id`);
                } else if (this.constructor.idType === "auto-increment") {
                    this.meta.i = parseInt(this.id, 10);
                } else if (this.constructor.idType === "string") {
                    this.meta.i = this.id.trim();
                } else if (this.constructor.idType === "long") {
                    this.meta.i = parseInt(this.id, 10);
                } else {
                    throw new Error(`Model ${this.ref} id type is unkown`);
                }
                return this._save(!this.isNew);
            }
        }

        delete() {
            return super.delete()
                .then(() => Redis.hdel(this.constructor.name, this.id))
                .then(() => Redis.lrem(this.constructor.key("all"), 1, this.id))
                .then(() => Es.delete(this))
                .then(() => this);
        }

        // Private

        static _getIndex(path) {
            for (let index of this.indexes) {
                if (index.path === path) {
                    return index;
                }
            }
        }

        static _find(ids) {
            if (!Array.isArray(ids)) {
                return Redis.hget(this.name, ids)
                    .then((data) => {
                        return this.decode(data);
                    });
            } else {
                return Redis.hmget(this.name, ids)
                    .map((data) => {
                        return this.decode(data);
                    });
            }
        }

        static _indexKey(data, index) {
            let key = data;
            if (index.trim === true) key = key.trim();
            if (index.lowercase === true) key = key.toLowerCase();
            if (index.uppercase === true) key = key.toUpperCase();
            if (index.uniqueness === true) {
                return [this.key("idx") + index.path, this.hash(key)];
            } else {
                return this.key("idx") + index.path + "@" + this.hash(key);
            }
        }

        _fillList() {
            // Use a SET instead of a LIST for .all
            return Redis.rpush(this.constructor.key("all"), this.id);
        }

        _save(update) {
            return Redis.hset(this.constructor.name, this.id, this.encode()).then(() => {
                return this._fillList();
            }).then(() => {
                return update ? Es.update(this) : Es.add(this);
            }).then(() => {
                return this;
            });
        }
    }

    module.exports = Model;
}
