const React = require("react");
const Moment = require("moment");
const StylePropable = require("material-ui/lib/mixins/style-propable");
const Tooltip = require("material-ui/lib/tooltip");

module.exports = React.createClass({
    displayName: "TimeAgo",

    mixins: [StylePropable],

    getInitialState() {
        return {
            tooltipShown: false
        };
    },

    showTooltip() {
        this.setState({ tooltipShown: true });

    },

    hideTooltip() {
        this.setState({ tooltipShown: false });
    },

    render: function() {
        let style = {
            position: "relative"
        };

        return (
            <span style={this.mergeStyles(style, this.props.style)} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
                <Tooltip style={{boxSizing: "border-box"}} label={Moment(this.props.date).calendar()} show={this.state.tooltipShown}
                    verticalPosition="top" horizontalPosition="center"/>
                {Moment(this.props.date).fromNow()}
            </span>
        );
    }
});