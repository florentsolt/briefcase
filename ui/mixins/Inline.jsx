const Loader = require("./Loader");

module.exports = {
    mixins: [ Loader ],

    render: function() {
        if (this.state.model === false) {
            return false;
        } else {
            return this.modelRender && this.modelRender();
        }
    }
};