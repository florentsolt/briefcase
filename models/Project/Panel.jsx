"use strict";

const React = require("react");
const Pure = require("react/lib/ReactComponentWithPureRenderMixin");
const Panel = require("../../ui/mixins/Panel");
const textile = require("textile-js");

module.exports = React.createClass({
    displayName: "ProjectPanel",
    mixins: [ Panel, Pure ],

    modelRender: function() {
        return (
            <div dangerouslySetInnerHTML={{__html: textile(this.state.model.at("/description"))}}></div>
      );
    }
});