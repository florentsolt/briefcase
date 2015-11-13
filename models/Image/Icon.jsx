"use strict";

const React = require("react");
const Pure = require("react/lib/ReactComponentWithPureRenderMixin");
const FontIcon = require("material-ui/lib/font-icon");

module.exports = React.createClass({
    displayName: "ImageIcon",
    mixins: [ Pure ],

    render: function() {
        return (<FontIcon style={this.props.style} className="material-icons">image</FontIcon>);
    }
});