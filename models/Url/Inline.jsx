"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

class UrlInline extends Pure {

    render() {
        return (<div>
            {this.props.model.title} — <a href={this.props.model.at("/url")}>{this.props.model.at("/url")}</a>
        </div>);
    }

}

module.exports = UrlInline;