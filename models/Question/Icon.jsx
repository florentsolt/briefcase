"use strict";

const React = require("react");
const PureRenderMixin = require("react-addons-pure-render-mixin");
const FontIcon = require("material-ui/lib/font-icon");

module.exports = React.createClass({
    displayName: "QuestionIcon",
    mixins: [ PureRenderMixin ],

    render: function() {
        return (<FontIcon style={this.props.style} className="material-icons">help</FontIcon>);
    }
});