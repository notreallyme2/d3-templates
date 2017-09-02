// set up variables
var margin = {top: 10, right: 30, bottom: 30, left: 50},	
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
d3.csv("data.csv", function(error, data) {
    globalData = data; // to allow queries from the console
	data.forEach(function(d) {
		d.x = +d.x
		d.y = +d.y;
	});

    // extract maximum values...
    // var xMax = d3.max(data, function(d) { return d.x; });
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

});

