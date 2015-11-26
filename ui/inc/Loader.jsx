"use strict";

const React = require("react");
const Pure = require("./Pure");
const Storage = require("../Storage");

class Loader extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            model: false
        };
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.model === "string") {
            Storage.get(nextProps.model).then((model) => {
                this.setState({
                    model: model
                });
            });
        }
    }

    render() {
        let Component = this.props.ui;

        if (!this.props.ui) {
            return false;
        } else if (this.state.model === false) {
            // Spinner ?
            return false;
        } else {
            return (
                <div style={this.props.style}>
                    <Component model={this.state.model} />
                </div>
            );
        }
    }
}

module.exports = Loader;