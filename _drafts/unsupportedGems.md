
I redesigned the landing page of my site, and wanted to host my blog posts at `/blog/index.html` instead of the main `index.html`.  In theory this should be possible, [but there are issues](https://github.com/jekyll/jekyll-paginate/issues/37).   Unfortunately, I could not get the default paginator to work properly at any location other than `/index.html`.
 
 I thought a simple solution would be to use a different gem: octopress-paginate.  This worked like a charm and easily supported paginating at `/blog/`... but, the site no longer built on Github pages!  This is because Github pages **only supports default jekyll gems**.  I looked into more advanced solutions involving [Travis CI](https://travis-ci.org/) (a fantastic tool which I plan on incorporating into my other projects) but for this blog, it was just too much.
 The alternative solution was to simply build the site myself locally and push that.  To do this, all I needed to do was...
 
 ## Change my repo name
 
 The [GitHub Pages documentation](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) states that any site hosted at `<username>.github.io` *must* be hosted off the `master` branch.  Host the page elsewhere to change the source.
 
 ## Change my GitHub Pages source from `master` to `/docs`
 
 Hosting off of a folder in our directory instead of the `master` branch lets me keep a build of my site in the same repo hosting the code.
 
 ## Set Jekyll to build to `/docs`
 
 In `_config.yml` we can change the default build location from `_site` to `docs`.  Now when we build our final site and push to `master`, GitHub Pages will use that build.