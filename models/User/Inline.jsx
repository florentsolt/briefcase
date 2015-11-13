"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "UserInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return (<div>
            {this.state.model.title}
        </div>);
    }
});