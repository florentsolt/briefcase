"use strict";

const Directory = require("./Directory");
const IsomorphicModel = require("./IsomorphicModel");

class SerializableModel extends IsomorphicModel {
    encode(onlyPacking) {
        var data = {
            _: this.constructor.name, // _ for class
            m: this.meta, // m for meta
            d: this.data // d for data
        };
        return onlyPacking === true ? data : JSON.stringify(data);
    }

    static decode(data) {
        // Because we try to blindly decode search results, it may be null
        if (!data) return data;

        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        let klass = Directory.model(data._);
        if (klass !== undefined) {
            return new klass(data.m, data.d);
        } else {
            throw new Error("Unknown class in the reference " + JSON.stringify(data._));
        }
    }
}

module.exports = SerializableModel;