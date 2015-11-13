"use strict";

var Model = require("../../inc/Model");

// text

module.exports = class Question extends Model {
    get title() {
        return this.at("/text");
    }

    get icon() {
        return "help";
    }

    static get mapping() {
        return {
            text: {"type":"string"}
        };
    }

};