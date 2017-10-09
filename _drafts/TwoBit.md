---
layout: post
title: "TwoBit format"
excerpt_separator: <!--more-->
---

# What is TwoBit

# Creating a TwoBit file

We can follow the guide on the [UCSC website](https://genome.ucsc.edu/goldenpath/help/twoBit.html).

For example, the OSX formatted versions can be downloaded [here](http://hgdownload.soe.ucsc.edu/admin/exe/macOSX.x86_64/).  If you're new to computer science, you might not be sure whatto do with these.

### Move the file into your $PATH

`echo $PATH`.  the path `/usr/local/bin` should be somewhere in the alphabet soup.  This is a place we can install software so that it can be accessed wherever we are in our file system.

### Change permissions on the file
`chmod a+x /usr/local/bin/faToTwoBit`

### What does the command do?

If we try to run the command with no arguments by simply executing ` faToTwoBit`, we'll get the command's usage arguments.

```shell
faToTwoBit - Convert DNA from fasta to 2bit format
usage:
   faToTwoBit in.fa [in2.fa in3.fa ...] out.2bit
options:
   -long          use 64-bit offsets for index.   Allow for twoBit to contain more than 4Gb of sequence.
                  NOT COMPATIBLE WITH OLDER CODE.
   -noMask        Ignore lower-case masking in fa file.
   -stripVersion  Strip off version number after '.' for GenBank accessions.
   -ignoreDups    Convert first sequence only if there are duplicate sequence
                  names.  Use 'twoBitDup' to find duplicate sequences.
```

### Convert the FASTA file
Run the below command.  Be sure to replace `input.fasta` with the fasta file you are attempting to convert.  Make sure you are in the same folder as your `input.fasta` file: if you are not, you will have to provide the relative or absolute path for the command to work!

`faToTwoBit input.fasta output.2bit`


### Convert GFF 

Biodalliance supports bigwig and bigbed.  

https://www.biostars.org/p/4070/

https://toolshed.g2.bx.psu.edu/repository/display_tool?repository_id=afcb6456d8e300ed&tool_config=%2Fsrv%2Ftoolshed%2Fmain%2Fvar%2Fdata%2Frepos%2F000%2Frepo_21%2Fgff_to_bed.xml&changeset_revision=5c6f33e20fcc


So we wrap GFF to BED.
Then BED to WIG.

>Step 1. Create a wig format file following the directions here. When converting a wig file to a bigWig file, you are limited to one track of data in your input file; therefore, you must create a separate wig file for each data track.
Step 2. Remove any existing "track" or "browser" lines from your wig file so that it contains only data.
Step 3. Download the wigToBigWig program from the binary utilities directory.
Step 4. Use the fetchChromSizes script from the same directory to create the chrom.sizes file for the UCSC database with which you are working (e.g., hg19).
Step 5. Use the wigToBigWig utility to create the bigWig file from your wig file:
