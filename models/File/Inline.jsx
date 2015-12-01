"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");
const Theme = require("../../ui/inc/Theme");

class FileInline extends Pure {

    image() {
        if ((this.props.model.at("/type") || "").match(/^image/)) {
            return <img style={Theme.model.image.inline} src="http://placehold.it/450x350"/>;
        }
        return false;
    }


    render() {
        return (<div>
            {this.props.model.title}
            {this.image()}
        </div>);
    }

}

module.exports = FileInline;