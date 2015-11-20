"use strict";

const React = require("react");
const TextField = require("material-ui/lib/text-field");
const SelectField = require("material-ui/lib/select-field");

const Pure = require("../../ui/inc/Pure");
const Form = require("../../ui/inc/Form");
const Directory = require("../../inc/Directory");
const Issue = Directory.model("Issue");

class IssueForm extends Pure {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setPriority = this.setPriority.bind(this);
        this.state = {
            priority: "#3",
            status: "Open"
        };

        this.statuses = [ "Open", "Code", "QA Failed", "Review Failed", "Review", "QA on hold",
            "Merge to QA", "QA", "Production on hold", "Merge to Production",
            "Push to Pre-Production", "Pre-Production", "Push to Production",
            "Production", "Rejected" ].map(this.mapper);

        this.priorities = ["Urgent", "#1", "#2", "#3", "#4"].map(this.mapper);
    }

    onSubmit() {
        return new Issue({
            subject: this.refs.subject.getValue(),
            description: this.refs.description.getValue(),
            priority: this.state.priority,
            status: this.state.status
        });
    }

    mapper(item) {
        return {
            payload: item
        };
    }

    setStatus(e, i, item) {
        this.setState({
            status: item.payload
        });
    }

    setPriority(e, i, item) {
        this.setState({
            priority: item.payload
        });
    }

    render() {
        return (
            <Form parent={this.props.model} title="Add an Issue" onSubmit={this.onSubmit}>
                <TextField ref="subject" floatingLabelText="Subject" hintText="A subject..." style={{width: "100%"}}/>
                <SelectField value={this.state.status} floatingLabelText="Status" hintText="Pick one" menuItems={this.statuses} displayMember="payload" onChange={this.setStatus}/>
                <SelectField value={this.state.priority} floatingLabelText="Priority" menuItems={this.priorities}  displayMember="payload" onChange={this.setPriority}/>
                <TextField ref="description" floatingLabelText="Description" multiLine hintText="A description..." style={{width: "100%"}}/>
            </Form>
        );
    }

}

module.exports = IssueForm;