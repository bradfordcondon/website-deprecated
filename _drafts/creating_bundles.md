---
layout: post
title: "Creating Tripal Bundles"
excerpt_separator: <!--more-->
---

The function `tripal_chado_chado_bundle_schema()` tells us all we need to know to create more advanced Tripal Chado bundles.



CREATE TABLE HERE INSTEAD:

```
      'type_linker_table' => array(
        'description' => 'If a linker table (e.g. cvterm/prop) is needed to uniquely identify a content type then that table name is provided here.',
        'type' => 'varchar',
        'length' => 128,
        'not null' => FALSE,
        'default' => '',
      ),
      'type_column' => array(
        'description' => 'The column in the data table or linker table that distinguishes the data type. This must be in a foreign key relationship to the cvterm table.',
        'type' => 'varchar',
        'length' => 128,
        'not null' => FALSE,
        'default' => '',
      ),
      'type_id' => array(
        'description' => 'If a type_column is set then this is the cvterm_id of the data type that this bundle maps to.',
        'type' => 'varchar',
        'length' => 128,
        'not null' => TRUE,
        'default' => '',
      ),
      'type_value' => array(
        'description' => 'If a property table is used for a linker, then the value that should be matched to identify this content type is stored here.',
        'type' => 'text',
        'not null' => FALSE,
        'default' => '',
      )
 ```