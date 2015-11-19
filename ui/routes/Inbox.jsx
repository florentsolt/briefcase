"use strict";

const React = require("react");
const Search = require("../components/Search");
const Pure = require("../inc/Pure");

class InboxRoute extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            page: props.params.page || "inbox"
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.params.page
        });
    }

    query() {
        switch (this.state.page) {
        case "following":
            return "followeesOf:" + window.Me.ref;
        case "derivates":
            return "deriveFrom:" + window.Me.ref;
        case "pinned":
            return "pinnedBy:" + window.Me.ref;
        case "snoozed":
            return "snoozedBy:" + window.Me.ref;
        default:
            return "childrenOf:" + window.Me.ref;
        }
    }

    render() {
        return (
            <div>
                <Search toolbar chart inbox derivators parents query={this.query()} sort="createdAt:desc" model={window.Me}/>
            </div>
        );
    }
}

module.exports = InboxRoute;