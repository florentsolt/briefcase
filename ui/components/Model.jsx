const React = require("react");
const Panel = require("../mixins/Panel");
const Directory = require("../../inc/Directory");

module.exports = React.createClass({
    displayName: "Model",

    render: function() {
        var Panel = Directory.panel(this.props.params.class);
        return Panel && <Panel model={this.props.params.class + "#" + this.props.params.id}/>;
    }
});