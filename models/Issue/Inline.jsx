"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "IssueInline",
    mixins: [ Inline ],

    modelRender: function() {
        return (<div>
            {this.state.model.title}
            <br/>
            <span className="uk-text-muted">
                {this.state.model.at("/priority")} — {this.state.model.at("/status")}
            </span>
        </div>);
    }
});