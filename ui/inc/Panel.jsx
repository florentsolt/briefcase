"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const ToolbarTitle = require("material-ui/lib/toolbar/toolbar-title");

const Context = require("../components/Context");
const Menu = require("../components/Menu");

class Panel extends Pure {

    render() {
        return (
            <Paper style={{marginTop: "1em"}}>
                <List style={{paddingTop: "0px"}}>
                    <ListItem disabled style={{padding: "0px"}} rightIconButton={<Menu/>}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text={this.props.model.ref + " — " + this.props.model.title}/>
                            </ToolbarGroup>
                        </Toolbar>
                    </ListItem>
                    <ListItem disabled style={{padding: "0px"}}>
                        <Context date derivators parents followers style={{fontSize: "20px", lineHeight: "56px", paddingLeft: "1em"}} model={this.props.model}/>
                    </ListItem>
                    <ListDivider style={{width: "100%"}}/>
                    <ListItem disabled>
                        {this.props.children}
                    </ListItem>
                </List>
            </Paper>
        );
    }

}

module.exports = Panel;