"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "UrlInline",
    mixins: [ Inline ],

    modelRender: function() {
        return  (
            <span>
                {this.state.model.title}
                <a href={this.state.model.at("/url")}>
                    {this.state.model.at("/url")}
                </a>
            </span>
        );
    }
});
