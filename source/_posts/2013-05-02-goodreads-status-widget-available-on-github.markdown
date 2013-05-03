---
layout: post
title: "Goodreads status widget available on github"
date: 2013-05-02 19:49
comments: true
categories: [goodreads, octopress, ruby]
---
[Goodreads](http://www.goodreads.com) is currently one of my favorite sites; I love that I can see what my friends are reading and find new books to read based on their recommendations. Noticing that many other blog platforms have sidebar widgets (asides), I decided to create one for Octopress. The first thing I did was make sure I was not duplicating effort. Goodreads has some great [sidebar widgets](http://www.goodreads.com/user/edit?tab=widgets), however, I preferred to generate the aside in the standard `rake generate` process (as well as keep the same look-and-feel of the other asides).

The Goodreads API is pretty robust but I was a little concerned about the possibility of a user's API key getting checked into github. Thankfully, Goodreads also provides an RSS feed for status updates -- which seemed a bit safer to use for publicly available code (and with the RSS feed it's not necessary to obtain an API key). I assumed that if someone didn't want their status updates public via RSS, they probably wouldn't be installing an aside to display their status.

I created an aside and a subsequent [liquid tags](https://github.com/Shopify/liquid/wiki) plugin that grabbed and formatted the RSS data. I used REXML to process the xml because it wouldn't require users to install additional gems. One thing I still need to figure out is how to pass data from the config.yml into the plugin via the aside. I realize I have access to the config properties via site.whatever  variables but I'm not entirely sure how to pass that info along to the tag plugin. Currently, the aside needs to be modified with the user's Goodreads unique id and the max number of results to display. I noticed some others on the [3rd party plugins list on the Octopress wiki](https://github.com/imathis/octopress/wiki/3rd-party-plugins) are doing the same thing, however, I would prefer to use the config file for the config data :P

All-in-all, it was pretty fun creating the plugin. If you use Octopress and would like to install the Goodreads plugin, [take a look at the github repo](https://github.com/ryanlanciaux/octo-goodreads-status).




