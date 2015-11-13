"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Panel = require("../../ui/mixins/Panel");
const ModelProperty = require("../../ui/components/ModelProperty");

module.exports = React.createClass({
    displayName: "UserPanel",
    mixins: [ Panel, Pure ],

    modelRender: function() {
        return (
            <div>
                <ModelProperty label="Fullname" value={this.state.model.at("/fullname")} />
                <ModelProperty label="Username" value={this.state.model.at("/username")} />
            </div>
        );
    }
});