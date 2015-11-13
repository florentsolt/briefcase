"use strict";

exports.model = function(name) {
    return require("../models/" + name + "/Model");
};

exports.panel = function(name) {
    return require("../models/" + name + "/Panel");
};

exports.inline = function(name) {
    return require("../models/" + name + "/Inline");
};

exports.names = function() {
    if (!process.env.__BROWSER) {
        const fs = require("fs");
        const path = require("path");
        const dir = path.join(__dirname, "..", "models");
        var names = [];
        fs.readdirSync(dir).forEach((file) => {
            if (fs.statSync(path.join(dir, file)).isDirectory() && fs.statSync(path.join(dir, file, "Model.js")).isFile()) {
                names.push(file);
            }
        });
        return names;
    }
};

exports.each = function(callback) {
    exports.names().forEach((name) => callback(exports.model(name)));
};