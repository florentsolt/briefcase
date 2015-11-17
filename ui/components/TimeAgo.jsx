const React = require("react");
const Moment = require("moment");
const ImmutabilityHelper = require("material-ui/lib/utils/immutability-helper");
const Tooltip = require("material-ui/lib/tooltip");

const Pure = require("../inc/Pure");

class TimeAgo extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            tooltipShown: false
        };
    }

    showTooltip() {
        this.setState({ tooltipShown: true });
    }

    hideTooltip() {
        this.setState({ tooltipShown: false });
    }

    render() {
        let style = ImmutabilityHelper.merge({
            position: "relative"
        }, this.props.style);

        return (
            <span style={style} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
                <Tooltip style={{boxSizing: "border-box"}} label={Moment(this.props.date).calendar()} show={this.state.tooltipShown}
                    verticalPosition="top" horizontalPosition="center"/>
                {Moment(this.props.date).fromNow()}
            </span>
        );
    }
}

module.exports = TimeAgo;
