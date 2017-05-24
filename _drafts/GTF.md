---
layout: post
title: 'GTF (General Transfer Format)'
author: Bradford Condon
---



## GTF



GTF, also known as GFF (General Feature Format) 2.0, is the format for transcripts in exercise 4, **RNAseq**.
For more details, please see the [ensembl guide to GFF](www.ensembl.org/info/website/upload/gff.html).


Each feature takes up one line, with **9** columns per line (plus optional track definition lines).

### Columns

1. **seqname**  Chromosome or scaffold name.
2. **source** Database, project, or program name.
3. **feature**  Feature type (eg Gene)  
4. **start**  Start position
5. **end**  End position
6. **score**  
7. **strand** + (forward) or - (reverse)
8. **frame** 0, 1, 2
9. **attribute**  Tag "value" ; tag "value"


```
1 transcribed_unprocessed_pseudogene  gene        11869 14409 . + . gene_id "ENSG00000223972"; gene_name "DDX11L1"; gene_source "havana"; gene_biotype "transcribed_unprocessed_pseudogene"; 
```
In the above sample `GTF` file from ensembl, for example, the name is *(chromosome) 1*, the source is *transcribed_unprocessed_pseudogene*, the feature type is *gene*, the start-end is *11869-14409*, there is no applicable score (.), it's on the forward (+) strand, there is no frame data, and there are four attributes.  The first attribute, for example, is gene_name with the value *DDX11L1*. 

### Track lines

The optional track lines start with the word 'track', followed by space-seperated key=value pairs.
