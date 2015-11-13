"use strict";

const React = require("react");
const Inline = require("../../ui/mixins/Inline");

module.exports = React.createClass({
    displayName: "CommentInline",
    mixins: [ Inline ],

    modelRender: function() {
        return (<div>
            {this.state.model.title}
        </div>);
    }
});