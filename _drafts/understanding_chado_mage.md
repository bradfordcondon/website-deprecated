

In the process of upgrading the Tripal Analysis Expression module from Tripal 2 to Tripal 3 compatible, I had to learn a lot about the underlying data storage.  Tripal Analysis Expression uses the [Chado Mage](http://gmod.org/wiki/Chado_Mage_Module) module to store data.


### The Mage schema

>![The chado mage schema](assets/img/tripal/mage_schema.png)
>The Chado Mage schema as available [here](http://gmod.org/wiki/Chado_Mage_Module).  Red tables are mage tables.

Expression data is loaded as expression values from biosamples mapped to features.  It's a long road to go from a biosample (biomaterial in Chado language) to the expression value.  The expression value is stored in the *signal* column of `elementresult`.  This is linked through the `quantification`, `acquisition`,  `assay`, and `assay_biomaterial` tables to our end point of `biomaterial`.  


### Acquisitions, quantifications, assays, elements, and arraydesigns, oh my

Tripal 3


