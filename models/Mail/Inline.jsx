"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "MailInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return (<div>
            <span>
                {this.state.model.at("/from")} to {this.state.model.at("/to")}
            </span>
            <br/>
            {this.state.model.title}
        </div>);
    }
});