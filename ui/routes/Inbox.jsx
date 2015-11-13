const React = require("react");
const Search = require("../components/Search");

module.exports = React.createClass({
    displayName: "InboxRoute",

    getInitialState: function() {
        return {
            page: this.props.params.page || "inbox"
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            page: nextProps.params.page
        });
    },

    query: function() {
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
    },

    render: function() {
        return (
            <div>
                <Search inbox derivators parents query={this.query()} sort="createdAt:desc"/>
            </div>
        );
    }
});