"use strict";

var pointer = require("json-pointer");
var hash = require("object-hash");

class IsomorphicModel {

    constructor(meta, data) {
        if (data === undefined) {
            data = meta;
            meta = {};
        }

        if (typeof meta !== "object") {
            this.meta = {
                "i": meta,
                "c": null,
                "u": null
            };
        } else {
            this.meta = {
                "i": meta.i || meta.id || null,               // i > ID
                "c": meta.c || meta.createdAt || null,        // c > createdAt
                "u": meta.u || meta.updatedAt || null         // u > updatedAt
            };
        }
        this.data = data || {};
    }

    get title() {
        throw new Error("Default title property has not been specified");
    }

    get ref() {
        return `${this.constructor.name}#${this.id}`;
    }

    get id() {
        return this.meta.i;
    }

    get createdAt() {
        return this.meta.c;
    }

    get updatedAt() {
        return this.meta.u;
    }

    at(path, value) {
        if (typeof value == "undefined") {
            try {
                return pointer.get(this.data, path);
            } catch (e) {
                return undefined;
            }
        } else {
            pointer.set(this.data, path, value);
            return this;
        }
    }

    static get idType() {
        return "auto-increment";
    }

    static get mapping() {
        return {};
    }

    static hash(data) {
        let options = {
            "encoding": "hex", // binary",
            "respectFunctionProperties": false,
            "respectTypes": false
        };
        return hash(data, options);
    }

    hash() {
        return this.constructor.hash([this.meta, this.data]);
    }

    static get allowedChildren() {
        return [];
    }

}

module.exports = IsomorphicModel;