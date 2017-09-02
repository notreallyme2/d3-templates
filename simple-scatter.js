// set up variables
var margin = {top: 10, right: 30, bottom: 50, left: 50},	
	plotWidth = 400,
	plotHeight = 400,
    canvasWidth = plotWidth + margin.left + margin.right,
    canvasHeight = plotHeight + margin.top + margin.bottom,
    numberOfTicks = 5;

// creates the SVG canvas
var	figure = d3.select("body")
	.append("svg")
		.attr("width", canvasWidth) 
		.attr("height", canvasHeight); 

// get the data
d3.csv("simple-scatter-data.csv", function(error, data) {
    globalData = data; // to allow queries from the console
	data.forEach(function(d) {
		d[0] = +d[0]
		d[1] = +d[1];
	});

    // extract variable names (for axis labels)
    var xVarName = Object.keys(data[0])[2];
    var yVarName = Object.keys(data[0])[3];

    // extract maximum values...
    // var xMax = d3.max(data, functios(d) { return d.x; });
    // var yMax = d3.max(data, function(d) { return d.y; });
    // or set them manually
    var xMax = 20,
        yMax = 20;

    x = d3.scaleLinear()
            .range([margin.left, margin.left + plotWidth])
            .domain([0, xMax]);
    y = d3.scaleLinear()
            .range([margin.top + plotHeight, margin.top])
            .domain([0, yMax]);

    // add the points
    figure.append("g")
        .attr("class", "circles")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", function(d) {
            return x(d.x) })
        .attr("cy", function(d) {
            return y(d.y) })

    // add the axes
    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + ", " + (margin.top + plotHeight) + ")")
        .call(d3.axisBottom(x)
        .ticks(numberOfTicks));

    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" +  margin.left + ", " + 0 + ")")
        .call(d3.axisLeft(y)
        .ticks(numberOfTicks));

    // add axis labels
    figure.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr( "x", (margin.left + plotWidth / 2 + 5) )
        .attr( "y", (margin.top + plotHeight + 40) )
        .text(xVarName);

    figure.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr( "x", (margin.left / 2 - 13) )
        .attr( "y", (margin.top + plotHeight / 2 + 3) )
        .text(yVarName);

});

