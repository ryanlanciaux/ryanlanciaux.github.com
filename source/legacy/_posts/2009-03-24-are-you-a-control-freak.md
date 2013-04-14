---
layout: post
title: Are you a Control Freak?
date: 2009-03-24 21:04
comments: false
categories: [mvc, jquery]
---
<strong>No Controls?</strong>
Since the very early ASP.NET MVC previews, the
most common argument I've heard against using the framework is the lack
of user controls. In my opinion, this is a mixed blessing, however, for
some, this is a show stopper. What can you do to provide a rich user
interface with the MVC framework, while not reinventing the wheel?

<strong>jQuery</strong>
Now
you could go ahead and program a full fledged data grid or WYSIWYG
editor, however, unless you have a bit of time to spare this is not the
ideal solution. As most may realize, jQuery fits very nicely to fill in
the gaps left by the absence of user controls. For the most part, the
controls are not going to let you just drag-and-drop, type in a dataset
and profit but a lot of the pain is kept to a minimum.

<strong>Examples</strong>
<a id="k9ve" title="Ingrid" href="http://www.reconstrukt.com/ingrid/">Ingrid</a>
<img src="/files/ingrid.gif" alt="" />
If
you're looking for a data grid there are a number of options available
pictured above is Ingrid. <strong>Flexigrid </strong>is another good one that people
have <a id="zc7x" title="used with the MVC framework" href="http://www.codeproject.com/KB/aspnet/MVCFlexigrid.aspx">used with the MVC framework</a>, however, <em>their site appears to be down</em> at the moment.
<a href="http://bassistance.de/jquery-plugins/jquery-plugin-treeview/" target="_blank">Treeviews</a> are available

<img src="/files/treeview.gif" alt="" />

<a href="http://code.google.com/p/jquery-checkbox/" target="_blank">Radio Buttons / Check Boxes
</a>

<img src="/files/check_box.gif" alt="" />

<a href="http://plugins.jquery.com/" target="_blank">Check out the jQuery plugin database</a>.

<strong>Getting Started
</strong>So,
if you've decided you want to look more into using jQuery plugins -- a
couple of tips that may make the transition a little easier:
<ul>
	<li>Obviously,
familiarize yourself with jQuery. Some of the plugins will work with
almost 0 configuration but it's much better to actually know what's
going on. <a href="http://www.smashingmagazine.com/2008/09/16/jquery-examples-and-best-practices/" target="_blank">View more info on getting started with jQuery</a></li>
</ul>
<ul>
	<li>The <a href="http://nayyeri.net/blog/using-jsonresult-in-asp-net-mvc-ajax/" target="_blank">JsonResult</a> is your friend -- <a href="http://www.dev102.com/2008/08/19/jquery-and-the-aspnet-mvc-framework/" target="_blank">learn it well</a>.</li>
</ul>
<ul>
	<li>Read up on what people using different languages are doing. I'm
not saying that you should necessarily go out and learn Rails or
CakePHP/CodeIgniter (although, it is beneficial). but at least look at the
techniques that programmers from that realm of things are doing -- see how they are implementing their controls.</li>
</ul>
What tips do you have for creating robust user interfaces with the MVC framework?

