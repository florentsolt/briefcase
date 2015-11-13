"use strict";

var Model = require("../../inc/Model");

// title, choices

module.exports = class Poll extends Model {
    get title() {
        return this.at("/title");
    }

    static get mapping() {
        return {
            title: {"type":"string"},
            choices: {"type":"string"}
        };
    }

};