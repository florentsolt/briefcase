"use strict";

const React = require("react");
const Promise = require("bluebird");

const FontIcon = require("material-ui/lib/font-icon");

const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");
const Storage = require("../Storage");
const TimeAgo = require("./TimeAgo");
const Ref = require("./Ref");
const IconTooltip = require("./IconTooltip");

class Context extends Pure {

    constructor(props) {
        super(props);

        this.state = {
            model: false,
            derivators: false,
            parents: false,
            followers: false
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
        return <Ref key={model.ref} style={Theme.context.ref} model={model}/>;
    }

    derivators() {
        if (this.props.derivators && this.state.derivators) {
            let content;
            if (this.state.derivators.length > 0) {
                content = this.state.derivators.map(this.renderModel.bind(this));
            } else {
                content = <em style={Theme.context.none}>None</em>;
            }

            return (
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <IconTooltip style={Theme.context.icon} icon="flight_takeoff" tooltip="Derivators" />
                    <FontIcon className="material-icons" style={Theme.context.icon}>chevron_right</FontIcon>
                    {content}
                </div>);
        } else {
            return false;
        }
    }

    date() {
        if (this.props.date) {
            return (
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <IconTooltip style={Theme.context.icon} icon="event_note" tooltip="Created at" />
                    <TimeAgo date={this.state.model.createdAt}/>
                </div>
            );
        } else {
            return false;
        }
    }

    parents() {
        if (this.props.parents && this.state.parents) {
            let content;
            if (this.state.parents.length > 0) {
                content = this.state.parents.map(this.renderModel.bind(this));
            } else {
                content = <em style={Theme.context.none}>None</em>;
            }

            return (
                <div className="col-xs-12">
                    <IconTooltip style={Theme.context.icon} icon="inbox" tooltip="Inbox" />
                    <FontIcon className="material-icons" style={Theme.context.icon}>chevron_right</FontIcon>
                    {content}
                </div>);
        } else {
            return false;
        }
    }

    followers() {
        if (this.props.followers && this.state.followers) {
            let content;
            if (this.state.followers.length > 0) {
                content = this.state.followers.map(this.renderModel.bind(this));
            } else {
                content = <em style={Theme.context.none}>None</em>;
            }

            return (
                <div className="col-xs-12">
                    <IconTooltip style={Theme.context.icon} icon="remove_red_eye" tooltip="Followers" />
                    <FontIcon className="material-icons" style={Theme.context.icon}>chevron_right</FontIcon>
                    {content}
                </div>);

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
                    <div className="row">
                        {this.derivators()}
                        {this.date()}
                    </div>
                    <div className="row">
                        {this.parents()}
                    </div>
                    <div className="row">
                        {this.followers()}
                    </div>
                </div>
            );
        }
    }
}

module.exports = Context;