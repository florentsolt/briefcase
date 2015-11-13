"use strict";

const React = require("react");
const Pure = require("react/lib/ReactComponentWithPureRenderMixin");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "PollInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return (<div>
            {this.state.model.title}
        </div>);
    }
});