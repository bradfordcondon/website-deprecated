---
layout: post
title: "creating synteny mappings"
excerpt_separator: <!--more-->
---

# Goal

The primary goal here is to create a track of synteny mappings for all genomes for jbrowse.  Any number of synteny calculations could work.

 * Mummer
 * i-adhore 3.0


# Mummer
This module will allow converting nucmer coordinates to a gff file.  https://metacpan.org/pod/distribution/Bio-Gonzales/bin/coords2gff.pl



# i-adhore


The software can be downloaded [here](http://bioinformatics.psb.ugent.be/webtools/i-adhore/licensing/).

Reference

>Proost, S. et al. i-ADHoRe 3.0—fast and sensitive detection of genomic homology in extremely large data sets. Nucl. Acids Res. 40, e11–e11 (2012).

## Installation and set up

```
tar -xzvf i-adhore-xxx.tar.gz
cd i-adhore-xxx

mkdir build
cd build
cmake .. -DCMAKE_INSTALL_PREFIX=usr/local/bin/i-adhore
make
sudo make install
```

Unfortunately make fails 

```

[  9%] Building CXX object src/alignment/CMakeFiles/alignment.dir/GGAligner.cpp.o
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/GGAligner.cpp:1:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/GGAligner.h:6:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/Aligner.h:5:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/../GeneList.h:7:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/../headers.h:30:
/Users/chet/Downloads/i-adhore-3.0.01/src/alignment/../datastructures/stringhash.h:15:11: error:
      use of undeclared identifier '__stl_hash_string'
        { return __stl_hash_string(s.c_str()); }
                         ^
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/GGAligner.cpp:1:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/GGAligner.h:6:
In file included from /Users/chet/Downloads/i-adhore-3.0.01/src/alignment/Aligner.h:6:

```
Possible solution: https://github.com/Kentzo/armv6-rpi-linux-gnueabihf/issues/5

`brew install gcc` will be very slow, so instead we try `brew install gcc48`.

if this doenst ork
need to tell cmake to use a specific compiler

```
export CC=/usr/local/bin/gcc
export CXX=/usr/local/bin/g++ ##  4.8 wahtever , find path
export CXX=/usr/local/Cellar/gcc@4.8/4.8.5
cmake /path/to/your/project
make
```
`/usr/local/Cellar/gcc@4.8/4.8.5`

## Other solution from Neil


`/Users/chet/Downloads/i-adhore-3.0.01/src/alignment/../datastructures/stringhash.h:15:11: error:`

In the above file,
change `__stl_hash_string(s.c_str())` to `std::hash(s.c_str())`


We create a script that runs i-adhore with a new tmp directory: `TMPDIR=/tmp i-adhore`.  The script also must pass arguments to the command.

```
#! /bin/sh
TMPDIR=/tmp
exec /usr/local/bin/i-adhore_3.0/bin/i-adhore  $1
```


## Sibelia

[Project page](http://bioinf.spbau.ru/sibelia)

