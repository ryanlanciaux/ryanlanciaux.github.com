---
title: "Note to self: escape LiquidTags with Jekyll raw tag plugin"
date: "2013-06-05T21:57:03.284Z"
path: "/blog/2013/06/05/note-to-self-escape-liquidtags-with-jekyll-raw-tag-plugin/"
---

When reviewing [my recent AngularJS post](http://ryanlanciaux.github.io/blog/2013/06/04/learning-angularjs/), I noticed that none of my template display bindings were showing up. LiquidTags use the same {% raw %}{{  }}{% endraw %} style bindings as AngularJS (and was trying to render my Angular expressions as LiquidTags). Luckily, there is a [jekyll plugin called 'raw tag'](https://gist.github.com/phaer/1020852) for rendering data that you do not want interpreted as a LiquidTag / etc. Simply place this raw content between {{ "{% raw " }}%} and {{ "{% endraw " }}%}

For more information [check out this Stackoverflow Post](http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags)
