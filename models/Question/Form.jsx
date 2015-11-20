"use strict";

const React = require("react");
const TextField = require("material-ui/lib/text-field");

const Pure = require("../../ui/inc/Pure");
const Form = require("../../ui/inc/Form");
const Directory = require("../../inc/Directory");
const Question = Directory.model("Question");

class QuestionForm extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        return new Question({
            text: this.refs.text.getValue()
        });
    }

    render() {
        return (
            <Form parent={this.props.model} title="Add an Idea" onSubmit={this.onSubmit}>
                <TextField ref="text" multiLine hintText="What if..." style={{width: "100%"}}/>
            </Form>
        );
    }

}

module.exports = QuestionForm;