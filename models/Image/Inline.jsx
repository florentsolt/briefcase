"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

const style = {
    maxWidth: "150px",
    maxHeight: "150px"
};

class ImageInline extends Pure {

    render() {
        return <img style={style} src="http://placehold.it/450x350"/>;
    }

}

module.exports = ImageInline;