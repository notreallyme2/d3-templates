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

// to allow console testing
var globalData, columnNames, colours;

// creates the SVG canvas
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x = d3.scaleLinear().range([0, width])
y = d3.scaleLinear().range([height, 0])

// utility function that converts a data 'row' to all numeric
makeNumeric = function(dataObject) {
    var keyNames = Object.keys(dataObject);
    var numberOfKeys = keyNames.length;
    for(i = 0; i < numberOfKeys; i++) {
        dataObject[keyNames[i]] = +dataObject[keyNames[i]];
    }
    return(dataObject);
}

// get the data
d3.csv("coloured-line-data.csv", function(error, data) {
    columnNames = Object.keys(data[0])
    data.forEach(function(d) {
        d = makeNumeric(d);
    });
    globalData = data; // to allow queries from the console

    // various options to set scales 
    var xMax = 20,
        yMax = 20;
    // var xMax = d3.max(data, function(d) { return d.x1; });
    // var yMax = d3.max(data, function(d) { return d.y1; });
    // manually
    x.domain([0, xMax]);
    y.domain([0, yMax]);
    // automatically, using d3.extent() and d3.nice()
    // x.domain( d3.extent(data, function(d) { return d.x1; })).nice();
    // y.domain( d3.extent(data, function(d) { return d.y1; })).nice();

    // colours for the lines (2 columns for each line)
    colours = d3.scaleOrdinal(d3.schemeCategory10)
            .domain( 0, columnNames.length/2 );

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


    // a function to plot the data
    plotTheData = function(xName, yName, lineColour) {
        // sort for this x ascending
        data = data.sort(function (a, b) {return d3.ascending(a[xName], b[xName]); });

        var line = d3.line()
            .x(function(d) { return x(d[xName]); })
            .y(function(d) { return y(d[yName]); });

        // add the points
        svg.append("g")
            .attr("class", "circles")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", lineColour)
            .attr("r", 4)
            .attr("cx", function(d) {
                return x(d[xName]) })
            .attr("cy", function(d) {
                return y(d[yName]) })

        // add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", lineColour)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line);
    }
   
    // finally, plot all the lines
    for(i=0; i<columnNames.length/2; i++){
        plotTheData(columnNames[i*2], columnNames[i*2+1], colours(i));
    }

    // add a legend using http://d3-legend.susielu.com/
    svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(30,30)");

    var legend = d3.legendColor()
        .shapePadding(10)
        .scale(colours)

    svg.select(".legend")
        .call(legend);
    }
);

