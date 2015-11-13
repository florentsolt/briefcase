"use strict";

var Model = require("../../inc/Model");

// title, old, new

module.exports = class Url extends Model {
    get title() {
        return this.at("/title");
    }

    get icon() {
        return "trending_up";
    }

    static get mapping() {
        return {
            title: {"type":"string"},
            old: {"type":"string"},
            new: {"type":"string"}
        };
    }

};