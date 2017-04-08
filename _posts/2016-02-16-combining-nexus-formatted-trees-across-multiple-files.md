---
id: 546
title: Combining NEXUS formatted trees across multiple files
date: 2016-02-16T19:53:07+00:00
author: bradford.condon@gmail.com
layout: post
guid: http://www.bradfordcondon.com/?p=546
permalink: /?p=546
image: /wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.52.19-PM.png
categories:
  - Science
  - Tools
tags:
  - APE
  - Bioinformatic
  - Phylogenetics
  - R
  - tools
---
Combining NEXUS formatted trees across multiple files

<div id="preview-contents" class="note-content">
  <div id="wmd-preview-section-1924" class="wmd-preview-section preview-content">
    <h1 id="combining-nexus-formatted-trees-across-multiple-files">
      Combining NEXUS formatted trees across multiple files
    </h1>
    
    <p>
      <img class="alignright wp-image-547 size-medium" src="https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.45.17-PM-300x166.png?fit=300%2C166" alt="Screen Shot 2016-02-16 at 2.45.17 PM" srcset="https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.45.17-PM.png?resize=300%2C166 300w, https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.45.17-PM.png?resize=768%2C424 768w, https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.45.17-PM.png?resize=1024%2C565 1024w, https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/02/Screen-Shot-2016-02-16-at-2.45.17-PM.png?w=1044 1044w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />Recently I had a large set of individual nexus tree files. I wanted to combine them into a single file. They had the same taxa at the tips of each tree, <strong>but</strong> the tips were in a different order.
    </p>
    
    <p>
      A simple way to deal with this problem was to read the trees into a package designed to handle phylogenetic trees, and let that package handle the output. The R package <a href="https://cran.r-project.org/web/packages/ape/index.html" target="_blank">APE</a> fit my purposes nicely (and was complete overkill for the task, of course).
    </p>
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <div id="wmd-preview-section-1924" class="wmd-preview-section preview-content">
    <p>
      To use the below code, you will need to install APE, and have a list of all tree files.  <strong>Tip</strong>: you can quickly generate a list of all your files by using the ls command in your shell!
    </p>
  </div>
  
  <div id="wmd-preview-section-1717" class="wmd-preview-section preview-content">
    <h2 id="r-code">
      R code
    </h2>
  </div>
  
  <div id="wmd-preview-section-footnotes" class="preview-content">
  </div>
</div>

<pre class="prettyprint hljs-dark"><code class="language-r hljs">&lt;span class="hljs-comment line-number">1.&lt;/span>&lt;span class="hljs-keyword">library&lt;/span>(ape)&lt;br>&lt;span class="hljs-comment line-number">2.&lt;/span>setwd(&lt;span class="hljs-string">"#Your working directory"&lt;/span>) &lt;br>&lt;span class="hljs-comment line-number">3.&lt;/span>file_list &lt;-  list.files(path = &lt;span class="hljs-string">"#your list of trees"&lt;/span>)&lt;br>&lt;span class="hljs-comment line-number">4.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">5.&lt;/span>&lt;span class="hljs-comment">##create a blank multiphylo object&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">6.&lt;/span>all_trees = vector(&lt;span class="hljs-string">"list"&lt;/span>, &lt;span class="hljs-number">2&lt;/span>)  &lt;br>&lt;span class="hljs-comment line-number">7.&lt;/span>class(list) &lt;- &lt;span class="hljs-string">"multiPhylo"&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">8.&lt;/span>&lt;span class="hljs-comment">##&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">9.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">10.&lt;/span>&lt;span class="hljs-comment">##Loop through all the files.  You may realize creating the "loop" list is an extra unnecessary step.  &lt;/span>&lt;br>&lt;span class="hljs-comment line-number">11.&lt;/span>&lt;span class="hljs-comment">#However it lets us sequentially add to the all_trees multiphylo object at the end of the loop.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">12.&lt;/span>length = length(file_list)&lt;br>&lt;span class="hljs-comment line-number">13.&lt;/span>loop = as.list(c(&lt;span class="hljs-number">1&lt;/span>:length)) &lt;br>&lt;span class="hljs-comment line-number">14.&lt;/span>&lt;span class="hljs-keyword">for&lt;/span> (i &lt;span class="hljs-keyword">in&lt;/span> (loop)) {&lt;br>&lt;span class="hljs-comment line-number">15.&lt;/span>  filename = file_list[i]&lt;br>&lt;span class="hljs-comment line-number">16.&lt;/span>  itree &lt;- read.tree(filename, tree.names = filename)&lt;br>&lt;span class="hljs-comment line-number">17.&lt;/span>  all_trees[[i]] &lt;- itree&lt;br>&lt;span class="hljs-comment line-number">18.&lt;/span>}&lt;br>&lt;span class="hljs-comment line-number">19.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">20.&lt;/span>&lt;span class="hljs-comment">##ad names to the unnamed trees based on our file name list&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">21.&lt;/span>names(all_trees) = file_list  &lt;br>&lt;span class="hljs-comment line-number">22.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">23.&lt;/span>&lt;span class="hljs-comment">#write the trees to a single file.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">24.&lt;/span>write.nexus(all_trees, file= &lt;span class="hljs-string">"my_file_name.nex"&lt;/span> )&lt;br>&lt;span class="hljs-comment line-number">25.&lt;/span>&lt;br>&lt;span class="hljs-comment line-number">26.&lt;/span>&lt;br></code></pre></div> 

<div id="wmd-preview-section-footnotes" class="preview-content">
</div></div> 

</body></html>