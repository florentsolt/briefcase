"use strict";

const React = require("react");

const Pure = require("../inc/Pure");
const AutoComplete = require("material-ui/lib/auto-complete");

class Query extends Pure {

    constructor() {
        super();
        this.onNewRequest = this.onNewRequest.bind(this);
        this.presets = {
            "type:Project": "All Projects",
            "type:Issue childrenOf:Team#xxx": "Issue of team xxx",
            "type:Issue status:urgent": "Urgent issues"
        };
    }

    onNewRequest(text, query) {
        if (typeof this.props.onRequest === "function") {
            this.props.onRequest((query || text).trim());
        }
    }

    render() {
        return(
            <AutoComplete style={this.props.style} showAllItems dataSource={this.presets} searchText={this.props.value} hintText={this.props.hintText || "Search"} onNewRequest={this.onNewRequest}/>
        );
    }
}

module.exports = Query;