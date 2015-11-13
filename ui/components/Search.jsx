const React = require("react");
const History = require("react-router").History;

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const FontIcon = require("material-ui/lib/font-icon");
const Item = require("material-ui/lib/menus/menu-item");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const IconButton = require("material-ui/lib/icon-button");
const TextField = require("material-ui/lib/text-field");
const DropDownMenu = require("material-ui/lib/drop-down-menu");

const Chart = require("./Chart");
const Waypoint = require("react-waypoint");

const Storage = require("../Storage");
const Directory = require("../../inc/Directory");

const Spinner = require ("./Spinner");
const Context = require("./Context");
const Menu = require("./Menu");

module.exports = React.createClass({
    displayName: "Search",
    mixins: [ History ],

    getInitialState: function() {
        return {
            models: false,
            expand: false,
            loading: false,
            endReached: false,
            filter: false,
            aggregation: false
        };
    },

    componentDidMount: function() {
        this.componentWillReceiveProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.query !== this.state.query) {
            this.setState({
                query: nextProps.query,
                sort: nextProps.sort || "createdAt:desc",
                offset: -(nextProps.size || 25),
                size: nextProps.size || 25,
                models: false,
                aggregation: false
            });
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextState.loading === true) {
            return false;
        } else {
            return true;
        }
    },

    requestSearch: function(query, sort, filter, offset, size) {
        var filteredQuery = filter ? `(${query}) AND (${filter})` : query;
        // if (offset === 0) this.setState({models: false});

        Storage.search(filteredQuery, sort, offset, size).then((response) => {
            this.setState({
                loading: false,
                models: (this.state.models || []).concat(response.models),
                aggregation: response.aggregation || this.state.aggregation,
                total: response.total,
                offset: response.offset,
                size: response.size,
                query: query,
                sort: sort,
                filter: filter,
                endReached: response.total < size
            });
        });
    },

    loadOneMorePage: function() {
        if (!this.state.endReached) {
            this.setState({loading: true});
            this.requestSearch(this.state.query, this.state.sort, this.state.filter, this.state.offset + this.state.size, this.state.size);
        }
    },

    onFilter: function(event) {
        event.preventDefault();
        this.requestSearch(this.state.query, this.state.sort, this.refs.filter.getValue().trim(), 0, this.state.size);
    },

    toolbar: function() {
        if (this.props.toolbar) {
            let iconButtonElement = <IconButton style={{verticalAlign: "middle"}} iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Preset">filter_list</IconButton>;
            let menuItems = [
               { payload: "1", text: "Issue" },
               { payload: "2", text: "Comment" },
               { payload: "3", text: "Picture" },
               { payload: "4", text: "Idea" },
               { payload: "5", text: "Question" }
            ];

            return (
                <Toolbar>
                    <ToolbarGroup key={0} float="left">
                        <IconMenu openDirection="bottom-right" iconButtonElement={iconButtonElement}>
                            <Item primaryText="All projects" />
                            <Item primaryText="Issues for team xxx" />
                            <Item primaryText="Urgent issues" />
                        </IconMenu>
                        <TextField ref="filter" onEnterKeyDown={this.onFilter} hintText="Filter" style={{}}/>
                    </ToolbarGroup>
                    <ToolbarGroup key={1} float="right">
                        <FontIcon className="material-icons">add</FontIcon>
                        <DropDownMenu menuItems={menuItems}/>
                    </ToolbarGroup>
                </Toolbar>
            );
        } else {
            return false;
        }
    },

    chart: function() {
        if (this.props.chart && this.state.aggregation) {
            return <Chart data={this.state.aggregation}/>;
        } else {
            return false;
        }
    },

    onRowClick: function(model) {
        if (this.props.expand) {
            if (this.state.expand === model.ref) {
                this.setState({expand: false});
            } else {
                this.setState({expand: model.ref});
            }
        } else {
            this.history.pushState(undefined, `/${model.constructor.name}/${model.id}`, undefined);
        }
    },

    expand: function(model) {
        let Self = this.constructor;

        if (this.props.expand && this.state.expand === model.ref) {
            return (
                <ListItem disabled key={"expand-" + model.ref} style={{marginLeft: "3em"}}>
                    <Self expand date query={"childrenOf:" + model.ref} sort={this.props.sort}/>
                </ListItem>
            );
        } else {
            return false;
        }

    },

    render: function() {
        if (this.state.models ===  false) {
            return (
                <div>
                    <Spinner/>
                    {this.state.query && <Waypoint onEnter={this.loadOneMorePage}/>}
                </div>
            );
        } else {
            let rows = [];

            this.state.models.forEach((item) => {
                var Icon = Directory.icon(item.constructor.name);
                var Inline = Directory.inline(item.constructor.name);
                var Panel = Directory.panel(item.constructor.name);

                rows.push(
                    <ListItem key={item.ref}
                        disabled={Panel ? false : true}
                        onTouchTap={this.onRowClick.bind(this, item)}
                        rightIconButton={<Menu/>}
                        leftIcon={Icon && <Icon model={item}/>}
                        primaryText={<Inline model={item}/>}
                        secondaryText={<Context followers={this.props.followers} derivators={this.props.derivators} parents={this.props.parents} date={this.props.date} model={item}/>}æ/>
                );
                rows.push(this.expand(item));
            });

            if (rows.length === 0) {
                rows.push(<ListItem disabled key="nothing"><center><em>None</em></center></ListItem>);
            }

            if (this.props.inbox) {
                return (
                    <div>
                        {this.toolbar()}
                        {this.chart()}

                        <h4>Today</h4>
                        <Paper>
                            <List style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                {rows.slice(0, 5)}
                            </List>
                        </Paper>

                        <h4>This week</h4>
                        <Paper>
                            <List style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                {rows.slice(5, 10)}
                            </List>
                        </Paper>

                        <h4>This month</h4>
                        <Paper>
                            <List style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                {rows.slice(10, -1)}
                            </List>
                        </Paper>
                        {!this.state.loading ? <Waypoint onEnter={this.loadOneMorePage}/> : false}
                    </div>
                );
            } else {
                return (
                    <Paper style={{marginTop: "1em"}}>
                        {this.toolbar()}
                        {this.chart()}
                        <List style={{paddingTop: "0px", paddingBottom: "0px"}}>
                            {rows}
                        </List>
                        {!this.state.loading ? <Waypoint onEnter={this.loadOneMorePage}/> : false}
                    </Paper>
                );
            }
        }
    }
});