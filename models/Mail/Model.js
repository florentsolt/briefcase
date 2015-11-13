"use strict";

var Model = require("../../inc/Model");

// subject, from, to, body

module.exports = class Mail extends Model {
    get title() {
        return this.at("/subject");
    }

    get icon() {
        return "mail";
    }

    static get mapping() {
        return {
            from: {"type":"string"},
            to: {"type":"string"},
            subject: {"type":"string"},
            body: {"type":"string"}
        };
    }

};