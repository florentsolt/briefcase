const React = require("react");
const Pure = require("react-addons-pure-render-mixin");

const Paper = require("material-ui/lib/paper");
const TextField = require("material-ui/lib/text-field");
const FontIcon = require("material-ui/lib/font-icon");


var Login = React.createClass({
    displayName: "Login",
    mixins: [ Pure ],

    onEnterKeyDown: function() {
        this.refs.form.submit();
    },

    render: function() {
        let style = {
            height: "100%",
            display: "inline-block",
            verticalAlign: "middle",
            float: "left",
            paddingRight: "6px",
            lineHeight: "32px"
        };

        return (
                <Paper style={{margin:"10em auto", padding:"3em", width: "450px"}}>
                    <div style={{fontSize: "22px", lineHeight: "36px", marginBottom:"1em"}}>
                        <FontIcon className="material-icons" style={style}>work</FontIcon>
                        Brieƒcαse
                    </div>
                    <form ref="form" method="post" action="/login">
                        <TextField hintText="Username" name="username" style={{width: "100%"}} onEnterKeyDown={this.onEnterKeyDown}/>
                        <TextField hintText="Password" name="password" style={{width: "100%"}} type="password" onEnterKeyDown={this.onEnterKeyDown}/>
                    </form>
                </Paper>
        );
    }
});

module.exports = Login;