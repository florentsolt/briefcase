"use strict";

const React = require("react");

const IconButton = require("material-ui/lib/icon-button");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Item = require("material-ui/lib/menus/menu-item");

const Pure = require("../inc/Pure");
const History = require("../inc/History");

class Add extends Pure {

    constructor() {
        super();
        this.onItemTouchTap = this.onItemTouchTap.bind(this);
    }

    onItemTouchTap(event, item) {
        History.pushState(undefined, `/${this.props.model.constructor.name}/${this.props.model.id}/add/${item.props.primaryText}`, undefined);
    }

    render() {
        let icon = <IconButton iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Add">add</IconButton>;

        return(
          <IconMenu style={this.props.style} openDirection="bottom-left" iconButtonElement={icon} onItemTouchTap={this.onItemTouchTap}>
              <Item primaryText="Issue"/>
              <Item primaryText="Comment" />
              <Item primaryText="Picture" />
              <Item primaryText="Idea" />
              <Item primaryText="Question" />
          </IconMenu>
          );
    }
}

module.exports = Add;