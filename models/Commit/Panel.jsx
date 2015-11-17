"use strict";

const React = require("react");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

const TimeAgo = require("../../ui/components/TimeAgo");

class CommitPanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <div>{this.props.model.at("/message")}</div>
                <strong>Commited at</strong> <TimeAgo date={this.props.model.createdAt}/>
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = CommitPanel;