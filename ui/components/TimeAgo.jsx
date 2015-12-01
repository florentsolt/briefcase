"use strict";

const React = require("react");
const Moment = require("moment");

const Tooltip = require("./Tooltip");
const Pure = require("../inc/Pure");

class TimeAgo extends Pure {

    render() {
        return (
            <Tooltip text={Moment(this.props.date).calendar()}>
                {Moment(this.props.date).fromNow()}
            </Tooltip>
        );
    }
}

module.exports = TimeAgo;
