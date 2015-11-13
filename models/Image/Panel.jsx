"use strict";

const React = require("react");
const Panel = require("../../ui/mixins/Panel");

module.exports = React.createClass({
    displayName: "ImagePanel",
    mixins: [ Panel ],

    modelRender: function() {
        return <p><img src="http://placehold.it/1450x1350"/></p>;
    }
});