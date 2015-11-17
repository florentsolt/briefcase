"use strict";

const React = require("react");

const IconButton = require("material-ui/lib/icon-button");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Item = require("material-ui/lib/menus/menu-item");

const Pure = require("../inc/Pure");

class Add extends Pure {

    render() {
        let icon = <IconButton style={{verticalAlign: "middle"}} iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Add">add</IconButton>;

        return(
          <IconMenu style={this.props.style} openDirection="bottom-left" iconButtonElement={icon}>
              <Item primaryText="Issue" />
              <Item primaryText="Comment" />
              <Item primaryText="Picture" />
              <Item primaryText="Idea" />
              <Item primaryText="Question" />
          </IconMenu>
        );
    }
}

module.exports = Add;