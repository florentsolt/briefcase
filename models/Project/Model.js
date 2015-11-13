"use strict";

var Model = require("../../inc/Model");

// name, description

module.exports = class Project extends Model {
    get title() {
        return this.at("/name");
    }

    static get idType() {
        return "string";
    }

    static get mapping() {
        return {
            name: {"type": "string"},
            description: {"type":"string"}
        };
    }

};