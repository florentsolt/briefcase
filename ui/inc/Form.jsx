"use strict";

const React = require("react");
const Paper = require("material-ui/lib/paper");
const ListItem = require("material-ui/lib/lists/list-item");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const ToolbarTitle = require("material-ui/lib/toolbar/toolbar-title");
const Button = require("material-ui/lib/flat-button");
const FontIcon = require("material-ui/lib/font-icon");

const Pure = require("../../ui/inc/Pure");
const Storage = require("../../ui/Storage");
const History = require("./History");
const Ref = require("../../ui/components/Ref");

class Form extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onSubmit() {
        if (this.props.onSubmit) {
            Storage.add(this.props.onSubmit());
        }
    }

    onBack() {
        History.goBack();
    }

    render() {
        let style = {
            height: "100%",
            display: "inline-block",
            verticalAlign: "bottom",
            fontSize: "inherit",
            lineHeight: "inherit",
            color: "inherit",
            opacity: 0.4,
            marginRight: "0.4em"
        };

        return (
            <Paper style={{marginTop: "1em"}}>
                <ListItem disabled style={{padding: "0px"}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text={this.props.title}/>
                        </ToolbarGroup>
                    </Toolbar>
                </ListItem>
                <ListItem disabled style={{padding: "0px"}}>
                    <div style={{fontSize: "20px", lineHeight: "56px", paddingLeft: "24px"}}>
                        <FontIcon className="material-icons" style={style}>inbox</FontIcon>
                        <FontIcon className="material-icons" style={style}>chevron_right</FontIcon>
                        <Ref model={this.props.parent}/>
                    </div>
                </ListItem>
                <div style={{padding: "1em"}}>
                    {this.props.children}
                    <div style={{textAlign: "right", marginTop: "1em"}}>
                        <Button label="Back" secondary onTouchTap={this.onBack}/>
                        <Button label="Submit" primary onTouchTap={this.onSubmit}/>
                    </div>
                </div>

            </Paper>
        );
    }

}

module.exports = Form;