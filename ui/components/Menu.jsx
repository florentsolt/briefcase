"use strict";

const React = require("react");
const FontIcon = require("material-ui/lib/font-icon");
const IconButton = require("material-ui/lib/icon-button");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const MenuItem = require("material-ui/lib/menus/menu-item");

const Pure = require("../inc/Pure");

class Menu extends Pure {
    render() {
        let icon = <IconButton><FontIcon className="material-icons">more_vert</FontIcon></IconButton>;
        return(
            <IconMenu {...this.props} iconButtonElement={icon}>
                <MenuItem primaryText="Edit" leftIcon={<FontIcon className="material-icons">edit</FontIcon>}/>
                <MenuItem primaryText="Delete" leftIcon={<FontIcon className="material-icons">delete</FontIcon>}/>
                <MenuItem primaryText="Derive" leftIcon={<FontIcon className="material-icons">flight_takeoff</FontIcon>}/>
                <MenuItem primaryText="Follow" leftIcon={<FontIcon className="material-icons">remove_red_eye</FontIcon>}/>
            </IconMenu>
        );
    }
}

module.exports = Menu;