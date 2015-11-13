"use strict";

const React = require("react");
const Panel = require("../../ui/mixins/Panel");

module.exports = React.createClass({
    displayName: "TeamPanel",
    mixins: [ Panel ],

    modelRender: function() {
        return false;
    }

});