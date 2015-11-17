"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

class IssueInline extends Pure {

    render() {
        return (<div>
            {this.props.model.title}
            <br/>
            <span>
                {this.props.model.at("/priority")} — {this.props.model.at("/status")}
            </span>
        </div>);
    }

}

module.exports = IssueInline;