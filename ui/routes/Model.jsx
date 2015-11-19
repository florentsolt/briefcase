"use strict";

const React = require("react");
const Directory = require("../../inc/Directory");
const Loader = require("../inc/Loader");
const Pure = require("../inc/Pure");

class ModelRoute extends Pure {

    render() {
        return <Loader ui={Directory.panel(this.props.params.class)} model={this.props.params.class + "#" + this.props.params.id}/>;
    }

}

module.exports = ModelRoute;