---
layout: post
title: "D3 part three: Nesting"
excerpt_separator: <!--more-->
---

<div id="plot_previous"></div>

## Nesting

A common desire when laying out a plot is to have data grouped along the x-axis by some property.  We can accomplish this by **nesting** our data according to the property we would like to group by.

```js
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
```

## Multiple groupings