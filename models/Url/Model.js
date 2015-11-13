"use strict";

var Model = require("../../inc/Model");

// title, url

module.exports = class Url extends Model {
    get title() {
        return this.at("/title");
    }

    static get mapping() {
        return {
            title: {"type":"string"},
            url: {"type":"string"}
        };
    }

};