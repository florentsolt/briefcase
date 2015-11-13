const React = require("react");
const Search = require("../components/Search");

module.exports = React.createClass({
    displayName: "SearchRoute",

    render: function() {
        return (
            <div>
                <Search chart to date query={this.props.params.query} size={this.props.params.size} sort={this.props.params.sort}/>
            </div>
        );
    }
});