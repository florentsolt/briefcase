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

        let items = this.props.model.constructor.allowedChildren.map((klass) => {
            return <Item key={klass} primaryText={klass}/>;
        });

        if (items.length === 0) return false;

        return(
          <IconMenu style={this.props.style} openDirection="bottom-left" iconButtonElement={icon} onItemTouchTap={this.onItemTouchTap}>
            {items}
          </IconMenu>
        );
    }
}

module.exports = Add;