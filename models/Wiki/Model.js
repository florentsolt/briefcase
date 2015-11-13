"use strict";

var Model = require("../../inc/Model");

// title, content

module.exports = class Wiki extends Model {
    get title() {
        return this.at("/title");
    }

    static get mapping() {
        return {
            title: {"type":"string"},
            content: {"type":"string"}
        };
    }

};