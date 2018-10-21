var data = [{name: 'one', property: 'a', value: 100},
  {name: 'two', property: 'a', value: 50},
  {name: 'three', property: 'b', value: 20},
  {name: 'four', property: 'b', value: 57}]


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

var svg = d3.select('#plot_previous')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

var svgTwo = d3.select('#plot_previous_new_data')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

buildOldPlot(svg, data)
buildOldPlot(svgTwo, dataNew)


var nestedData = d3.nest()
  .key(function (d) {
    return d.property
  })
  .entries(dataNew)



var svgThree = d3.select('#plot_three')
  .append('svg')
  .attr('height', height)
  .attr('width', width)


//Builda plot sorted by ordinal group

buildOrdinalPlot(svgThree, nestedData)

function buildOrdinalPlot(svg, data) {
  var yScale = d3.scale.linear()

  yScale.domain([0, 100])
    .range([height, 0])

  outerPadding = .5
  padding      = .5

  var xScale = d3.scale.ordinal()
  xScale.domain(data.map(function (entry) {
    return entry.key
  }))
    .rangeRoundBands([0, width], padding, outerPadding)

  var colorScale = d3.scale.category10()
  colorScale.domain(['a', 'b'])

  x2Scales = {}//create a scale tracker

  //go through the data and generated an individual scale for each group.
  data.map(function (propertyGroup) {
    entriesInProperty = []
    key               = propertyGroup.key
    propertyGroup.values.map(function (entry) {
      entriesInProperty.push(entry.name)
    })
    newScale      = d3.scale.ordinal()
      .domain(entriesInProperty)
      .rangeRoundPoints([0, xScale.rangeBand()])

    console.log(newScale.range())
    console.log(newScale.domain())
    x2Scales[key] = newScale
  })

  var barGroups = svg.selectAll('.barGroup')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function (d) {
      return 'translate(' + xScale(d.key) + ',0)'
    })

    var bars = barGroups.selectAll('.bar')
      .data(function (d) {
        return d.values
      }).enter()
    .append('rect')
    .style('fill', function (d) {
      return colorScale(d.property)
    })
      .attr('transform', function(d){
        var scale = x2Scales[d.property]//fetch the scale
        //shift this bar by its location in the scale
        return 'translate(' +  scale(d.name) + ',0)'
      })
    .attr('y', function (d) {
        return yScale(d.value)
      }
    )
    .style('height', function (d, i) {
      return height - yScale(d.value)
    })
    .attr('width', 10)

}

//Build the plot that starts this lesson, given an SVG and the data

function buildOldPlot(svg, data) {
  var yScale = d3.scale.linear()

  yScale.domain([0, 100])
    .range([height, 0])

  outerPadding = 2
  padding      = 0

  var xScale = d3.scale.ordinal()
  xScale.domain(data.map(function (entry) { //instead of manually defining our domain, map the array of input data and get the name value for each entry.
    return entry.name
  }))
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
}

