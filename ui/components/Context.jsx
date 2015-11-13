const React = require("react");
const History = require("react-router").History;
const FontIcon = require("material-ui/lib/font-icon");
const StylePropable = require("material-ui/lib/mixins/style-propable");
const Loader = require("../mixins/Loader");
const TimeAgo = require("./TimeAgo");
const Directory = require("../../inc/Directory");

module.exports = React.createClass({
    displayName: "Context",
    mixins: [ History, StylePropable, Loader ],

    getInitialState: function() {
        let style = this.props.style || {};

        return {
            derivators: false,
            parents: false,
            followers: false,
            style: {
                height: "100%",
                display: "inline-block",
                verticalAlign: "bottom",
                fontSize: style.fontSize || "inherit",
                lineHeight: style.lineHeight || "inherit",
                color: style.color || "inherit",
                marginRight: "1em"
            }
        };
    },

    renderModel: function(model) {
        var Icon = Directory.icon(model.constructor.name);

        return (
            <span style={this.state.style} key={model.ref}>
                <Icon model={model} style={this.mergeStyles(this.state.style, {marginRight: "0px"})}/> {model.title}
            </span>
        );
    },

    derivators: function() {
        if (this.props.derivators) {
            if (this.state.model.derivators.length > 0) {
                return this.state.model.derivators.map(this.renderModel);
            } else {
                return <em style={this.state.style}>None</em>;
            }
        } else {
            return false;
        }
    },


    parents: function() {
        if (this.props.parents && this.state.model.parents.length > 0) {
            return (
                <span>
                    {this.props.derivators ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    {this.state.model.parents.map(this.renderModel)}
                </span>
            );
        } else {
            return false;
        }
    },

    followers: function() {
        if (this.props.followers && this.state.model.followers.length > 0) {
            return (
                <span>
                    {this.props.derivators || this.props.parents ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    {this.state.model.followers.map(this.renderModel)}
                </span>
            );
        } else {
            return false;
        }
    },

    date: function() {
        if (this.props.date) {
            return (
                <span>
                    {this.props.derivators || this.props.parents || this.props.followers ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    <FontIcon className="material-icons" style={this.mergeStyles(this.state.style, {marginRight: "0px"})}>event_note</FontIcon>
                    <TimeAgo date={this.state.model.createdAt}/>
                </span>
            );
        } else {
            return false;
        }
    },

    render: function() {
        if (!this.state.model) {
            return false;
        } else {
            return(
                <div style={this.props.style}>
                    {this.derivators()}
                    {this.parents()}
                    {this.followers()}
                    {this.date()}
                </div>
            );
        }
    }
});