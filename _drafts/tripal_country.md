---
title: "Travels in Tripal Country: A Developer's FieldGuide"

---

# Introduction

Travels in Tripal country.

I am not a developer by training, originally.  I am a geneticist.  I recognize the boundaries of my expertise.  I am not the world's foremost expert on Drupal, or Tripal, or database programming.

I am, however, a man who has spent the past year learning Tripal 3.

Rather than presume to write the guide on Tripal (which I am not skilled enough to do), I would like to share my travel notes with you as I explore the new features and paradigms of Tripal 3.
  


# The basics

* Drupal
* Tripal
* CHADO
* Classes in PHP

# The Entity

A critical shift in Drupal 8 is the conversion of entities to nodes.  Tripal Prepares for the Drupal 8 conversion by changing Tripal **nodes** to Tripal Entities.

You can learn more about Drupal entities [here]().

### Entities vs nodes

One of the fundamental changes between Tripal 2 and Tripal 3 is the entity.  

In ye olde days of Tripal 2 development, content was based around nodes.  Every base table in table corresponded to a node type: Analysis, Organism, Feature, Map, etc.  Some Chado tables could map to multiple nodes: which node would depend on either a column in the Chado table (such as the type column in feature [TODO DOUBLE CHECK THAT]) or on a property in the linker table (such as the `analysis_type` property in the analysisprop table, describing an analysis).


The TripalEntity... changes none of that.  An entity maps to a Chado table just like a node does.  Multiple entity types can map to the same Chado table using a type column or a prop.

What entities do allow is more site administrator control of how entities look on the site.  Inserting data into the database and creating the content type is easier, too.  Before, you had to hook into node create, edit, and delete for each content type.  Now, bulk loading of data is handled by extending the `TripalLoader` class.  I personally love this class: you gain access to a user-friendly file uploader, as well as database transactions, for free.  If you're converting old code, the actual Drupal can remain more or less unchanged.

If you're thinking in terms of Chado, then you can learn that all entities are actually the same type, `TripalEntity`, and then promptly forget it.


#### Simplified

* Before, nodes handled loading your data into Chado or database of choice, editing, deleting, as well as viewing the content.
* Bundles and fields distribute that job.
* TripalLoader handles bulk-loading data. Bundles handle creation of single entities.
* Bundles are just aggregates of fields.
* Rather than doing everything, the bundle delegates the creation, editing, and display of each individual piece of data to a field.

The most important thing I can tell you is this: before you create a field, make sure 
* the field doesn't already exist
* the field you want wouldn't better be handled by a Chado property



### What are bundles and fields?  

* A bundle is a collection of fields.
* A bundle defines a particular entity type.
SOME MORE DEFINITIONS.

When defining a bundle, you'll want to write a field for **each column** of the Chado base table that doesn't already exist. I'll write about fields in-depth in another post, but for now, please consider using the Tripal Fields Generator written by myself and Abdullah Almsaeed.  I spent my first couple of days hacking through the Tripal jungle going in circles because of typos and inconsistencies in my Fields files: the Field Generator tool will fill everything out for you.

### Web services

It's worth noting that Tripal 3 also provides **web services** for entities.  Because entities and their fields are strongly typed, the site can be browsed by a computer traversing linked entities (essentially JSON).  In the future when databases are more interconnected, and computers are able to more intelligently mine data from sites, Tripal databases will be ready to share and describe all of their data.



# Fields

How to create a field:

## What about the GUI?

The GUI for field generation is quite good, and for something basic you may not need to code your field at all.

## What is an appropriate CVterm for my field?

Start with the EBI Ontology Lookup Service.  Don't rush this step.  If you're really stuck, post on the Tripal Github or Slack and the community will help weigh in.  It's easy to take shortcuts as this step, but properly termed fields will result in **more web accessible** websites that can **share and connect easily**.  If everyone uses `local` terms, or different obscure terms, to describe the same thing, then we lose the benefits of web services.


## Where is the data for this field stored?

### The chado base table

### The property table

If the answer is the props table, stop writing your field.  Use the GUI.  If you want to hardcode your field as a props, you actually don't need to do anything except add the property to a record.  If there is a record with the property and you press the `check for new fields` button, the property will magically show up as a field.

### A linker table

Writing a good linker field is hard and probably beyond me.  You can see an example linker table I wrote **here**: it's not very flexible and only designed to link two bundles.  Tripal comes with a few linker table fields that are much more flexible, and I recommend looking at these examples to code in their footsteps rather than my own.

### Somewhere else

Shrug?  If it's something basic like a text description, it goes in... (some table i dont know about?)

If its something more involved... let me ask, why can't it fit in Chado?
Maybe your module needs to define a new Chado schema and store it in a new table.  Maybe an existing module already created the table you need, or a table can be re-purposed for your needs.  While adding new tables to Chado isn't something you should do lightly, it's also something you should do if Chado can't hold the biological data you need!


