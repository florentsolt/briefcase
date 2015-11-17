"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

class TeamInline extends Pure {

    render() {
        return (<div>
            {this.props.model.id}
        </div>);
    }

}

module.exports = TeamInline;