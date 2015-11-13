"use strict";

var Model = require("../../inc/Model");

// text

module.exports = class Idea extends Model {
    get title() {
        return this.at("/text");
    }

    get icon() {
        return "info";
    }

    static get mapping() {
        return {
            text: {"type":"string"}
        };
    }

};