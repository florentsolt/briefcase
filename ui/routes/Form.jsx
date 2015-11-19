"use strict";

const React = require("react");
const Pure = require("../inc/Pure");
const Directory = require("../../inc/Directory");
const Loader = require("../inc/Loader");

class FormRoute extends Pure {

    render() {
        return <Loader ui={Directory.form(this.props.params.add)} model={this.props.params.class + "#" + this.props.params.id}/>;
    }
}

module.exports = FormRoute;