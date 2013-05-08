---
layout: post
title: "Tig: Great git command line tool"
date: 2013-05-07 20:28
comments: true
categories: [programming, git, links]
---
I have been using git on most of my hobby projects for quite some time. I prefer the command line when possible, however, it is nice to visualize certain operations. [SourceTree](http://sourcetreeapp.com/) and Github's [Windows](http://windows.github.com) and [Mac](http://mac.github.com) apps are very nice but I'm mostly on Ubuntu when using git. [Gitk](https://www.kernel.org/pub/software/scm/git/docs/gitk.html) is a decent option but sometimes tools such as this and the aforementioned GUI tools can be a bit over-the-top for a command line junkie such as myself. Something between the command line and full blown windowed GUI applications would be great; this seems to be where [tig](http://jonas.nitro.dk/tig/) comes in.

[Tig](http://jonas.nitro.dk/tig/) has been around for a little while now but it just came across my radar via [an excellent post on Atlassian's blog by Antoine Büsch](http://blogs.atlassian.com/2013/05/git-tig/) (as a side note, it's kinda cool to see this post on Atlassian's blog considering they make SourceTree). Antoine listed some compelling reasons for using tig but I was sold when he related tig to vim versus other development tools :)

To install tig on Ubuntu just open up a command line and run the obvious `apt-get install tig`. From there, navigate to a directory under source control (with git) and type `tig` -- you should see the main log view. Pressing 'h' will bring up help to see a list of available commands. You can stage changes by pressing 'c'. For a more exhaustive list of commands, check out [the official tig manual](http://jonas.nitro.dk/tig/manual.html).



