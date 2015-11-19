"use strict";

const React = require("react");
const Search = require("../components/Search");
const Pure = require("../inc/Pure");

class SearchRoute extends Pure {

    render() {
        return (
            <div>
                <Search chart to date query={this.props.params.query} size={this.props.params.size} sort={this.props.params.sort}/>
            </div>
        );
    }
}

module.exports = SearchRoute;