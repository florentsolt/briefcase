"use strict";

const React = require("react");
const CircularProgress = require("material-ui/lib/circular-progress");

const Pure = require("../inc/Pure");

class Spinner extends Pure {

    render() {
        return(
            <center><CircularProgress mode="indeterminate" /></center>
        );
    }
}

module.exports = Spinner;