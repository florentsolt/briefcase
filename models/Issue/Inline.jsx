"use strict";

const React = require("react");
const Pure = require("react/lib/ReactComponentWithPureRenderMixin");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "IssueInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return (<div>
            {this.state.model.title}
            <br/>
            <span>
                {this.state.model.at("/priority")} — {this.state.model.at("/status")}
            </span>
        </div>);
    }
});