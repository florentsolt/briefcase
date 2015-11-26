"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

const Search = require("../components/Search");

class Children extends Pure {

    render() {
        return (
            <Search date toolbar model={this.props.model} query={"childrenOf:" + this.props.model.ref} sort="createdAt:desc"/>
        );
    }

}

module.exports = Children;