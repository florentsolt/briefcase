"use strict";

const React = require("react");

const ImmutabilityHelper = require("material-ui/lib/utils/immutability-helper");

const Pure = require("../inc/Pure");
const Directory = require("../../inc/Directory");

class Ref extends Pure {

    render() {
        var style = {
            height: "100%",
            display: "inline-block",
            verticalAlign: "bottom",
            fontSize: "inherit",
            lineHeight: "inherit",
            color: "inherit"
        };

        var Icon = Directory.icon(this.props.model.constructor.name);

        return(
            <span style={this.props.style}>
                <span style={{display:"inline-block"}}>
                    <Icon model={this.props.model} style={style}/> {this.props.model.title}
                </span>
            </span>
        );
    }
}

module.exports = Ref;