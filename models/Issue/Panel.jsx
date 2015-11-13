"use strict";

const React = require("react");
const textile = require("textile-js");

const Panel = require("../../ui/mixins/Panel");
const TimeAgo = require("../../ui/components/TimeAgo");

module.exports = React.createClass({
    displayName: "IssuePanel",
    mixins: [ Panel ],

    modelRender: function() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: textile(this.state.model.at("/description"))}}></div>
                <ul>
                    <li>
                        <strong>Created At</strong>
                        <TimeAgo date={this.state.model.createdAt}/>
                    </li>

                    <li>
                        <strong>Updated At</strong> <TimeAgo date={this.state.model.updatedAt}/>
                    </li>

                    <li>
                        <strong>Priority</strong> {this.state.model.at("/priority")}
                    </li>

                    <li>
                        <strong>Status</strong> {this.state.model.at("/status")}
                    </li>
                </ul>
            </div>
      );
    }
});