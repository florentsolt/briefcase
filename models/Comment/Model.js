"use strict";

var Model = require("../../inc/Model");

// text

module.exports = class Comment extends Model {
    get title() {
        return this.at("/text");
    }

    static get mapping() {
        return {
            text: {"type":"string"}
        };
    }

};