"use strict";

var Model = require("../../inc/Model");

// message, files, changes

module.exports = class Commit extends Model {
    get title() {
        return this.at("/message");
    }

    static get mapping() {
        return {
            message : {"type":"string"}
        };
    }

};
