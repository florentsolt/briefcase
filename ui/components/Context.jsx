const React = require("react");
const Promise = require("bluebird");

const FontIcon = require("material-ui/lib/font-icon");
const ImmutabilityHelper = require("material-ui/lib/utils/immutability-helper");

const Pure = require("../inc/Pure");
const Directory = require("../../inc/Directory");
const Storage = require("../Storage");
const TimeAgo = require("./TimeAgo");

class Context extends Pure {

    constructor(props) {
        super(props);
        let style = this.props.style || {};

        this.state = {
            model: false,
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
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        Storage.get(nextProps.model).then((model) => {
            this.setState({
                model: model
            });
            return model;
        }).then((model) => {
            Promise.map(model.derivators || [], (ref) => Storage.get(ref))
                .then((models) => this.setState({derivators: models}));
            Promise.map(model.parents || [], (ref) => Storage.get(ref))
                .then((models) => this.setState({parents: models}));
            Promise.map(model.followers || [], (ref) => Storage.get(ref))
                .then((models) => this.setState({followers: models}));
        });
    }

    renderModel(model) {
        var Icon = Directory.icon(model.constructor.name);

        return (
            <span style={this.state.style} key={model.ref}>
                <Icon model={model} style={ImmutabilityHelper.merge(this.state.style, {marginRight: "0px"})}/> {model.title}
            </span>
        );
    }

    derivators() {
        if (this.props.derivators && this.state.derivators) {
            if (this.state.derivators.length > 0) {
                return this.state.derivators.map(this.renderModel.bind(this));
            } else {
                return <em style={this.state.style}>None</em>;
            }
        } else {
            return false;
        }
    }

    parents() {
        if (this.props.parents && this.state.parents && this.state.parents.length > 0) {
            return (
                <span>
                    {this.props.derivators ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    {this.state.parents.map(this.renderModel.bind(this))}
                </span>
            );
        } else {
            return false;
        }
    }

    followers() {
        if (this.props.followers && this.state.followers && this.state.followers.length > 0) {
            return (
                <span>
                    {this.props.derivators || this.props.parents ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    {this.state.followers.map(this.renderModel.bind(this))}
                </span>
            );
        } else {
            return false;
        }
    }

    date() {
        if (this.props.date) {
            return (
                <span>
                    {this.props.derivators || this.props.parents || this.props.followers ? <FontIcon className="material-icons" style={this.state.style}>chevron_right</FontIcon> : false}
                    <FontIcon className="material-icons" style={ImmutabilityHelper.merge(this.state.style, {marginRight: "0px"})}>event_note</FontIcon>
                    <TimeAgo date={this.state.model.createdAt}/>
                </span>
            );
        } else {
            return false;
        }
    }

    render() {
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
}

module.exports = Context;