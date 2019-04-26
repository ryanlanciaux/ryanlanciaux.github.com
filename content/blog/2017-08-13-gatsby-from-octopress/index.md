---
title: "Migrating to Gatsby from Octopress"
date: "2017-08-13T05:54:03.284Z"
path: "/blog/2017/08/13/migrating-to-gatsby-from-octopress/"
---

Octopress is an awesome blogging platform that has served me well for quite some time but recently I've migrated to Gatsby ([since it is built with a tech stack I frequently use](/blog/2017/08/12/blogging-with-gatsby/)). The steps I've taken to do this are as follows: 

1. Setup Gatsby for blogging [See here](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/)
1. Move posts from Octopress `/_posts` into the gatsby project in their own folders. Something like `/src/pages/2017-08-...`
1. Rename each post from whatever.markdown to index.md
1. Update the timestamps in the posts' frontmatter from `date: 2013-04-06 14:11` to something like `date: "2013-04-06T14:11:03.284Z"`
1. Move each post image from a global, shared image directory to the same directory as the post that references the image. Update the image path in the post.

I was then able to run `gatsby develop` and see my posts. Unfortunately, I had a little trouble with my images -- they were being referenced by gatsby and appeared to be output to the browser but were not showing up. Thankfully, some folks in the Gatsby channel in [Reactiflux](https://www.reactiflux.com/) suggested adding the following CSS:

```css
.gatsby-resp-image-wrapper[style] { 
  z-index: 0 !important;
}
```

With this addition, my site was up-and-running as expected!