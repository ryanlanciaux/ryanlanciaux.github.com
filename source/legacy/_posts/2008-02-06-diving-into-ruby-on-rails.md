---
layout: post
title: Diving into Ruby on Rails
date: 2008-02-06 19:09
comments: false 
categories: [rails, ruby, web]
---
<p>
This past weekend I started really digging into <a href="http://www.rubyonrails.org/" target="_blank">Ruby on Rails</a>.&nbsp;&nbsp;For&nbsp;a
while now, I have&nbsp;known a little bit of ruby (by reading <a href="http://poignantguide.net/ruby/" target="_blank">Why&#39;s Poignant
Guide</a> and messing around a little with Rails), however,&nbsp;I wanted to
have a much stronger understanding in it -- even if it&#39;s only for the
concepts.&nbsp;
</p>
<p>
&nbsp;
<br />
<strong>Why Rails -- Why Now?</strong>
</p>
<p>
Rails has been publicly available since July 2004; some may ask why
I am just now becoming interested in the framework. There are actually
several main reasons... 
</p>
<ol>
	<li>It is a good educational
	resource in the <a href="http://en.wikipedia.org/wiki/Model-view-controller" target="_blank">MVC Pattern</a>. This applies to many implementations such
	as <a href="http://weblogs.asp.net/scottgu/archive/2007/10/14/asp-net-mvc-framework.aspx" target="_blank">Microsoft MVC</a>, <a href="http://www.symfony-project.org/" target="_blank">Symfony </a>and <a href="http://www.cakephp.org/" target="_blank">Cake </a>on PHP and a whole slew of <a href="http://merbivore.com/" target="_blank">other</a>
	frameworks.</li>
	<li>Rails is becoming a more viable option with <a href="http://jruby.codehaus.org/" target="_blank">JRuby </a>and the forthcoming releases of <a href="http://www.ironruby.net/" target="_blank">IronRuby</a>.</li>
	<li>The concept of <a href="http://glu.ttono.us/articles/2005/10/27/the-joy-of-migrations" target="_blank">DB Migrations</a> is very nice -- especially when you
	have encountered the difficulty involved in placing your <a href="http://www.codinghorror.com/blog/archives/001050.html" target="_blank">database under source control</a>.</li>
</ol>
<p>
&nbsp;
</p>
<p>
<strong>Setting up the environment</strong>
</p>
<ol>
	<li>
	<div>
	I needed to configure my computer to run the rails apps. <a href="http://www.netbeans.org/" target="_blank">NetBeans
	</a>seemed like a good idea to me because of the simple JRuby integration
	(other options <a href="http://www.aptana.com/" target="_blank">Aptana Studio</a>, <a href="http://www.eclipse.org/" target="_blank">Eclipse</a>, your favorite text editor w/ <a href="http://instantrails.rubyforge.org/wiki/wiki.pl" target="_blank">Instant rails</a>).&nbsp;
	</div>
	</li>
	<li>
	<div>
	I already had <a href="http://www.mysql.com/" target="_blank">MySql </a>installed on my computer so there was no need
	to set up a database server (<a href="http://www.sqlite.org/" target="_blank">Sqlite </a>was a tempting option as well). 
	</div>
	</li>
	<li>
	<div>
	Created a series of databases (as needed)&nbsp;for the various test&nbsp;rails apps to write to.
	</div>
	</li>
	<li>
	<div>
	Downloaded and installed <a href="http://webyog.com/en/" target="_blank">MySqlYog </a>Community edition. I knew I was
	going to be handling most of my database stuff with the Rails
	ActiveRecord implementation and db migrations BUT I still wanted to see
	what was going on inside the db.
	</div>
	</li>
</ol>
<p>
&nbsp;
</p>
<p>
<strong>Initial Impressions</strong>
</p>
After the initial hour or so of
setting up my environment, I wrote some quick test applications
(following some tutorials, at first obviously). I really liked the
principle of Convention over Configuration.&nbsp; This was apparent in many
areas of the framework such as the <a href="http://wiki.rubyonrails.org/rails/pages/UnderstandingGenerators" target="_blank">generator</a> / <a href="http://rake.rubyforge.org/" target="_blank">rake </a>tools and the easy
application configuration in the <a href="http://railscasts.com/episodes/85" target="_blank">.yam</a>l files. I can see how this may
not be the best choice for certain applications but for a lot of web
applications, it seems like it will be a good fit.

