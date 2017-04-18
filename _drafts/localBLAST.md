---
style: post
title: Installing and running BLAST locally
tags: UK-BLAST, genomics, bioinformatics
---



# Using BLAST remotely
Do you still have the ABC transporter protein we downloaded in the last excercise?  If not, go back to genbank and download protein ELQ65981, our ABC transporter protein from Magnaporthe oryzae.
 
![](/assets/img/BLASTremote/rblast2.png)

# Installing BLAST locally
There are many reasons to prefer a local installation of BLAST to using the webserver.  As your dataset scales up and up, automating the process becomes more important.  For example, you may want to retrieve the top BLAST hit for every sequence in a newly sequenced organism.  THis is something you can do with a local BLAST installation! Another common application for this will be to search just our organism of interest (instead of all of the sequences known to science in GenBank).  Continuing with our example, let's assume we're interested in all the ABC transporters found in *M. oryzae* strain P131.
Full documentation on running command line BLAST can be found here at the online BLAST manual.

### Download and install BLAST
If you are working on a machine maintained by an administrator (such as a lab computer), you likely will not have to download and install BLAST yourself.  If you are using your own machine, installing your first command-line program can be a headache with a steep learning curve, but it's a valuable rite of passage for young computational biologists. 

>* If BLAST is already installed, or you are working on a lab machine, **SKIP BELOW to "Run a Local -> Remote BLAST Search"**
* Try to download the latest version of BLAST, [available here](ftp://ftp.ncbi.nlm.nih.gov/blast/executables/blast+/LATEST/).  There are versions for each individual operating system (for example, win64 or macosx).  If you download the version that matches your OS, the program should execute without further setup.  However, the source version will work on all machines, once it is compiled.  Installing from source will be a very helpful thing to learn, but may require installing additional tools and in general can be challenging for newcomers.
* Ask for help if you are having problems!

### Run a Local → Remote BLAST Search

In this section we will perform a blast query with our protein ELQ65981.1
 
Use your locally installed blastp program to search the NCBI database using the  ELQ65981.1 query file with the below command.

`blastp –db nr –query [INPUT FILE] –out output.blast –evalue 1e-20 –outfmt 1 –remote`


BLAST takes several parameters here:


```
-db:	specifies the database to be searched (we will use the NCBI “nr” database)
-query:	specifies the local query sequence file (full path required)
-out:	name of output file
-evalue:	tells program to only report matches with ≤ specified value
-outfmt:	specifies format of output (values can range from 0 to 11). Possible formats are listed below:
0 = pairwise
1 = query-anchored showing identities
2 = query-anchored no identities
3 = flat query-anchored, show identities
4 = flat query-anchored, no identities
5 = XML Blast output
6 = tabular
7 = tabular with comment lines
8 = Text ASN.1
9 = Binary ASN.1
10 = Comma-separated values
11 = BLAST archive format (ASN.1)
-remote:	tells the program to search a remote (NCBI) database
```

To examine the BLAST output, use the command `less [file]`.

### Initialize a local BLAST database
The first step in running a custom BLAST is setting up your database.  This will be the set of sequences you search against.  When we ran BLAST on the webserver, this meant the genbank nonredundant protein set (which, if we wanted to, we could download and run locally).  Today, we'll start with the protein catalogue of M. oryzae Y34.
>If you haven't already, copy your protein database to a folder where you will keep your BLAST databases. The below command moves and renames this database on my computer- be sure to modify your PATHs to suit your environment.
  
```
$ mkdir databases/
$ mv GCA_000292585.1_MoY34_2.0_protein.faa databases/Moryzae_Y34.faa
```



To initialize a database, we use the `makeblastdb` command.  
> * Run `makeblastdb` with the help flag to learn about usage. Remeber that a flag is added after the command name with a hyphen: `command -flag`
* Run `makeblastdb` with the appropriate arguments.  For now, let's only use the input and dbtype arguments, leaving all others with their default settings.
>
>`makeblastdb -in  [your database here] -dbtype [nucl or prot]`
>
>* Run `ls` to confirm the database exists.

If the command was successful, there will now be three new files, ending in `.pin, .psq,` and `.phr`.  These combined with your `.faa` file are all your database needs to run!

>Try creating a database for your nucleotide assembly.
Remember to change the value after your dbtype flag!

 
### Configure your BLAST database location

Instead of providing the full blast database path every usage, we can tell BLAST where to look for your custom database with an `.ncbirc` file.

>Use the a text editor to create a file named .ncbirc (yes, the prefix period should be included) inside your home directory.  Here’s a good example where a Word document will not work. The file should contain the text:
`[BLAST] BLASTDB= [PATH TO YOUR DATABASES]`

### Query your BLAST database

Because we created a protein database, we can search it using the blastp (with a protein query) and blastx (with a nucleotide query) commands.   
>Read through the options for running blastp by using the -help flag.  

That's a lot of information.  Let's run the most basic possible search with all default parameters.  We need to specify the query file and the database.  Notice below I provide the absolute PATH to my query file, and I work in a folder called "working".  I don't need to supply the PATH for my database, because I set up my `.ncbirc` file above. 

> * Run blastp with default parameters
>
>`blastp -db Moryzae_Y34.faa -query /Users/chet/working/query_ABC.fasta`
> * To save the output to a file, use the symbol `>` at the end of the line of code.  This redirects the output to a file.
> 
>`blastp -db /Users/chet/databases/protein/Moryzae_Y34.faa -query /Users/chet/working/query_ABC.fasta > ABC_output_1.blast`
 
I use the `.blast` extension so I know these are blast results.  Your computer may not know what to do with this extension, but it can be opened in a basic text editor.


>* Open and scan through the BLAST output summary at the top of the file.  What is the best BLAST result?
* Think about the additional BLAST results.  Which results do you think are also ABC transporters?  Remember that ABC transporters use ATP to move molecules across membranes.
* Look at the bit score and e-values of your results.  Is there a value where the results are probably not ABC transporters?

It's important to recognize we are only using a single sequence as a query.  BLAST supports multiple query sequences in a single FASTA file, meaning you can search thousands of sequences against a database.  Try doing that using the web browser, and you'll be copy-pasting each sequence all day!  Command line BLAST lets you perform these large-scale analyses effortlessly!

## Improving our BLAST parameters
Using this simple program, we have a list of candidate ABC transporters in this strain's genome.  There are many ways we could improve this analysis.  For example, we can set an e-value cutoff to exclude results greater than a certain evalue.  Remember that "big" evalues are worse (meaning more likely to be due to random chance), and that 5e-78 is really really small.   

>Use the -evalue flag to exclude hits above a certain value (the cutoff you noticed in the previous question).

`blastp -db /Users/chet/databases/protein/Moryzae_Y34.faa -query /Users/chet/working/query_ABC.fasta -evalue [YOUR_CUTOFF] > ABC_output_2.blast`
 
Sometimes, you want don't want this complicated BLAST report, and want to simplify the BLAST output.  This is done with the -outfmt flag. You can read more about this flag here.
> * Run your BLAST with the simplified outfmt tag set to 6.

`$ blastp -db /Users/chet/databases/protein/Moryzae_Y34.faa -query /Users/chet/working/query_ABC.fasta -outfmt 6 > out3.txt`

> * Look at the resulting output file.  Frustratingly there are no column headers.  What do you think each column stands for? 
>A cheat-sheet for these columns is [available here](http://www.drive5.com/usearch/manual/blast6out.html).

>Try running your blast with other values for -outfmt [1-12].  Make a note of which outputs look useful.

