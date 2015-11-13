"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "MailInline",
    mixins: [ Inline ],

    modelRender: function() {
        return (<div>
            <span className="uk-text-muted">
                {this.state.model.at("/from")} <i className="uk-icon-arrow-right"/>  {this.state.model.at("/to")}
            </span>
            <br/>
            {this.state.model.title}
        </div>);
    }
});