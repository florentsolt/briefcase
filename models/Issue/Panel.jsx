"use strict";

const React = require("react");
const textile = require("textile-js");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

const TimeAgo = require("../../ui/components/TimeAgo");

class IssuePanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <div dangerouslySetInnerHTML={{__html: textile(this.props.model.at("/description"))}}></div>
                <ul>
                    <li>
                        <strong>Created At</strong> <TimeAgo date={this.props.model.createdAt}/>
                    </li>

                    <li>
                        <strong>Updated At</strong> <TimeAgo date={this.props.model.updatedAt}/>
                    </li>

                    <li>
                        <strong>Priority</strong> {this.props.model.at("/priority")}
                    </li>

                    <li>
                        <strong>Status</strong> {this.props.model.at("/status")}
                    </li>
                </ul>
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = IssuePanel;