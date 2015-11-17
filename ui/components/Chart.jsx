const d3 = require("d3");
const React = require("react");
const ReactDOM = require("react-dom");
const Pure = require("../inc/Pure");

class Chart extends Pure {

    constructor(props) {
        super(props);
        this.state = {
            width: false,
            height: false,
            data: false,
            margin: {top: 20, right: 30, bottom: 30, left: 50}
        };
    }

    componentDidMount() {
        var el = ReactDOM.findDOMNode(this);
        this.setState({
            width: el.offsetWidth - this.state.margin.left - this.state.margin.right,
            height: el.offsetHeight - this.state.margin.top - this.state.margin.bottom
        });
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        var parse = d3.time.format("%Y-%m-%d").parse;

        this.setState({
            data: nextProps.data.map((d) => {
                return {
                    date: parse(d.key_as_string),
                    value: d.doc_count
                };
            })
        });
    }

    chart() {
        if (!this.state.width || !this.state.height || !this.state.data) {
            // Even if we are not mounted yet, return some tags with refs for later use
            return (
                <g>
                    <path className="area"></path>
                    <g ref="xaxis"></g>
                    <g ref="yaxis"></g>
                </g>
            );
        }

        var x = d3.time.scale()
            .range([0, this.state.width]);

        var y = d3.scale.linear()
            .range([this.state.height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickPadding(10)
            .tickSize(0, 0);

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(4)
            .orient("left")
            .tickPadding(10)
            .tickSize(0, 0);

        var area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(this.state.height)
            .y1(function(d) { return y(d.value); })
            .interpolate("basis");

        x.domain(d3.extent(this.state.data, function(d) { return d.date; }));
        y.domain([0, d3.max(this.state.data, function(d) { return d.value; })]);

        xAxis(d3.select(this.refs.xaxis));
        yAxis(d3.select(this.refs.yaxis));

        var ticks = y.ticks(4);
        ticks.shift(); // Remove the 0 guide

        var guides = ticks.map((tick) => {
            return <line key={tick} x1={0} x2={this.state.width} y1={y(tick)} y2={y(tick)}/>;
        });

        return (
            <g transform={"translate(" + this.state.margin.left + "," +  this.state.margin.top + ")"}>
                <path className="area" d={area(this.state.data)}></path>
                <g className="axis" ref="xaxis" transform={"translate(0," + this.state.height + ")"}></g>
                <g className="axis" ref="yaxis"></g>
                <g className="guides">{guides}</g>
            </g>
        );
    }

    render() {
        return (
            <div>
                <svg width="100%" height="200px" className="d3">
                    {this.chart()}
                </svg>
            </div>
        );
    }
}

module.exports = Chart;