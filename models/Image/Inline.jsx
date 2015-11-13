"use strict";

const React = require("react");
const Pure = require("react-addons-pure-render-mixin");
const Inline = require("../../ui/mixins/Inline");

const style = {
    maxWidth: "150px",
    maxHeight: "150px"
};

module.exports = React.createClass({
    displayName: "ImageInline",
    mixins: [ Inline, Pure ],

    modelRender: function() {
        return <img style={style} src="http://placehold.it/450x350"/>;
    }
});