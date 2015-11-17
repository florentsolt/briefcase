const React = require("react");

const AppBar = require("material-ui/lib/app-bar");
const TextField = require("material-ui/lib/text-field");
const FontIcon = require("material-ui/lib/font-icon");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const IconButton = require("material-ui/lib/icon-button");
const Typography = require("material-ui/lib/styles/typography");
const Item = require("material-ui/lib/menus/menu-item");

const History = require("../inc/History");
const Pure = require("../inc/Pure");

class Nav extends Pure {

    onEnterKeyDown() {
        History.pushState(undefined, `/search/${encodeURIComponent(this.refs.query.getValue().trim())}`, undefined);
    }

    render() {
        let iconButtonElement = <IconButton iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Preset">search</IconButton>;

        let style = {
            height: "100%",
            display: "inline-block",
            verticalAlign: "middle",
            paddingLeft: "12px",
            lineHeight: "46px",
            color: Typography.textFullWhite
        };

        return (
            <div>
                <AppBar title="Brieƒcαse" iconElementLeft={<FontIcon className="material-icons" style={style}>work</FontIcon>}>
                    <div style={{marginTop: "8px"}}>
                        <IconMenu style={{verticalAlign: "middle"}} iconButtonElement={iconButtonElement}>
                            <Item primaryText="All projects" />
                            <Item primaryText="Issues for team xxx" />
                            <Item primaryText="Urgent issues" />
                        </IconMenu>
                        <TextField defaultValue={this.props.query} ref="query" hintText="Search" onEnterKeyDown={this.onEnterKeyDown}/>
                    </div>
                </AppBar>
          </div>
      );
    }
}

module.exports = Nav;