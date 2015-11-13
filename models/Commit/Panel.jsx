"use strict";

const React = require("react");
const Panel = require("../../ui/mixins/Panel");
const ModelProperty = require("../../ui/components/ModelProperty");
const TimeAgo = require("../../ui/components/TimeAgo");

module.exports = React.createClass({
    displayName: "CommitPanel",
    mixins: [ Panel ],

    modelRender: function() {
        return (
            <div>
                <div className="uk-panel uk-panel-box uk-panel-box-secondary">{this.state.model.at("/message")}</div>
                <ModelProperty label="Commited at" value={<TimeAgo date={this.state.model.createdAt}/>} />
            </div>
      );
    }
});