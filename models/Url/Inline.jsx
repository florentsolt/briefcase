"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "UrlInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return  (
            <span>
                {this.state.model.title} — <a href={this.state.model.at("/url")}>{this.state.model.at("/url")}</a>
            </span>
        );
    }
});
