---
layout: post
title: "Less alt+tab with SublimeText"
date: 2013-05-09 20:40
comments: true
categories: [sublime text, plugins, ruby, node]
---
[Back in April](http://ryanlanciaux.github.io/blog/2013/04/13/sublime-text-on-ubuntu/), I jokingly lamented not having the ability to run a console from directly within SublimeText -- apparently I did not do quite enough searching. There is a plug-in called [SublimeREPL](https://github.com/wuub/SublimeREPL) that lets you run ruby, node and a whole slew of other environments from within SublimeText.

**To install SublimeREPL**:

1. Fire up the Command Palette (ctrl+shift+p) and type "Package Control: Install Package"
1. Search for and install SublimeREPL
1. Restart SublimeText

If you are using rbenv, (I assume something similar applies to rvm as well) you will need to edit your SublimeREPL settings (Preferences -> Package Settings -> SublimeREPL -> Settings - User) so your rbenv ruby is used.

```
{
  "default_extend_env": { "PATH": "{HOME}/.rbenv/shims:{PATH}" }
}
```

Finally, SublimeREPL uses [pry](https://github.com/pry/pry) to power the ruby REPL. If you don't have the pry gem installed, you will need to install it prior to running ruby console.

Now that everything is setup you can launch a REPL and test code before you  add it to your project, use rake thru shell, etc. One note, I would be careful about running servers -- I was messing around with [one of my favorite new frameworks](http://www.sailsjs.com) and realized I could not shut down the server (this occurs with servers and other long running operations). That being said, SublimeREPL is definitely a plug-in I would recommend.

