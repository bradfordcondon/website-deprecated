
var data = [{name: "one", property: "a", value: 100},
  {name: "two", property: "a", value: 50},
  {name: "two", property: "b", value: 20},
  {name: "four", property: "b", value: 57},
  {name: "five", property: "b", value: 17},
  {name: "six", property: "a", value: 5},
  {name: "seven", property: "a", value: 52},
  {name: "eight", property: "a", value: 11},
  {name: "nine", property: "b", value: 81},
  {name: "ten", property: "b", value: 62},
];

svg = d3.select('#plot_previous')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

var yScale = d3.scale.linear()

yScale.domain([0, 100])
  .range([height, 0])

outerPadding = 2
padding      = 0

var xScale = d3.scale.ordinal()
xScale.domain(['one', 'two', 'three', 'four'])
  .rangeRoundBands([0, width], padding, outerPadding)

var colorScale = d3.scale.category10()
colorScale.domain(['a', 'b'])

var bars = svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function (d, i) {
    return 'translate(' + xScale(d.name) + ',0)'
  }).append('rect')
  .style('fill', function (d) {
    return colorScale(d.property)
  })
  .attr('y', function (d) {
      return yScale(d.value)
    }
  )
  .style('height', function (d, i) {
    return height - yScale(d.value)
  })
  .attr('width', 10)



var nestedData = d3.nest()
  .key(function(d) { return d.property; })
  .entries(data);
