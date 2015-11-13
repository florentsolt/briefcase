"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Panel = require("../../ui/mixins/Panel");
const ModelProperty = require("../../ui/components/ModelProperty");
const TimeAgo = require("../../ui/components/TimeAgo");

module.exports = React.createClass({
    displayName: "CommitPanel",
    mixins: [ Panel, Pure ],

    modelRender: function() {
        return (
            <div>
                <div>{this.state.model.at("/message")}</div>
                <ModelProperty label="Commited at" value={<TimeAgo date={this.state.model.createdAt}/>} />
            </div>
        );
    }
});