"use strict";

const React = require("react");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const FontIcon = require("material-ui/lib/font-icon");

const History = require("../inc/History");
const Pure = require("../inc/Pure");

const Login = require ("./Login");
const Nav = require ("./Nav");

require("flexboxgrid/css/flexboxgrid.css");
require("../../public/stylesheets/style.css");

class App extends Pure {

    goInbox() {
        History.pushState(undefined, "/", undefined);
    }

    goFollowing() {
        History.pushState(undefined, "/inbox/following", undefined);
    }

    goDerivates() {
        History.pushState(undefined, "/inbox/derivates", undefined);
    }

    goPinned() {
        History.pushState(undefined, "/inbox/pinned", undefined);
    }

    goSnoozed() {
        History.pushState(undefined, "/inbox/snoozed", undefined);
    }

    goBrowse() {
        History.pushState(undefined, "/browse", undefined);
    }

    goMyAccount() {
        History.pushState(undefined, "/me", undefined);
    }

    goLogout() {
        window.location.href = "/logout";
    }

    render() {
        if (!window.Me) {
            return (
                <Login/>
            );
        } else {
            return (
                <div>
                    <Nav query={this.props.params.query}/>
                    <div className="row">
                        <div className="col-xs-12 last-xs col-sm-3 col-md-2 col-lg-2">
                            <List style={{marginTop: "1em", backgroundColor: "transparent"}}>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Inbox" leftIcon={<FontIcon className="material-icons">inbox</FontIcon>} onTouchTap={this.goInbox}/>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Following" leftIcon={<FontIcon className="material-icons">remove_red_eye</FontIcon>} onTouchTap={this.goFollowing}/>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Derivates" leftIcon={<FontIcon className="material-icons">flight_takeoff</FontIcon>} onTouchTap={this.goDerivates}/>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Pinned" leftIcon={<FontIcon className="material-icons">pin_drop</FontIcon>} onTouchTap={this.goPinned}/>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Snoozed" leftIcon={<FontIcon className="material-icons">access_time</FontIcon>} onTouchTap={this.goSnoozed}/>
                                <ListDivider />
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Browse" leftIcon={<FontIcon className="material-icons">folder</FontIcon>} onTouchTap={this.goBrowse}/>
                                <ListDivider />
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="My account" leftIcon={<FontIcon className="material-icons">face</FontIcon>} onTouchTap={this.goMyAccount}/>
                                <ListItem innerDivStyle={{paddingLeft: "56px"}} primaryText="Logout" leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>} onTouchTap={this.goLogout}/>

                            </List>
                        </div>
                        <div className="col-xs-12 last-sm col-sm-9 col-md-10 col-lg-10" style={{padding: "1em 2em"}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

module.exports = App;