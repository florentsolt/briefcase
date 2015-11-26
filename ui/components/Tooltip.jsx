"use strict";

const React = require("react");
const MaterialTooltip = require("material-ui/lib/tooltip");

const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");

class Tooltip extends Pure {

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
            <span style={Theme.tooltip.container} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
                <MaterialTooltip touch={false} style={Theme.tooltip.content} label={this.props.text} show={this.state.tooltipShown}
                    verticalPosition="bottom" horizontalPosition="center"/>
                {this.props.children}
            </span>
        );
    }
}

module.exports = Tooltip;
