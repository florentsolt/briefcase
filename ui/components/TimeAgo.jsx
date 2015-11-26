"use strict";

const React = require("react");
const Moment = require("moment");
const ImmutabilityHelper = require("material-ui/lib/utils/immutability-helper");

const Tooltip = require("./Tooltip");
const Pure = require("../inc/Pure");

class TimeAgo extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            tooltipShown: false
        };
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip() {
        this.setState({ tooltipShown: true });
    }

    hideTooltip() {
        this.setState({ tooltipShown: false });
    }

    render() {
        return (
            <Tooltip text={Moment(this.props.date).calendar()}>
                {Moment(this.props.date).fromNow()}
            </Tooltip>
        );
    }
}

module.exports = TimeAgo;
