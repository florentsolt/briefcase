"use strict";

const React = require("react");
const FontIcon = require("material-ui/lib/font-icon");
const Pure = require("../../ui/inc/Pure");

class WikiIcon extends Pure {

    render() {
        return (<FontIcon style={this.props.style} className="material-icons">description</FontIcon>);
    }

}

module.exports = WikiIcon;