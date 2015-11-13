"use strict";

const React = require("react");
const Panel = require("../../ui/mixins/Panel");
const ModelProperty = require("../../ui/components/ModelProperty");

module.exports = React.createClass({
    displayName: "UserPanel",
    mixins: [ Panel ],

    modelRender: function() {
        return (
            <div>
                <ModelProperty label="Fullname" value={this.state.model.at("/fullname")} />
                <ModelProperty label="Username" value={this.state.model.at("/username")} />
            </div>
        );
    }
});