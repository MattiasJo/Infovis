var isEven = true;
var shouldBeFullRow = false;
var firstAdded = false;
var test = createNewsBox('shit');
var test2 = createTempBox('woo');


function createNewsBox(contents){
    var newDiv = document.createElement('div');
    newDiv.className = getNextDivClass();
    console.log(newDiv.className);

    var cont = document.createElement('div');

    var headerDiv = document.createElement('div');
    headerDiv.id = "header";
    headerDiv.innerText = "What is this?";

    var pic = document.createElement('div');
    pic.className = 'picdiv';
    cont.appendChild(headerDiv);
    
    newDiv.appendChild(pic);
    newDiv.appendChild(cont);
    
    document.getElementById('contentbox').appendChild(newDiv);
    addFirstGraph(pic);
}

function createTempBox(contents){

    var rowBox = document.createElement('div'); //creating even row large
    rowBox.className = getNextDivClass();
    console.log(rowBox.className);

    var textDiv = document.createElement('div'); //creating textdiv
    textDiv.className = "textdiv"

    var pic = document.createElement('div');
    pic.className = 'picdiv';
    pic.style.backgroundColor = "red";
    
    rowBox.appendChild(textDiv);
    rowBox.appendChild(pic);
    
    document.getElementById('contentbox').appendChild(rowBox);
    addSecondGraph(pic);
}


function getNextDivClass(){
    if(isEven){
        if(!firstAdded){
            firstAdded=true;
            return "even_row_small box";
        }else{
            firstAdded=false;
            isEven=false;
            return "even_row_large box";
        }
    }else{
        if(!shouldBeFullRow){
            if(!firstAdded){
                firstAdded=true;
                return "odd_row_large box";
            }else{
                firstAdded=false;
                shouldBeFullRow=true;
                return "odd_row_small box";
            }
        }else{
            isEven=true;
            isFullRow=false;
            shouldBeFullRow=false;
            return "full_row box"
        }
    }
}

function addSecondGraph(contentDiv){
    contentDiv.id = "secondGraph";
    var tmpDiv = d3.select('#secondGraph');

    var datas = [4, 8, 15, 16, 23, 42];

    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var	parseDate = d3.time.format("%Y-%m").parse;

    var x = d3.scale.linear().range([0, width]);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(13);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("/data/Data-Tabell1.csv", function(error, data) {

    data.forEach(function(d) {
        d.Year = +d.Year;
        d.Revenue = +d.Revenue;
    });
	
    x.domain(data.map(function(d) { return d.Year; }));
    y.domain([0, d3.max(data, function(d) { return d.Revenue; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d.Year); })
        .attr("width", x)
        .attr("y", function(d) { return y(d.Revenue); })
        .attr("height", function(d) { return height - y(d.Revenue); });

    });
    
}

function addFirstGraph(contentDiv){
    // Set an original id on the div on which a graph is about to be added (SHOULD NOT BE NECESSARY)
    contentDiv.id = "firstGraph";
    var tmpDiv = d3.select('#firstGraph');
    
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 550,
        height = 120;

    // Parse the date / time
    var parseDate = d3.time.format("%d-%b-%y").parse;

    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);

    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });
        
    // Adds the svg canvas
    var svg = tmpDiv
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("data.csv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
}



