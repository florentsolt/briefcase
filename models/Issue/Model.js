"use strict";

var Model = require("../../inc/Model");

// subject, description, status, priority

module.exports = class Issue extends Model {
    get title() {
        return this.at("/subject");
    }

    get icon() {
        return "assignment";
    }

    static get mapping() {
        return {
            status: {"type": "string", "index": "not_analyzed"},
            priority: {"type": "string", "index": "not_analyzed"},
            description: {"type":"string"},
            subject: {"type":"string"}
        };
    }
};