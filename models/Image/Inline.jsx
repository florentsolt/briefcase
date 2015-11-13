"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

const style = {
    maxWidth: "150px",
    maxHeight: "150px"
};

module.exports = React.createClass({
    displayName: "ImageInline",
    mixins: [ Inline ],

    modelRender: function() {
        return <p style={style}><img src="http://placehold.it/450x350"/></p>;
    }
});