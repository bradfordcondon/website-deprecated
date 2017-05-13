---
layout: post
title: "File extensions"
excerpt_separator: <!--more-->
---

This post is the first in a series on understanding biological file formats.  This material is developed for use in hte KBRIN Next Generation Sequencing workshop 2017 hosted at the University of Kentucky.

<!--more-->

Before I get into explaining the specific output of different common programs, I first need to answer a simple question: what is a file format?  Simple questions are often redirected to the dictionary (or in this day and age, [Wikipedia](https://en.wikipedia.org/wiki/File_format)).

>A file format is a standard way that information is encoded for storage in a computer file. It specifies how bits are used to encode information in a digital storage medium.


### Binary



### UTF

If we're thinking about bioinformatics data, we are usually thinking about *strings* which can be written out in a text file.  For example, a protein represented in FASTA format is written out in FASTA format as  

```
	>SequenceABC heat shock protein
	AALLRALYNKKLAYQ
	>sequence D
	....
```
In FASTA format, each new sequence is seperated by a `>` character.  All other characters after the `>` until the next line are part of the header.  Everything up until the first space (` `) is the sequence name, and everything after is part of the sequence description.

How does the file describe that the description is over, and the sequence has started?  After all, it's made up of the same character types- letters.  In fact, there is a special character called the newline character that signifies the line break.  All characters not on the `>` line are part of the sequence.  This means that Sequence A and sequence B below are identical.

```
>Sequence A
AAAA
>Sequence B
AA
AA
>Sequenc
e C 
AAAA

``` 
Sequence C, on the other hand, is actually `sequenc` with everything follows as part of the sequence.

* Fasta and spaces, do they get ignored?

#### The newline character

It's worth taking a break and pointing out that **different file systems use different newline characters**.  A common rookie mistake is to open a file such as a FASTA file in Microsoft Word, do some editing, and save the file.

On Windows, a newline is actually two characters: `/r/n`.  On Linux, it is only `/n`.  This is only just the beginning: all sorts of extra information is included in a Microsoft word file, such as **bold** characters, fonts, colors, line spacing, etc.  This is why I usually recommend fledgeling bioinformaticists learn to use a basic text editor and never look back.  In writing this article I've learned that there are actually plugins for [working with bioinformatics data in Microsoft Word](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-13-124), but the safer route is to learn to work with one of the many, free, basic text editors out there.


### After the dot


