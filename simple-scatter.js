var gapping = 30,	
	width = 600,
	height = 600,
    numberOfTicks = 0,
    x = d3.scaleLinear().range([0, ( (width / 2) - (2 * gapping) )])
            .domain([0, 20]),
    y = d3.scaleLinear().range([ ( (height / 2) - (2 * gapping) ), 0])
            .domain([0, 20]);

var globalData;    

// creates the SVG canvas
var	figure = d3.select("body")
	.append("svg")
		.attr("width",  width) 
		.attr("height", height); 

// get the data
d3.csv("I.csv", function(error, data) {
    data1 = data;
	data.forEach(function(d) {
		d.x = +d.x
		d.y = +d.y;
	});

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
        .attr("transform", "translate(" + gapping + ", " + ((height / 2) - gapping) + ")")
        .call(d3.axisBottom(x)
            .ticks(numberOfTicks));

    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + gapping + ", " + gapping + ")")
        .call(d3.axisLeft(y)
            .ticks(numberOfTicks));

});

// add the second axes
// get the data
d3.csv("II.csv", function(error, data) {
    globalData = data;
	data.forEach(function(d) {
		d.x = +d.x
		d.y = +d.y;
	});

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
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + gapping + ")");

    // add the axes
    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + ((height / 2) - gapping) + ")")
        .call(d3.axisBottom(x)
            .ticks(numberOfTicks));

    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + gapping + ")")
        .call(d3.axisLeft(y)
            .ticks(numberOfTicks));

});

// add the third axes
// get the data
d3.csv("III.csv", function(error, data) {
    globalData = data;
	data.forEach(function(d) {
		d.x = +d.x
		d.y = +d.y;
	});

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
        .attr("transform", "translate(" + gapping + ", " + (height / 2 + gapping) + ")");

    // add the axes
    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + gapping + ", " + (height - gapping) + ")")
        .call(d3.axisBottom(x)
            .ticks(numberOfTicks));

    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + gapping + ", " + (height / 2 + gapping) + ")")
        .call(d3.axisLeft(y)
            .ticks(numberOfTicks));

});

// add the fourth axes
// get the data
d3.csv("IV.csv", function(error, data) {
    globalData = data;
	data.forEach(function(d) {
		d.x = +d.x
		d.y = +d.y;
	});

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
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + (height / 2 + gapping) + ")");

    // add the axes
    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + (height - gapping) + ")")
        .call(d3.axisBottom(x)
            .ticks(numberOfTicks));

    figure.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (width / 2 + gapping) + ", " + (height / 2 + gapping) + ")")
        .call(d3.axisLeft(y)
            .ticks(numberOfTicks));

});
