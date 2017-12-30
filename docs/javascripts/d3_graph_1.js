
var data = [{name: "one", property: "a", value: 100},
  {name: "two", property: "a", value: 50},
  {name: "two", property: "b", value: 20},
  {name: "four", property: "b", value: 57}, ];

var svg = d3.select("#output_plot").append("svg")
console.log("I am running")
var bars=  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return 'translate(' + i* 20 + ',0)';
    }).append('rect')
    .style('fill', "red")
    .style("height", function (d, i) {
      return d.value})
    .attr('width', 10)
