const Storage = require("../Storage");

module.exports = {

    getInitialState: function() {
        return {
            model: false
        };
    },

    componentDidMount: function() {
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        Storage.get(nextProps.model).then((model) => {
            this.setState({
                model: model
            });
        });
    }

};