---
layout: post
title: "D3 part two: flipping the plot"
excerpt_separator: <!--more-->
date: 2017-12-23
---


In our previous lesson, we created this rudimentary plot.


Why is it upside down?

D3 considers the **upper left** corner of the SVG to be 0,0.  This means that the part of our code defining y values needs to be corrected.


## Scales

To correct our inverted plot, lets introduce [D3 scales](https://github.com/d3/d3-3.x-api-reference/blob/master/Quantitative-Scales.md).  As a quick reminder, we're using the D3-3.x package: the latest version has slightly different scale function calls.

Scales are used to define how values will map to the plot.  The simplest type of scale is a **linear** scale, where the input values will be mapped to an output value via a linear function.

For a linear scale, we need to understand the **`domain()`** and the **`range()`**.  Both domain and range take an array of numbers as their input.

 ```
 var yScale =  d3.scale.linear()
 ```