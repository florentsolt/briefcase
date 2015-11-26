"use strict";

const React = require("react");

const Paper = require("material-ui/lib/paper");
const TextField = require("material-ui/lib/text-field");
const FontIcon = require("material-ui/lib/font-icon");
const RaisedButton = require("material-ui/lib/raised-button");

const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");

class Login extends Pure {

    constructor() {
        super();
        this.onEnterKeyDown = this.onEnterKeyDown.bind(this);
    }

    onEnterKeyDown() {
        this.refs.form.submit();
    }

    render() {
        return (
                <Paper style={Theme.login.container}>
                    <div style={Theme.login.header}>
                        <FontIcon className="material-icons" style={Theme.login.logo}>work</FontIcon>
                        Brieƒcαse
                    </div>
                    <form ref="form" method="post" action="/login">
                        <TextField hintText="Username" name="username" style={Theme.form.TextField} onEnterKeyDown={this.onEnterKeyDown}/>
                        <TextField hintText="Password" name="password" style={Theme.form.TextField} type="password" onEnterKeyDown={this.onEnterKeyDown}/>
                    </form>

                    <div style={Theme.login.footer}>
                        <RaisedButton label="Login" primary onTouchTap={this.onEnterKeyDown}/>
                    </div>
                </Paper>
        );
    }
}

module.exports = Login;