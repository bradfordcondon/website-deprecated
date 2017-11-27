

I wonder if Drupal development makes sense to experienced web developers, or if theres always something that seems to come out of left field.


### Add the js

### Add the thing

```{js}
   Drupal.behaviors.tripal_analysis_expression = {
              attach: function (context, settings) {
                var $ = jQuery;
                expNormal();
                $(document).on("tripal_ds_pane_expanded", function(event) {
                    if($(event.id).text().indexOf("Hover the mouse") > -1) {
                      expNormal();
                    }
                });
              }
            };
}
```