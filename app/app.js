var isEven = false;
var shouldBeFullRow = false;
var firstAdded = false;

var test = createFirstBox();



////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                      FUNCTION TO GET CORRECT DOM STRUCTURE                 //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

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


////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                          FIRST GRAPH STUFF                                 //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

function createFirstBox(contents){
    var newDiv = document.createElement('div');
    newDiv.className = getNextDivClass();
    console.log(newDiv.className);

    var cont = document.createElement('div');

    var headerDiv = document.createElement('div');
    headerDiv.id = "header";
    headerDiv.innerText = "What is this?";

    var pic = document.createElement('div');
    pic.className += 'firstGraph';
    cont.appendChild(headerDiv);
    
    newDiv.appendChild(pic);
    newDiv.appendChild(cont);
    
    document.getElementById('contentbox').appendChild(newDiv);
    addFirstGraph();
}

function addFirstGraph(){
    var margin      = {top: 50, right: 20,bottom: 20, left: 100},
        width       = 380 - margin.left - margin.right,
        height      = 380 - margin.top - margin.bottom,
        x           = d3.scaleBand().rangeRound([0,width]).paddingInner(0.5),
        y           = d3.scaleLinear().range([height,0]); 

    var xAxis       = d3.axisBottom()
        .scale(x)
        .ticks(12);
    
    var yAxis       = d3.axisLeft()
        .scale(y)
        .ticks(10);

    var canvas      = d3.select(".firstGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    d3.csv("/data/3month_sell_value.csv", function(data) {
        data.forEach(function(d) {
            d['Antal'] = +d['Antal'];
        });

        x.domain(data.map(function (d) {
            return d.omr;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.antal;
        })]);

        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("dx", "-0.5em")
            .attr("dy", "-0.55em")
            .attr("y", 30)
            .attr("transform", "rotate(-45)");

        canvas.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        canvas.append("text")
            .attr("transform", "rotate(90)")
            .attr("y", -20)
            .attr("x", 35)
            .attr("dy", "0.8em")
            .attr("text-anchor", "end")
            .text("Testing");

        canvas.selectAll("bar")
            .data(data)
            .enter()
            .append("rect")
            .style("fill", "orange")
            .attr("x", function (d) {
                return x(d.omr);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.antal);
            })
            .attr("height", function (d) {
                return height - y(d.rank);
            });
        });
}




////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                          SECOND GRAPH STUFF                                //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////


/*function addFirstGraph(contentDiv){
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
}*/



