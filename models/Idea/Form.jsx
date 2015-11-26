"use strict";

const React = require("react");
const TextField = require("material-ui/lib/text-field");

const Pure = require("../../ui/inc/Pure");
const Form = require("../../ui/inc/Form");
const Directory = require("../../inc/Directory");
const Idea = Directory.model("Idea");
const Theme = require("../../ui/inc/Theme");

class IdeaForm extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        return new Idea({
            text: this.refs.text.getValue()
        });
    }

    render() {
        return (
            <Form parent={this.props.model} title="Add an Idea" onSubmit={this.onSubmit}>
                <TextField ref="text" multiLine hintText="The idea..." style={Theme.form.TextField}/>
            </Form>
        );
    }

}

module.exports = IdeaForm;