## Fields: anatomy of a field

Every column that is exposed to the user in a Chado table needs a field.
Additionally, every piece of information that you want served to users when visiting an entities' page needs a field.  How the field is displayed to your users is handled by the `field_formatter`.  The site administrator can customize the grouping and layout of fields, which I'll talk about in another section.

### Quickstart: defining a field

* pick a CVTerm.  Make sure you've got the accession, DB, and CV values straight.
* Create the field file trinity of `local__fake_field.inc`, `local__fake_field_formatter.inc`, `local__fake_field_widget.inc`
* Declare & attach your field in your modules `fields.inc`
* Clear your cache.  `drush cc all`.  
* Enable your field in the target bundle at `admin->structure->Tripal content types`.
 - Check for new fields by clicking the big blue **+ Add new fields** link in the upper left.  If all went well, you should see a message that your field was added.  If not, check your code, clear your cache, and try again.
 - Your field is *disabled* by default.  To enable it, click on 

You can't clear your cache too often when working with fields.  Well, you can, because clearing the cache and then rebuilding the site is quite slow.  But if you're getting frustrated, keep calm and clear your cache.  `drush cc all`.

### Background Summary

* Like Bundles, each Field must be uniquely associated with a CVterm.
* Fields for your module live in `/includes/TripalFields`
* Individual fields can be added to your sites library folder, if the libraries module is enabled.  Fields can then live in `/sites/all/libraries/TripalFields` but I haven't gotten this working yet.
* Your module declares and attaches fields to Bundles in your module's `fields.inc` file, located in `includes/[module_name]_fields.inc`

### Field Files

* `local__fake_field.inc`
 - Sets default values for the field, like the label and description.  Declares the formatter and widget to use.  Sets the *instance settings* which declare where the field's data is stored.
 - The critical method is `load($entity)`.  The entity refers to the *bundle*, and tells the field how to load data for this entity.  So the `species name` field, when attached to organism, looks in the appropriate column in the `organism` table for the given entity by looking up its `record_id`.  
 - Load doesn't need to return anything, it should set `$entity->{$field}['und'][0]` with a value.  This value also is held by web services! If the field should be empty, set this to null.
* `local__fake_field_formatter.inc`
 - Formats the field value for display.  Optional.
* `local__fake_field_widget.inc`
 - provides an input widget when manually creating a bundle where the field is attached.  Optional.

You can make a general formatter that gets used directly by multiple fields, or that is extended by other formatters.

### Telling Tripal about your field
Once your field is coded, (or realistically, once you've created your blank stub that does nothing), you are ready to tell Tripal about your field.  This happens in two places in your module's `fields.inc` file.

#### `tripal_biomaterial_bundle_fields_info()` 
This method implements `hook_bundle_fields_info`.  In the below code you'll see that the implementation of this hook means a) checking if the field is appropriate for the bundle by looking at `$bundle->data_table`, which is the bundle's Chado base table b)inserting the CVterm used by the field, and c) setting the field storage settings.  Make sure you return your `$fields` array.

```php

<?php

  if (isset($bundle->data_table) AND ($bundle->data_table == 'organism' || $bundle->data_table == 'analysis')) {
    // First add my term.
    tripal_insert_cvterm([
      'id' => 'sep:00195',
      'name' => 'biological sample',
      'cv_name' => 'sep',
      'definition' => 'List of biomaterials related to an organism',
    ]);

    // Then describe the field defined by that term.
    $field_name = 'sep__biological_sample';
    $field_type = 'sep__biological_sample';
    $fields[$field_name] = [
      'field_name' => $field_name,
      'type' => $field_type,
      'cardinality' => 1,
      'locked' => FALSE,
      'storage' => [
        'type' => 'field_chado_storage',
      ],
    ];
  }

  return $fields;

```

  Because we're talking about chado fields, the `$fields` array will always follow the above form, with the name changing with the field.  You might want to change the cardinality if it makes sense for your field to hold multiple values for a single entity, or to `locked` if it doesn't make sense for users to mess with your field.


#### `tripal_biomaterial_bundle_instances_info($entity_type, $bundle)`

The previous hook told *bundle types* about your field: this hook will tell *bundle instances* about it.  Other than that I haven't used it for anything fancy beyond the below example code.  Make sure you remember to return your `$instances` array.


