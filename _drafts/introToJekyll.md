
---
layout: post
title: "Moving to Jekyll"
date: unpublished
---


## Migrating my old posts

[Ben Balter](http://ben.balter.com/) has created a Wordpress plugin that exports existing posts to Jekyll Markdown.

It's simple: download and enable the plugin, then use the `export to Jekyll` command on the toolbar.  

![Exporting to Jekyll from Wordpress]({{ site.url }}/assets/wp2jekyllTool.png)



##Moving draft posts to published


[This post on Hongkiat's blog](http://www.hongkiat.com/blog/jekyll-plugin/) pointed me to a plugin created by [Jeffrey Sambells](http://jeffreysambells.com/). 

We write posts in the `_drafts` folder, and mark them as `date: unpublished` in the header.
 

 So,

 ```
---
layout: post
title: "Moving to Jekyll"
date: unpublished
---

#Introduction

This is my post htat I get to write in *Markdown*!  

 ```