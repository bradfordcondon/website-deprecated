// Universal constants
height = 100
width  = 200


var data = [{name: 'one', property: 'a', value: 100},
  {name: 'two', property: 'a', value: 50},
  {name: 'three', property: 'b', value: 20},
  {name: 'four', property: 'b', value: 57}]

//<div id="starting_plot"></div>
var svg = d3.select('#starting_plot')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

var bars = svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function (d, i) {
    return 'translate(' + i * 20 + ',0)'
  }).append('rect')
  .style('fill', 'red')
  .style('height', function (d, i) {
    return d.value
  })
  .attr('width', 10)


//<div id="plot_mk_1"></div>

svg = d3.select('#plot_mk_1')
  .append('svg')
  .attr('width', width)
 .attr("height", height)

var yScale = d3.scale.linear()
yScale.domain([0, 100])
yScale.range([height, 0])//note the range is inverted

svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function (d, i) {
    return 'translate(' + (20 + i * 20) + ',0)'
  }).append('rect')
  .attr('y', function (d) {
      return yScale(d.value)
    }
  )
  .style('height', function (d, i) {
    return height - yScale(d.value)
  })
  .style('fill', 'red')
  .attr('width', 10)

//<div id="plot_mk_2"></div>
var padding = 0
var outerpadding = 0
svg = d3.select('#plot_mk_2')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

var xScale = d3.scale.ordinal()
xScale.domain(['one', 'two', 'three', 'four'])
  .rangeRoundBands([0, width], padding, outerpadding)

svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function (d, i) {
    return 'translate(' + xScale(d.name) + ',0)'
  }).append('rect')
  .style('fill', 'red')
  .attr('y', function (d) {
      return yScale(d.value)
    }
  )
  .style('height', function (d, i) {
    return height - yScale(d.value)
  })
  .attr('width', 10)

//<div id="plot_mk_3"></div>
padding = 0
outerpadding = 2
svg = d3.select('#plot_mk_3')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

 xScale = d3.scale.ordinal()
xScale.domain(['one', 'two', 'three', 'four'])
  .rangeRoundBands([0, width], padding, outerpadding)

svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', function (d, i) {
    return 'translate(' + xScale(d.name) + ',0)'
  }).append('rect')
  .style('fill', 'red')
  .attr('y', function (d) {
      return yScale(d.value)
    }
  )
  .style('height', function (d, i) {
    return height - yScale(d.value)
  })
  .attr('width', 10)



//<div id="plot_final"></div>

svg = d3.select('#plot_final')
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