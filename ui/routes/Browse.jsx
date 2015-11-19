"use strict";

const React = require("react");
const Search = require("../components/Search");
const Pure = require("../inc/Pure");

class BrowseRoute extends Pure {

    render() {
        return (
            <div>
                <Search expand date query="not:childrenOf" sort="createdAt:desc"/>
            </div>
        );
    }

}

module.exports = BrowseRoute;