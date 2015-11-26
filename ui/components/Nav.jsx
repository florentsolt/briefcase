"use strict";

const React = require("react");

const AppBar = require("material-ui/lib/app-bar");
const FontIcon = require("material-ui/lib/font-icon");

const History = require("../inc/History");
const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");
const Query = require("./Query");

class Nav extends Pure {

    constructor() {
        super();
        this.onRequest = this.onRequest.bind(this);
    }

    onRequest(query) {
        History.pushState(undefined, `/search/${encodeURIComponent(query)}`, undefined);
    }

    render() {
        return (
            <div>
                <AppBar style={Theme.nav.bar} title="Brieƒcαse" iconElementLeft={<FontIcon className="material-icons" style={Theme.nav.logo}>work</FontIcon>}>
                    <Query style={Theme.nav.AutoComplete} value={this.props.query} onRequest={this.onRequest}/>
                </AppBar>
          </div>
      );
    }
}

module.exports = Nav;