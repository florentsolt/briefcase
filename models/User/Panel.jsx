"use strict";

const React = require("react");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

class UserPanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <strong>Full name</strong> {this.props.model.at("/fullname")}<br/>
                <strong>Username</strong> {this.props.model.id}
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = UserPanel;