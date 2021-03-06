"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const Router = require("react-router").Router;
const Route = require("react-router").Route;
const IndexRoute = require("react-router").IndexRoute;
const injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const History = require("./inc/History");
const App = require("./components/App");

const Inbox = require("./routes/Inbox");
const Browse = require("./routes/Browse");
const Search = require("./routes/Search");
const Model = require("./routes/Model");
const Form = require("./routes/Form");

const User = require("../models/User/Model");

window.Me = window.Me && User.decode(window.Me);

ReactDOM.render((
    <Router history={History}>
        <Route path="/" component={App}>
            <IndexRoute component={Inbox}/>
            <Route path="browse" component={Browse}/>
            <Route path="inbox/:page" component={Inbox}/>
            <Route path="search/:query/:sort" component={Search}/>
            <Route path="search/:query" component={Search}/>
            <Route path=":class/:id/add/:add" component={Form}/>
            <Route path=":class/:id/edit" component={Form}/>
            <Route path=":class/:id" component={Model}/>
        </Route>
    </Router>
  ), document.getElementById("app"));