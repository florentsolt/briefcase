"use strict";

const React = require("react");

const Pure = require("../../ui/inc/Pure");
const Panel = require("../../ui/inc/Panel");
const Children = require("../../ui/inc/Children");

const style = {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
};

class ImagePanel extends Pure {

    render() {
        return (<div>
            <Panel model={this.props.model}>
                <p><img style={style} src="http://placehold.it/1450x1350"/></p>
            </Panel>
            <Children model={this.props.model}/>
        </div>);
    }

}

module.exports = ImagePanel;