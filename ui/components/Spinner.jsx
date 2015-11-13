const React = require("react");
const CircularProgress = require("material-ui/lib/circular-progress");

module.exports = React.createClass({
    displayName: "Spinner",

    render: function() {
        return(
            <center><CircularProgress mode="indeterminate" /></center>
        );
    }
});