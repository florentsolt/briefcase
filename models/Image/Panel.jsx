"use strict";

const React = require("react");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");
const Theme = require("../../ui/inc/Theme");

class ImagePanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <p><img style={Theme.model.image.panel} src="http://placehold.it/1450x1350"/></p>
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = ImagePanel;