"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");
const Theme = require("../../ui/inc/Theme");

class ImageInline extends Pure {

    render() {
        return <img style={Theme.model.image.inline} src="http://placehold.it/450x350"/>;
    }

}

module.exports = ImageInline;