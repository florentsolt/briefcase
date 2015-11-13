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
            if (this.isMounted()) {
                this.setState({
                    model: model
                });
            }
        });
    }

};