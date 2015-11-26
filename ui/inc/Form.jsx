"use strict";

const React = require("react");
const Paper = require("material-ui/lib/paper");
const ListItem = require("material-ui/lib/lists/list-item");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const ToolbarTitle = require("material-ui/lib/toolbar/toolbar-title");
const Button = require("material-ui/lib/flat-button");
const FontIcon = require("material-ui/lib/font-icon");

const Pure = require("../../ui/inc/Pure");
const Theme = require("../../ui/inc/Theme");
const Storage = require("../../ui/Storage");
const History = require("./History");
const Ref = require("../components/Ref");
const IconTooltip = require("../components/IconTooltip");

class Form extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onSubmit() {
        if (this.props.onSubmit) {
            Storage.add(this.props.onSubmit());
        }
    }

    onBack() {
        History.goBack();
    }

    render() {
        return (
            <Paper style={Theme.form.container}>
                <ListItem disabled style={Theme.form.ListItem}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.props.title}/>
                        </ToolbarGroup>
                    </Toolbar>
                </ListItem>
                <ListItem disabled style={Theme.form.ListItem}>
                    <div style={Theme.form.parents}>
                        <IconTooltip style={Theme.form.parentsIcon} icon="inbox" tooltip="Inbox" />
                        <FontIcon className="material-icons" style={Theme.form.parentsIcon}>chevron_right</FontIcon>
                        <Ref model={this.props.parent}/>
                    </div>
                </ListItem>
                <div style={Theme.form.content}>
                    {this.props.children}
                    <div style={Theme.form.footer}>
                        <Button label="Back" secondary onTouchTap={this.onBack}/>
                        <Button label="Submit" primary onTouchTap={this.onSubmit}/>
                    </div>
                </div>
            </Paper>
        );
    }

}

module.exports = Form;