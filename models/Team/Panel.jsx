"use strict";

const React = require("react");
const Pure = require("react/lib/ReactComponentWithPureRenderMixin");
const Panel = require("../../ui/mixins/Panel");

module.exports = React.createClass({
    displayName: "TeamPanel",
    mixins: [ Panel, Pure ],

    modelRender: function() {
        return false;
    }

});