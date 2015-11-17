"use strict";

const React = require("react");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

class TeamPanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}/>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = TeamPanel;