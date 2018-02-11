http://gmod.org/wiki/Chado_Group_Module

Group tables that we are concerned with:

grp
grpprop
grpmembergrpmemberprop
analysisgrp
grpmbr_cvterm
grp_relationship
grp_relationshipprop
feature_grpmember

feature_group table


### Notes on Mara Kim's talk

ROkas lab
https://www.youtube.com/watch?v=Soam8O3g1jg&feature=youtu.be

Starts at 15:37

featuregroups


Hi Andy,

I believe the grpmbr table is useful because it reduces the number of tables.  For example, if there was no grpmbr table then to link an organism to a group you would need three tables: grp_organism, grp_organism_cvterm, grp_organismprop,  and those tables get repeatedly created for every data type that can be grouped.  So, to support grouping of features, organisms, stocks, libraries, analyses, pubs, studies, assays, and projects, it would require 27 new tables in Chado. For every data type that can be grouped we have to add an additional 3 tables.  With the grpmbr table we need grpmbr, grpmbr_cvterm, grpmbrprop, plus one linker table for each data type so for the example set above would require 12 new tables.  

The other benefit is that it helps clarify the meaning of table names. For example, if we want to associate an analy a group such that it describes an analysis that was performed using the group members then that table (following the example of the analysisfeature table) would be analysisgrp.  But suppose we also wanted to group a set of analyses, the linker tables would be grp_analysis.   So the table name of both puts the words in reverse order and it might be a point of confusion for some folks.  We have the same problem with the grp_pub and pub_grp tables (one for specifying a publication about a group and the other for grouping pubs).  By having the grpmbr table it's much easier to distinguish members of a group from annotations about the group.

Stephen