// set up variables
// using Mike Bostock's margin convention: https://bl.ocks.org/mbostock/3019563
var margin = {top: 10, right: 30, bottom: 50, left: 100},	
	width = 500 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
    xLabel = "x label",
    yLabel = "y label"
    xLabelOffset = 40, // distance of axis labels from axes
    yLabelOffset = 60,
    numberOfTicks = 5;

// creates the SVG canvas
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x = d3.scaleLinear().range([0, width])
y = d3.scaleLinear().range([height, 0])

// get the data
// data loading is asynchronous, so entire plot is wrapped in a call to d3.csv
d3.csv("simple-scatter-data.csv", function(error, data) {
    globalData = data; // to allow queries from the console
    data.forEach(function(d) {
        d.x = +d.x
        d.y = +d.y;
    });

    // various options to set scales 
    var xMax = 20,
        yMax = 20;
    // var xMax = d3.max(data, functios(d) { return d.x; });
    // var yMax = d3.max(data, function(d) { return d.y; });
    // manually
    // x.domain([0, xMax]);
    // y.domain([0, yMax]);
    // automatically, using d3.extent() and d3.nice()
    x.domain( d3.extent(data, function(d) { return d.x; })).nice();
    y.domain( d3.extent(data, function(d) { return d.y; })).nice();

    // add the points
    svg.append("g")
        .attr("class", "circles")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 6)
        .attr("cx", function(d) {
            return x(d.x) })
        .attr("cy", function(d) {
            return y(d.y) })

    // add the axes
    svg.append("g")
        .attr("class", "axis")
    .attr("transform", "translate(" + 0 + ", " + height + ")")
        .call(d3.axisBottom(x)
        .ticks(numberOfTicks));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y)
        .ticks(numberOfTicks));

    // add axis labels
    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr( "x", width / 2 )
        .attr( "y", (height + xLabelOffset) )
        .text(xLabel);

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr( "x", -yLabelOffset )
        .attr( "y", height / 2 )
        .text(yLabel);
    }
);