```
function tripal_biomaterial_bundle_instances_info($entity_type, $bundle) {
  $instances = [];
  if (isset($bundle->data_table) AND ($bundle->data_table == 'organism' || $bundle->data_table == 'analysis')) {
    $field_name = 'sep__biological_sample';

    $description = "List of biosamples associated with this" . $bundle->data_table;

    $instances[$field_name] = [
      'field_name' => $field_name,
      'entity_type' => $entity_type,
      'bundle' => $bundle->name,
      'label' => 'Biosample Browser',
      'description' => $description,
      'required' => FALSE,
      'settings' => [
        'auto_attach' => FALSE,
        'chado_table' => $bundle->data_table,
        'chado_column' => $bundle->data_table == 'organism' ? 'organism_id' : 'analysis_id',
        'base_table' => $bundle->data_table,
      ],
      'widget' => [
        'type' => 'sep__biological_sample_widget',
        'settings' => [],
      ],
      'display' => [
        'default' => [
          'label' => 'hidden',
          'type' => 'sep__biological_sample_formatter',
          'settings' => [],
        ],
      ],
    ];
  }
  return $instances;
}
```


### Attaching a field to multiple bundles

You'll notice that many of the default Tripal fields can attach to multiple bundles.  What magic is that?  To perform the same feat, you must code your field to be bundle agnostic, or at least bundle-flexible.  




# Field methods


## Load

The record is what we're attached to.  There's going to be a protocol_id column.  The protocol can be that object, and we'll have access to everything in the protocol table because its a foreign key.
In general, we'll see get the stuff that is NOT NULL in our linker field.

```

    $protocol = $record->protocol_id;

// our field is going to be cautious and just display the NOT NULL columns
    $protocol_id = $protocol->protocol_id;
    $protocol_name = $protocol->name;
    $protocol_type = $protocol->type_id;

```

Now that we've done that: we need to get the keys we're going to associate it with.

for our label, we can just use rdfs:label.
Otherwise we'll use `tripal_get_chado_semweb_term` to get the term, and that put that term in the **field array**.


```

    $label_term = 'rdfs:label';
    $type_id_term = tripal_get_chado_semweb_term('protocol', 'type_id');

    $entity->{$field_name}['und'][0]['value'] = [
      $label_term = $protocol_name,
      $type_id_term = $protocol_type
    ];

    // Is there a published entity for this protocol?
    if (property_exists($record->{$field_column}, 'entity_id')) {
      $entity->{$field_name}['und'][0]['value']['entity'] = 'TripalEntity:' . $record->{$field_column}->entity_id;
    }
```


### ElementsInfo

The cliffnotes:

Everything that went into our field above needs to have an element info entry.


 *elementInfo* gives you the opportunity to describe every COLUMN of the array of ELEMENTs your field will return.
So if your field is a linker field of some sort (ie organism field thats going to attach to stuff) then you want elementinfo to correspond to every column of the organism base table.



```

    Provides the list of elements returned by the 'value' of the field.
   
    The elements provided by this function are used to integrate with
    Drupal Views and Web services.  The return value is an associative array
    that contains all of the elements that will be returned by the
    'value' of this field. If the value field returns an element which
    is not defined here a warning will be generated.
   
    The array structure should contain at the top-level a key of the form
    {db}:{accession}. This represents the term that this field belongs to.
    The value of this top-level key is an array with the following keys:
      -name: this key is not actually used but is availble to improve
        readability of the array.  Because the key is a vocabulary term
        conaining only the accession it's not always clear what it means.
        Providing a 'name' key helps other's know what the term is.
      -searchable:  TRUE if the element can be used for filtering the content
        type to which tis field is attached.  FALSE if not.
      -operations:  an array of filtering operations that can be used for this
        field.  These include: 'eq', 'ne', 'contains', 'starts', 'gt', 'lt',
        'gte', 'lte'.  These opertaions are applicable to strings: 'eq', 'ne',
        'contains', and 'starts'.  These operations are applicable for numeric
        values: 'gt', 'lt', 'gte', 'lte'.
      -label: The label (if applicable) to appear for the elmeent. The default
        is to use the term's name.
      -help: Help text (if applicable) to appear for the element. The default
        is to use the term's definition.
      -type: The data type: e.g. 'string' or 'numeric'. Default is 'string'.
      -sortable: TRUE if the element can be sorted.  FALSE if not.
      -elements:  If this field value is a simple scalar (i.e. string or
        number) then this key is not needed. But, if the 'value' of the
        field is an array with sub keys then those subkeys must be defined
        using this key.  The members of the element array follows the same
        format as the top-level key and the above subkeys can be used as well.
   
    The following code provides an example for describing the value elements
    of this field.  The Tripal Chado module provides an obi__organism field
    that attaches organism details to content types such as genes, mRNA,
    stocks, etc.  It provides a label containing the full scientific name of
    the organism as well as the genus, species, infraspecific name,
    and infraspecific type. If the organism to which the field belong is
    published then an entity ID is provided.  The following array describes
    all of these.

```

### Query

Query 

###  Query Order