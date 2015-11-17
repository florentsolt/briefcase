"use strict";

const React = require("react");
const Pure = require("../../ui/inc/Pure");

class MailInine extends Pure {

    render() {
        return (<div>
            <span>
                {this.props.model.at("/from")} to {this.props.model.at("/to")}
            </span>
            <br/>
            {this.props.model.title}
        </div>);
    }

}

module.exports = MailInine;