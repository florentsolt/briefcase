"use strict";

var Model = require("../../inc/Model");

// name, width, height, size

module.exports = class Image extends Model {
    get title() {
        return this.at("/name");
    }

    get icon() {
        return "image";
    }

    static get mapping() {
        return {
            name: {"type":"string"},
            width: {"type":"long"},
            height: {"type":"long"},
            size: {"type":"long"}
        };
    }

};