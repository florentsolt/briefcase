"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const FontIcon = require("material-ui/lib/font-icon");

module.exports = React.createClass({
    displayName: "UpdateIcon",
    mixins: [ Pure ],

    render: function() {
        return (<FontIcon style={this.props.style} className="material-icons">trending_up</FontIcon>);
    }
});