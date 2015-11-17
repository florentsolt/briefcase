"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

class IdeaInline extends Pure {

    render() {
        return (<div>
            {this.props.model.title}
        </div>);
    }

}

module.exports = IdeaInline;