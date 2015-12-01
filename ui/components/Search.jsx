"use strict";

const React = require("react");
const Promise = require("bluebird");

const Paper = require("material-ui/lib/paper");
const List = require("material-ui/lib/lists/list");
const ListItem = require("material-ui/lib/lists/list-item");
const ListDivider = require("material-ui/lib/lists/list-divider");
const Toolbar = require("material-ui/lib/toolbar/toolbar");
const ToolbarGroup = require("material-ui/lib/toolbar/toolbar-group");
const Snackbar = require("material-ui/lib/snackbar");

const History = require("../inc/History");
const Pure = require("../inc/Pure");
const Theme = require("../inc/Theme");

const Loader = require("../inc/Loader");
const Chart = require("./Chart");
const Waypoint = require("react-waypoint");
const Dropzone = require("react-dropzone");

const Storage = require("../Storage");
const Directory = require("../../inc/Directory");

const Spinner = require ("./Spinner");
const Context = require("./Context");
const Actions = require("./Actions");
const Add = require("./Add");
const Views = require("./Views");
const Query = require("./Query");
const IconTooltip = require("./IconTooltip");

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
            size: this.props.size || 25,

            view: this.props.view || "List",

            snack: false
        };

        this.onSnackDismiss = this.onSnackDismiss.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
        this.loadOneMorePage = this.loadOneMorePage.bind(this);
        this.onDrop = this.onDrop.bind(this);
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

    onViewChange(view) {
        this.setState({
            view: view
        });
    }

    toolbar() {
        if (this.props.toolbar) {
            return (
                <ListItem disabled style={Theme.search.filter}>
                    <Toolbar style={{paddingRight: "5px"}}>
                        <ToolbarGroup key={0} float="left">
                            <Query hintText="Filter"/>
                        </ToolbarGroup>
                        <ToolbarGroup key={1} float="right">
                            <Views onViewChange={this.onViewChange}/>
                            <Add model={this.props.model}/>
                        </ToolbarGroup>
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

    // Used in <Actions/>
    deleteModel(model) {
        Storage.delete(model.ref)
            .then(() => this.setState({
                action: false,
                models: this.state.models.filter((stateModel) => model.ref !== stateModel.ref),
                snack: model.ref + " has been deleted"
            }));
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

    onDrop(files) {
        Storage.upload(this.props.model, files).then((models) => {
            this.setState({
                models: Array.concat(models, this.state.models),
                snack: models.map((m) => m.ref).join(", ") + " has been uploaded"
            });
        });
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

    onSnackDismiss() {
        this.setState({snack: false});
    }

    snack() {
        if (this.state.snack) {
            return <Snackbar openOnMount action="dismiss" message={this.state.snack} autoHideDuration={5000} onActionTouchTap={this.onSnackDismiss} onDismiss={this.onSnackDismiss}/>;
        }
        return false;
    }

    renderModel(model) {
        var icon = (<div>
                <IconTooltip tooltip={model.ref}>
                    <Loader ui={Directory.icon(model.constructor.name)} model={model.ref}/>
                </IconTooltip>
            </div>);

        switch(this.state.view) {
        case "Headline":
            return(
                <ListItem key={model.ref}
                    disabled={Directory.hasPanel(model.constructor.name)}
                    onTouchTap={this.onRowClick}
                    model={model}
                    parent={this}
                    rightIconButton={<Actions parent={this} model={model}/>}
                    leftIcon={icon}
                    primaryText={model.title}/>
            );

        case "List":
            return(
                <ListItem key={model.ref}
                    disabled={Directory.hasPanel(model.constructor.name)}
                    onTouchTap={this.onRowClick}
                    model={model}
                    parent={this}
                    rightIconButton={<Actions parent={this} model={model}/>}
                    leftIcon={icon}>

                    {<Loader style={Theme.search.model.inline} ui={Directory.inline(model.constructor.name)} model={model.ref}/>}
                    {<Context style={Theme.search.model.context} followers={this.props.followers} derivators={this.props.derivators} parents={this.props.parents} date={this.props.date} model={model}/>}
                </ListItem>
            );
        case "Column":
            break;
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

            this.state.models.forEach((model) => {
                if (rows.length > 0) rows.push(<ListDivider key={"divider" + model.ref}/>);
                rows.push(this.renderModel(model));
                rows.push(this.expand(model));
            });

            if (rows.length === 0) {
                rows.push(<ListItem disabled key="nothing"><center><em>None</em></center></ListItem>);
            }

            return (
                <div>
                    <Paper style={Theme.search.toolbar}>
                        {this.chart()}
                    </Paper>

                    <Paper>
                        <List style={Theme.search.list}>
                            {this.toolbar()}
                            <Dropzone disableClick onDrop={this.onDrop} style={Theme.drop.normal} activeStyle={Theme.drop.active} rejectStyle={Theme.drop.reject}>
                                {rows}
                            </Dropzone>
                        </List>
                        {!this.state.loading ? <Waypoint onEnter={this.loadOneMorePage}/> : false}
                    </Paper>

                    {this.snack()}
                </div>
            );
        }
    }
}

module.exports = Search;