const React = require("react");

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const ToolbarTitle = require("material-ui/lib/toolbar/toolbar-title");

const ModelProperty = require("../components/ModelProperty");
const Search = require("../components/Search");
const Spinner = require ("../components/Spinner");
const Context = require("../components/Context");
const Menu = require("../components/Menu");

const Loader = require("./Loader");

module.exports = {
    mixins: [ Loader ],

    defaultRender: function() {
        return (
            <div>
                <ModelProperty label="Created At" value={this.state.model.createdAt} />
                <ModelProperty label="Updated At" value={this.state.model.updatedAt} />
                <pre>{JSON.stringify(this.state.model.data)}</pre>
            </div>
        );
    },

    render: function() {
        if (this.state.model === false) {
            return (
                <Spinner/>
            );
        } else {
            return (
                <div style={{marginTop: "1em"}}>
                    <Paper>
                        <List style={{paddingTop: "0px"}}>
                            <ListItem disabled style={{padding: "0px"}} rightIconButton={<Menu/>}>
                                <Toolbar><ToolbarGroup>
                                    <ToolbarTitle text={this.state.model.ref + " — " + this.state.model.title}/>
                                </ToolbarGroup></Toolbar>
                            </ListItem>
                            <ListItem disabled style={{padding: "0px"}}>
                                <Context date derivators parents followers style={{fontSize: "20px", lineHeight: "56px", paddingLeft: "1em"}} model={this.state.model}/>
                            </ListItem>
                            <ListDivider style={{width: "100%"}}/>
                            <ListItem disabled>
                                {this.modelRender ? this.modelRender() : this.defaultRender()}
                            </ListItem>
                        </List>
                    </Paper>

                    <Search date toolbar query={"childrenOf:" + this.state.model.ref} sort="createdAt:desc" model={this.state.model}/>
                </div>
            );
        }
    }
};