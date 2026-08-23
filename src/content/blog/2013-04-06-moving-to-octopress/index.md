---
title: "Moving to Octopress"
date: "2013-04-06T14:11:03.284Z"
path: "/blog/2013/04/06/moving-to-octopress/"
description: This post is about moving my site to Octopress (I have since moved to Gatsby)
---

Recently, it seems that the only time I've spent with my blog has been moving it to other platforms. Hopefully, that will change with the move to Octopress. Since this is mainly a programming / technical blog, I thought it would be great to host the blog with [Github pages](http://pages.github.com/). 

The Octopress install was pretty simple.. I mostly just followed the steps on the [Octopress Setup page](http://octopress.org/docs/setup/):

  1. Install Ruby / rbenv
  1. Install git 
  1. Clone the Octopress repo
  1. Export posts from Wordpress
  1. Convert the Wordpress xml file to Jekyll with [wpXml2Jekyll](https://github.com/theaob/wpXml2Jekyll)
  1. rake generate / rake deploy / git commit origin source (from the examples)

The part that gave me the most trouble was hiding legacy posts from the main page area. I wanted to keep some of the posts around for posterity but I didn't want them to show up with any sort of prominence on the blog. To that end, I created a folder called 'Legacy' and a folder within this newly created folder called '_posts'. From there, I moved the markdown versions of the posts into this folder. So far so good... 

When I fired up the preview for Octopress, the blog was still loading all the legacy posts in the content area. I asked a question on [Stack Overflow](http://stackoverflow.com/questions/15852698/octopress-custom-folder-for-old-posts) (that was subsequently shut down for not being programmy enough -- whoops) and tried a couple other things until I stumbled upon [this post](http://arshad.github.io/blog/2012/05/10/recipe-hiding-posts-from-the-octopress-front-page/) on Hiding Pages from Octopress. Making the suggested changes produced the results I was looking for. Mission Accomplished -- for now. I may try to change the 'Recent Posts' widget so it does not show legacy posts, however, that won't be an issue when there is more content.

So, as of this post, I've used all Octopress for all of one new article but I really like the workflow; storing the posts in github is definitely an added benefit. Hopefully, I will continue writing beyond this post but I guess we will see. 

