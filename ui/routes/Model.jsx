const React = require("react");
const Directory = require("../../inc/Directory");

module.exports = React.createClass({
    displayName: "ModelRoute",

    render: function() {
        var Panel = Directory.panel(this.props.params.class);
        return Panel && <Panel model={this.props.params.class + "#" + this.props.params.id}/>;
    }
});