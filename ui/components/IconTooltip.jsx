"use strict";

const React = require("react");
const FontIcon = require("material-ui/lib/font-icon");

const Pure = require("../inc/Pure");
const Tooltip = require("./Tooltip");

class IconTooltip extends Pure {

    render() {
        return (
            <Tooltip text={this.props.tooltip}>
                <FontIcon style={this.props.style} className="material-icons">{this.props.icon}</FontIcon>
            </Tooltip>
        );
    }
}

module.exports = IconTooltip;
