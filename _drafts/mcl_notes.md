Terms I had ot add to my sites 'Mainlab' CV:

Terms for loading the featuremap
```
drush mcl-add-cvterm genome_group
drush mcl-add-cvterm alias
drush mcl-add-cvterm analysis_method
drush mcl-add-cvterm software
drush mcl-add-cvterm map_type
drush mcl-add-cvterm population_type
drush mcl-add-cvterm population_size
drush mcl-add-cvterm source_url
drush mcl-add-cvterm comments
drush mcl-add-cvterm genome_group
drush mcl-add-cvterm cm
```

terms for loading the marker locations:

```
drush mcl-add-cvterm bin
drush mcl-add-cvterm start
drush mcl-add-cvterm stop
drush mcl-add-cvterm qtl_peak
drush mcl-add-cvterm char_name
drush mcl-add-cvterm chr_number
drush mcl-add-cvterm marker_locus
drush mcl-add-cvterm chr_name

```
the legacy relationship ontology MUST be loaded.


Manually add the term `marker_locus` to the sequence ontology.  I set the accession = `marker_locus`.




Terms for loading the markers:
```
drush mcl-add-cvterm marker_type
drush mcl-add-cvterm restriction_enzyme
drush mcl-add-cvterm product_length
drush mcl-add-cvterm max_length
drush mcl-add-cvterm min_length
drush mcl-add-cvterm is_codominant
drush mcl-add-cvterm repeat_motif
drush mcl-add-cvterm source
drush mcl-add-cvterm pcr_condition
drush mcl-add-cvterm screening_method
drush mcl-add-cvterm monomorphic_population
drush mcl-add-cvterm filename
drush mcl-add-cvterm indel_seq
drush mcl-add-cvterm legend
drush mcl-add-cvterm SNP_chip


```

In addition I need to add two databases:


* dbSNP
* DB:genbank


looks like the loader REQUIRES that the marker be of type marker, QTL, or MTL.  I dont have a term for "Genetic marker" though.





```
select * from chado.cvterm where cvterm_id = 1908;
1908	9	genetic_marker	A measurable sequence feature that varies within a population. [SO:db]	2448	0	0
```


rerunning a job:

`drush mcl-rerun-job 1 /Users/chet/UTK/tripal/sites/default/files/mcl/user/admin/3/files/test1map.xlsx --working_dir=/Users/chet/UTK/tripal/sites/default/files/mcl/user/admin`

note `drush mcl-run-job` always fails, silently.

```
drush mcl-rerun-job 4 ~/UTK/Data/mainlab/mcl_template_map_position_test1.xlsx
```


```sql
  SELECT F.uniquename as marker_locus_name, F.feature_id as marker_locus_id, F2.uniquename as genetic_marker_name,
  C1.name as map_unit_type, FPR.value as marker_type, FM.name as map_name, FM.featuremap_id as map_id, FMP.value as map_type,
  F3.name as linkage_group, F3.feature_id as linkage_group_id, FPP.value as marker_pos, C.name as marker_pos_type,
  O.organism_id as organism_id, O.genus as genus, O.species as species, O.common_name as common_name
  FROM {feature} F
  INNER JOIN {feature_relationship} FR 	ON FR.subject_id = F.feature_id AND
    F.type_id = (SELECT cvterm_id  FROM {cvterm} WHERE name = 'marker_locus' AND
    cv_id = (SELECT cv_id FROM {cv} WHERE name = 'sequence')) AND
    FR.type_id = (SELECT cvterm_id  FROM {cvterm} WHERE {cvterm}.name = 'instance_of' AND
    cv_id = (SELECT cv_id FROM {cv} WHERE name = 'relationship'))
  INNER JOIN {feature} F2               	ON FR.object_id = F2.feature_id AND
    F2.type_id = (SELECT cvterm_id FROM {cvterm} WHERE name = 'genetic_marker' AND
    cv_id = (SELECT cv_id FROM {cv} WHERE name = 'sequence')) AND
    FR.type_id = (SELECT cvterm_id FROM {cvterm} WHERE name = 'instance_of' AND
    cv_id = (SELECT cv_id FROM {cv} WHERE name = 'relationship'))
  INNER JOIN {featurepos} FP            	ON F.feature_id = FP.feature_id
  INNER JOIN {featureprop} FPR          	ON FPR.feature_id = F2.feature_id AND
    FPR.type_id = (SELECT cvterm_id FROM {cvterm} WHERE name = 'marker_type' AND
  	cv_id = (SELECT cv_id FROM {cv} WHERE name = 'MAIN'))
  INNER JOIN {featuremap} FM    		ON FM.featuremap_id = FP.featuremap_id
  INNER JOIN {cvterm} C1                ON C1.cvterm_id = FM.unittype_id 
  INNER JOIN {featuremapprop} FMP       ON FMP.featuremap_id = FP.featuremap_id AND
   FMP.type_id = (SELECT cvterm_id FROM {cvterm} WHERE name = 'map_type' AND 
   cv_id = (SELECT cv_id FROM {cv} WHERE name = 'MAIN'))
  INNER JOIN {featuremap_organism} FMO 	ON FMO.featuremap_id = FM.featuremap_id
  INNER JOIN {feature} F3 				ON FP.map_feature_id = F3.feature_id
  INNER JOIN {featureposprop} FPP 		ON FPP.featurepos_id = FP.featurepos_id
  INNER JOIN {cvterm} C 				ON C.cvterm_id = FPP.type_id
  INNER JOIN {organism} O 				ON FMO.organism_id = O.organism_id
  
  ```

  confirmed bits:

### checking the terms:


  `select cvterm_id from chado.cvterm where name ='map_type' AND cv_id = (SELECT cv_id from chado.cv WHERE name = 'MAIN');` : 55486

  `select cvterm_id from chado.cvterm where name ='marker_type' AND cv_id = (SELECT cv_id from chado.cv WHERE name = 'MAIN');`

  select cvterm_id from chado.cvterm where name ='genetic_marker' AND cv_id = (SELECT cv_id from chado.cv WHERE name = 'sequence');

  these all appear to work.

  