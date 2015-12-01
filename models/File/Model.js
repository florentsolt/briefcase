"use strict";

var Model = require("../../inc/Model");

// name, size

module.exports = class File extends Model {
    get title() {
        return this.at("/name");
    }

    static get mapping() {
        return {
            name: {"type":"string"},
            size: {"type":"long"},
            type: {"type":"string"}
        };
    }

};