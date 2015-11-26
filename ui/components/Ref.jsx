"use strict";

const React = require("react");

const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");
const Directory = require("../../inc/Directory");

class Ref extends Pure {

    render() {
        var Icon = Directory.icon(this.props.model.constructor.name);

        return(
            <span style={this.props.style}>
                <span style={Theme.ref.container}>
                    <Icon model={this.props.model} style={Theme.ref.icon}/> {this.props.model.title}
                </span>
            </span>
        );
    }
}

module.exports = Ref;