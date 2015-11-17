"use strict";

const React = require("react");
const textile = require("textile-js");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

class ProjectPanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <div dangerouslySetInnerHTML={{__html: textile(this.props.model.at("/description"))}}></div>
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = ProjectPanel;