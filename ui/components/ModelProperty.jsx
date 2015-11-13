const React = require("react");

var ModelProperty = React.createClass({
    displayName: "ModelProperty",

    render: function() {
        return(
            <dl>
                <dt>{this.props.label}</dt>
                <dd>{this.props.value}</dd>
            </dl>
        );
    }
});

module.exports = ModelProperty;