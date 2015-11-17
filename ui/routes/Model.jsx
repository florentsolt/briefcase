const React = require("react");
const Directory = require("../../inc/Directory");
const Loader = require("../inc/Loader");

module.exports = React.createClass({
    displayName: "ModelRoute",

    render: function() {
        return <Loader ui={Directory.panel(this.props.params.class)} model={this.props.params.class + "#" + this.props.params.id}/>;
    }
});