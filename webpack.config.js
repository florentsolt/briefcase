"use strict";

var webpack = require("webpack");
var Directory = require("./inc/Directory");

var config = {
    entry: "./ui/Router.jsx",
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: "./public/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /(models\/.*|inc)\/.*\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || ""),
                __BROWSER: true
            }
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: Directory.names()
            }
        })
    );
}
else {
    config.devtool = "source-map";
}

require("./redis/client").disconnect();

module.exports = config;
