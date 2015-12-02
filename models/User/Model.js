"use strict";

var Model = require("../../inc/Model");

// username, password, fullname, email

module.exports = class User extends Model {
    get title() {
        return this.at("/fullname");
    }

    static get idType() {
        return "string";
    }

    static get mapping() {
        return {
            email: {"type":"string"},
            fullname: {"type":"string"},
            password: {"type":"string", "index": "no"}
        };
    }

    static get allowedChildren() {
        return [ "Issue", "Question", "Idea", "Wiki" ];
    }
};