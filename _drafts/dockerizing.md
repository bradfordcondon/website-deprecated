---
layout: post
title: "Dockerizing your environment"
excerpt_separator: <!--more-->
---


For a long time, I've been using Homestead to set up my web developer environment.  It's easy to set up, and most importantly, I could understand where my files were.

The problem is that as a novice developer, I make mistakes, a lot.  I insert all sorts of junk into my database writing new code, and after a few months, I need to destroy my machine and start over.  To recreate a Tripal site, I need to reinstall Drupal, Tripal, all of my modules, and then re-load data.  After the second time I knew I had to implement a different solution.  I had to figure out this Docker thing.

![Docker logo](https://www.docker.com/sites/default/files/vertical_large.png)


You can find the final, pre-loaded developer image [here](https://hub.docker.com/r/bcondon/docker_tripal3/).

<!--more-->


# Dockerizing as simple as possible.

My big realization is that you **dont have to use a DockerFile and start from scratch to create an image**.  If like me you aren't yet a savvy systems administrator, I would recommend starting from an existing container that does **almost everything you want**.  Because I'm running a Tripal site, there are two fully-functional containers to choose from (I used (Ming Chen's Tripal 3 container)[]). I tried, and failed, to set up an environment with docker compose hosting several services starting from the base Ubuntu images.  In hindsight, I bit off more than I could chew.  I need to get something running and tinker with it, not build a complex system from scratch knowing nothing.

To get started, simply run a container with `docker run`, make some changes to it, and then commit your new, modified copy.  Hopefully the repo you are starting from provides some basic instructions for using the image.  For example, the instructions for our starting Tripal 3 container are `docker run -it -p 8080:80 mingchen0919/docker-tripal-v3 /bin/bash`.

  After running the container, fiddle around and set up your environemnt a bit more.  IN my case, I wanted to load some organisms, sequences, install some modules and themes, etc.  Once you're happy, save the new container so you can start from a freshly set up environment!  First, set up an account and repo [on Docker hub](https://hub.docker.com/). Then use `docker commit` to save your image.
```
#docs
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
#an example commit
docker commit my_test_container [bcondon/test_image]
```
Then just use docker push to put the image on Docker Hub.  With our example, we would execute `docker push bcondon/test_image`.  

That's it.

The next time I want to run my container, I simply replace the Dockerhub URL i started with.  `docker run -it -p 8080:80 mingchen0919/docker-tripal-v3 /bin/bash` becomes `docker run -it -p 8080:80 bcondon/test_image /bin/bash`.  

Learning more and setting up my own image from scratch exactly how I want it comes next.  Getting started, however, is priceless.