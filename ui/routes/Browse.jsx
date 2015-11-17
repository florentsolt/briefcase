"use strict";

const React = require("react");
const Search = require("../components/Search");

module.exports = React.createClass({
    displayName: "InboxRoute",

    render: function() {
        return (
            <div>
                <Search expand date query="not:childrenOf" sort="createdAt:desc"/>
            </div>
        );
    }
});