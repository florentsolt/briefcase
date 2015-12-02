"use strict";

const React = require("react");

const IconButton = require("material-ui/lib/icon-button");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Item = require("material-ui/lib/menus/menu-item");
const FontIcon = require("material-ui/lib/font-icon");

const Pure = require("../inc/Pure");

class Views extends Pure {

    constructor() {
        super();
        this.state = {
            selected: 1
        };
        this.views = [
            {key: 0, primaryText: "Headline", leftIcon: <FontIcon className="material-icons">view_headline</FontIcon>},
            {key: 1, primaryText: "List", leftIcon: <FontIcon className="material-icons">view_list</FontIcon>},
            {key: 2, primaryText: "Column", leftIcon: <FontIcon className="material-icons">view_column</FontIcon>}
        ];
        this.onItemTouchTap = this.onItemTouchTap.bind(this);
    }

    onItemTouchTap(event, item) {
        this.setState({
            selected: parseInt(item.key, 10)
        });
        if (typeof this.props.onViewChange === "function") this.props.onViewChange(item.props.primaryText);
    }

    render() {
        let icon = (<IconButton tooltipPosition="bottom-center" tooltip="View">
                {this.views[this.state.selected].leftIcon}
            </IconButton>);

        let items = this.views.map((view) => {
            return <Item {...view}/>;
        });

        return(
          <IconMenu style={this.props.style} openDirection="bottom-left" iconButtonElement={icon} onItemTouchTap={this.onItemTouchTap}>
            {items}
          </IconMenu>
        );
    }
}

module.exports = Views;