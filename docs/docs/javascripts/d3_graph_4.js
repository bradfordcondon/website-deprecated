src="d3_graph_3.js"

var dataNew = [{name: 'one', property: 'a', value: 100},
  {name: 'two', property: 'a', value: 50},
  {name: 'three', property: 'b', value: 20},
  {name: 'four', property: 'b', value: 57},
  {name: 'five', property: 'b', value: 17},
  {name: 'six', property: 'a', value: 5},
  {name: 'seven', property: 'a', value: 52},
  {name: 'eight', property: 'b', value: 11},
  {name: 'nine', property: 'b', value: 81},
  {name: 'ten', property: 'b', value: 62}
]

// Universal constants
height = 100
width  = 300
//Padding





var svgThree = d3.select('#plot_three')
  .append('svg')
  .attr('height', height)
  .attr('width', width)


//Build plot sorted by ordinal group

buildOrdinalPlot(svgThree, nestedData)

