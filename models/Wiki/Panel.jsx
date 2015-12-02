"use strict";

const React = require("react");
const textile = require("textile-js");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");

class WikiPanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <div dangerouslySetInnerHTML={{__html: textile(this.props.model.at("/content"))}}></div>
            </Panel>
        </div>);
    }

}

module.exports = WikiPanel;