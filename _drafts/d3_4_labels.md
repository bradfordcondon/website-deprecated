---
layout: post
title: "D3 part four: Labeling"
excerpt_separator: <!--more-->
custom_js: d3_graph_3.js
tags: 
 - education
 - web
 - javascript
 - d3
 - data-science
---


In previous posts we've learned about nesting our data and utilizing scales.  This post we'll discuss graph labels.

<!--more-->

><div id="starting_plot"></div>
>our starting plot from previous lessons.

What labels you add where will be entirely case dependent.  In general, though, we'll want to label our X and Y axes, and provide a title.


### Padding

Before we can add labels, we need to make room for them.  A good practice is to define your four margins at the beginning of your plot which will hold your various labels and axes.  Then, when defining your dimensions, be mindful of this layout.


```js
var padding = {top: 200, bottom: 100, left: 50, right: 10}

```

