"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "GroupInline",
    mixins: [ Inline ],

    modelRender: function() {
        return (<div>
            {this.state.model.name}
        </div>);
    }
});