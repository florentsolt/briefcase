"use strict";

const React = require("react");
const Promise = require("bluebird");

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const Item = require("material-ui/lib/menus/menu-item");
const IconMenu = require("material-ui/lib/menus/icon-menu");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const IconButton = require("material-ui/lib/icon-button");
const TextField = require("material-ui/lib/text-field");

const History = require("../inc/History");
const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");

const Loader = require("../inc/Loader");
const Chart = require("./Chart");
const Waypoint = require("react-waypoint");

const Storage = require("../Storage");
const Directory = require("../../inc/Directory");

const Spinner = require ("./Spinner");
const Context = require("./Context");
const Actions = require("./Actions");
const Add = require("./Add");
const Query = require("./Query");

class Search extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            models: false,
            expand: false,
            loading: false,
            endReached: false,
            filter: false,
            aggregation: false,

            query: this.props.query,
            sort: this.props.sort || "createdAt:desc",
            offset: -(this.props.size || 25),
            size: this.props.size || 25
        };

        this.loadOneMorePage = this.loadOneMorePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.query !== this.state.query) {
            this.setState({
                query: nextProps.query,
                sort: nextProps.sort || "createdAt:desc",
                offset: -(nextProps.size || 25),
                size: nextProps.size || 25,

                models: false,
                aggregation: false,
                endReached: false
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (super.shouldComponentUpdate() === true) {
            if (nextState.loading === true) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    requestSearch(query, sort, filter, offset, size) {
        var filteredQuery = filter ? `(${query}) AND (${filter})` : query;
        // if (offset === 0) this.setState({models: false});

        Storage.search(filteredQuery, sort, offset, size).then((response) => {

            // Resolve refs into models
            return Promise.map(response.refs, (ref) => Storage.get(ref))
                .then((models) => response.models = models)
                .then(() => response);

        }).then((response) => {
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
    }

    loadOneMorePage() {
        if (!this.state.endReached) {
            this.setState({loading: true});
            this.requestSearch(this.state.query, this.state.sort, this.state.filter, this.state.offset + this.state.size, this.state.size);
        }
    }

    onFilter(event) {
        event.preventDefault();
        this.requestSearch(this.state.query, this.state.sort, this.refs.filter.getValue().trim(), 0, this.state.size);
    }

    toolbar() {
        if (this.props.toolbar) {
            return (
                <ListItem disabled style={Theme.search.filter} rightIconButton={<Add model={this.props.model}/>}>
                    <Toolbar>
                        <Query hintText="Filter"/>
                    </Toolbar>
                </ListItem>
            );
        } else {
            return false;
        }
    }

    chart() {
        if (this.props.chart && this.state.aggregation) {
            return <Chart data={this.state.aggregation}/>;
        } else {
            return false;
        }
    }

    onRowClick() {
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#lists-of-items
        // parent & model are passsed as props
        if (this.parent.props.expand) {
            if (this.parent.state.expand === this.model.ref) {
                this.parent.setState({expand: false});
            } else {
                this.parent.setState({expand: this.model.ref});
            }
        } else {
            History.pushState(undefined, `/${this.model.constructor.name}/${this.model.id}`, undefined);
        }
    }

    expand(model) {
        let Self = this.constructor;

        if (this.props.expand && this.state.expand === model.ref) {
            return (
                <ListItem disabled key={"expand-" + model.ref} style={Theme.search.expand}>
                    <Self expand date query={"childrenOf:" + model.ref} sort={this.props.sort}/>
                </ListItem>
            );
        } else {
            return false;
        }

    }

    render() {
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
                if (rows.length > 0) rows.push(<ListDivider key={"divider" + item.ref}/>);

                rows.push(
                    <ListItem key={item.ref}
                        disabled={Directory.hasPanel(item.constructor.name)}
                        onTouchTap={this.onRowClick}
                        model={item}
                        parent={this}
                        rightIconButton={<Actions model={item}/>}
                        leftIcon={<Loader style={Theme.search.item.leftIcon} ui={Directory.icon(item.constructor.name)} model={item.ref}/>}>

                        {<Loader style={Theme.search.item.inline} ui={Directory.inline(item.constructor.name)} model={item.ref}/>}
                        {<Context style={Theme.search.item.context} followers={this.props.followers} derivators={this.props.derivators} parents={this.props.parents} date={this.props.date} model={item}/>}
                    </ListItem>
                );
                rows.push(this.expand(item));
            });

            if (rows.length === 0) {
                rows.push(<ListItem disabled key="nothing"><center><em>None</em></center></ListItem>);
            }

            if (this.props.inbox) {
                return (
                    <div>
                        <Paper style={Theme.search.toolbar}>
                            {this.toolbar()}
                        </Paper>

                        <Paper>
                            {this.chart()}
                        </Paper>

                        <h4>Today</h4>
                        <Paper>
                            <List style={Theme.search.list}>
                                {rows.slice(0, 5)}
                            </List>
                        </Paper>

                        <h4>This week</h4>
                        <Paper>
                            <List style={Theme.search.list}>
                                {rows.slice(5, 10)}
                            </List>
                        </Paper>

                        <h4>This month</h4>
                        <Paper>
                            <List style={Theme.search.list}>
                                {rows.slice(10, -1)}
                            </List>
                        </Paper>
                        {!this.state.loading ? <Waypoint onEnter={this.loadOneMorePage}/> : false}
                    </div>
                );
            } else {
                return (
                    <div>
                        <Paper style={Theme.search.toolbar}>
                            {this.chart()}
                        </Paper>

                        <Paper>
                            <List style={Theme.search.list}>
                                {this.toolbar()}
                                {rows}
                            </List>
                            {!this.state.loading ? <Waypoint onEnter={this.loadOneMorePage}/> : false}
                        </Paper>
                    </div>
                );
            }
        }
    }
}

module.exports = Search;