"use strict";

const React = require("react");
const TextField = require("material-ui/lib/text-field");

const Pure = require("../../ui/inc/Pure");
const Form = require("../../ui/inc/Form");
const Directory = require("../../inc/Directory");
const Wiki = Directory.model("Wiki");
const Theme = require("../../ui/inc/Theme");

class WikiForm extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        return new Wiki({
            title: this.refs.title.getValue(),
            content: this.refs.content.getValue()
        });
    }

    render() {
        return (
            <Form parent={this.props.model} title="Add a Wiki page" onSubmit={this.onSubmit}>
                <TextField ref="title" floatingLabelText="Title" hintText="A title..." style={Theme.form.TextField}/>
                <TextField ref="content" multiLine hintText="The content..." style={Theme.form.TextField}/>
            </Form>
        );
    }

}

module.exports = WikiForm;