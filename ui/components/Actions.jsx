"use strict";

const React = require("react");
const FontIcon = require("material-ui/lib/font-icon");
const IconButton = require("material-ui/lib/icon-button");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Item = require("material-ui/lib/menus/menu-item");
const Dialog = require("material-ui/lib/dialog");

const Pure = require("../inc/Pure");

class Menu extends Pure {

    constructor() {
        super();
        this.onItemTouchTap = this.onItemTouchTap.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirmDelete = this.onConfirmDelete.bind(this);
        this.state = {
            action: false
        };
    }

    onItemTouchTap(event, item) {
        this.setState({action: item.props.value});
    }

    onCancel() {
        this.setState({action: false});
    }

    onConfirmDelete() {
        this.props.parent.deleteModel(this.props.model);
    }

    deleteDialog() {
        if (this.state.action === "delete") {
            let standardActions = [
              { text: "Cancel", onTouchTap: this.onCancel },
              { text: "Delete", onTouchTap: this.onConfirmDelete, ref: "submit" }
            ];
            return (
                <Dialog open title={"Delete " + this.props.model.ref}
                    actions={standardActions}
                    actionFocus="submit"
                    onRequestClose={this.onCancel}>
                    {"Do you confirm the deletion ?"}
            </Dialog>);
        }
        return false;
    }

    render() {
        let icon = <IconButton tooltip="Actions" tooltipPosition="bottom-center" iconClassName="material-icons">more_vert</IconButton>;
        return(
            <div {...this.props}>
                <IconMenu iconButtonElement={icon} onItemTouchTap={this.onItemTouchTap}>
                    <Item primaryText="Edit" value="edit" leftIcon={<FontIcon className="material-icons">edit</FontIcon>}/>
                    <Item primaryText="Delete" value="delete" leftIcon={<FontIcon className="material-icons">delete</FontIcon>}/>
                    <Item primaryText="Derive" value="derive" leftIcon={<FontIcon className="material-icons">flight_takeoff</FontIcon>}/>
                    <Item primaryText="Follow" value="follow" leftIcon={<FontIcon className="material-icons">remove_red_eye</FontIcon>}/>
                </IconMenu>
                {this.deleteDialog()}
            </div>
        );
    }
}

module.exports = Menu;