"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");
const Theme = require("../../ui/inc/Theme");

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const ToolbarTitle = require("material-ui/lib/toolbar/toolbar-title");
const IconButton = require("material-ui/lib/icon-button");
const FontIcon = require("material-ui/lib/font-icon");

const Context = require("../components/Context");
const Actions = require("../components/Actions");

class Panel extends Pure {

    constructor() {
        super();
        this.state = {
            collapsed: true,
            icon: "expand_more"
        };

        this.onToggleCollapse = this.onToggleCollapse.bind(this);
    }

    onToggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed,
            icon: this.state.collapsed ? "expand_less" : "expand_more"
        });
    }

    render() {
        var icon = (<IconButton tooltipPosition="bottom-center" onTouchTap={this.onToggleCollapse}>
            <FontIcon className="material-icons">
                {this.state.icon}
            </FontIcon>
        </IconButton>);

        return (
            <Paper style={Theme.panel.container}>
                <List style={Theme.panel.List}>
                    <ListItem disabled style={Theme.panel.ListItem} rightIconButton={<Actions model={this.props.model}/>}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text={this.props.model.ref + " — " + this.props.model.title}/>
                            </ToolbarGroup>
                        </Toolbar>
                    </ListItem>
                    <ListItem disabled style={Theme.panel.ListItem} rightIconButton={icon}>
                        <Context date derivators parents={!this.state.collapsed} followers={!this.state.collapsed} style={Theme.panel.context} model={this.props.model}/>
                    </ListItem>
                    <ListDivider style={Theme.panel.ListDivider}/>
                    <ListItem disabled>
                        {this.props.children}
                    </ListItem>
                </List>
            </Paper>
        );
    }

}

module.exports = Panel;