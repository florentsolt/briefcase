"use strict";

const React = require("react");
const shallowCompare = require("react/lib/shallowCompare");

class Pure extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return false;
    }
}

module.exports = Pure;