---
layout: post
title: "Sublime Text on Ubuntu"
date: 2013-04-13 18:42
comments: true
categories: [sublime text, development, ubuntu]
---
Recently, I have switched from Windows 8 to Ubuntu on my laptop. Since the primary function of my laptop is development I have spent some time tweaking the software installed to fit my workflow.

The main tool I am using for all my development is [Sublime Text](http://www.sublimetext.com/). I like Sublime Text for many reasons -- it's lightweight, great community, tons of plugins and most importantly, **vim keybindings**; needless to say, it's pretty awesome.

To start with, I installed the package like so: `apt-get install sublime-text`. From there, I pretty much followed
[Alex MacCaw's excellent post on Sublime Text](http://blog.alexmaccaw.com/sublime-text). Mentioned in the post, [Package Manager](http://wbond.net/sublime_packages/package_control) is pretty much a must. As someone who has grown pretty dependent on ReSharper when doing .NET development, I find myself typing Ctrl + Shift + T to switch files (rather than the default Ctrl + P -- which, to me, seems a little weird because doing that in different environments brings up print dialog)

```
{ "keys": ["ctrl+shift+t"], "command": "show_overlay", "args": {"overlay": "goto", "show_files": true} }
```

Finally, since I will be writing most of my blog posts with Sublime Text (yea, this post about Sublime Text was written in Sublime Text :P), I installed [Markdown Preview](https://github.com/revolunet/sublimetext-markdown-preview) through package control. If you notice the statement on the GitHub page, Linux users need to install a different version of Python to get the plugin to work. I wasn't super comfortable changing Python just for installing the Markdown plugin. Thankfully, [one of the comments on the plugin's GitHub](https://github.com/revolunet/sublimetext-markdown-preview/issues/27#issuecomment-11772098) page has a pretty decent walkthrough on how to use pythonbrew to give Sublime Text the version of Python that the plugin needs (without necessarily using it throughout the system).

Now, I only wish there was a way to open up a console directly in Sublime Text -- because alt tabbing to terminal is just so difficult.


