---
layout: post
title: "PHPstorm and Drupal styling"
excerpt_separator: <!--more-->
date: 2018-09-24
tags:
 - drupal
 - tripal
 - documentation
 - phpstorm
---

# Introduction

<!--more-->

### Adding the code sniffer

The official Drupal guide should be sufficient for adding and configuring the code sniffer.

https://www.drupal.org/node/1419988

### Adding the code formatter

Unfortunately, the sniffer won't make changes to the code styling.

https://thiagoponte.wordpress.com/2015/08/03/run-php-codesniffer-code-beautifier-and-fixer-from-phpstorm/

for the program path, use `which phpcbf`.

Program: `/Users/bc/.composer/vendor/bin/phpcbf`
Argument:  `--standard=Drupal $fileDir$/$FileName$`
working directory: `$ProjectFileDir$`


![phpcbf script configuration](/assets/img/phpcbf_script_config.png)


### setting up CI
