var isEven = true;
var shouldBeFullRow = false;
var firstAdded = false;

function createNewsBox(contents){
    var newDiv = document.createElement('div');
    newDiv.className = getNextDivClass();

    var cont = document.createElement('div');
    cont.id = 'horbarn';

    var headerDiv = document.createElement('div');
    headerDiv.id = "header";

    var pic = document.createElement('div');
    pic.className = 'picdiv';
    pic.style.backgroundImage = "url(pic/temp_pic3.jpg)";

    cont.appendChild(headerDiv);
    
    newDiv.appendChild(pic);
    newDiv.appendChild(cont);
    
    document.getElementById('contentbox').appendChild(newDiv);
    addStuff();
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

function addStuff(){
    // Set the dimensions of the canvas / graph
    var margin = {top: 20, right: 0, bottom: 20, left: 40},
        width = 550,
        height = 150;

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
    var svg = d3.select("#horbarn")
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



