"use strict";

var Model = require("../../inc/Model");

// name

module.exports = class Team extends Model {
    get title() {
        return this.id;
    }

    get icon() {
        return "group_work";
    }

    static get idType() {
        return "string";
    }

};