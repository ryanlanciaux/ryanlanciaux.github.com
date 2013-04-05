---
layout: post
title: RhinoCommons, NHibernate and ASP.NET MVC Part 1 - Setup
date: 2008-05-19 17:29
comments: true
categories: [C#, nhibernate]
---
<p>
After my last post about the unit of work with NHibernate, <a href="http://www.lostechies.com/blogs/chad%5Fmyers/" target="_blank">Chad Myers</a> mentioned that I should take a look at Ayende&#39;s Rhino Commons (because the Unit of Work stuff is already being handled). Since I am not a big fan of reinventing the wheel I decided I would give it a shot. There&#39;s going to be another post in the near future about how to get Rhino Commons, Castle ActiveRecord and ASP.NET MVC working together but for now, it would be good to make sure all the necessary components are installed on your machine.
</p>
<ol>
	<li>Make sure you have a subversion client -- <a href="http://tortoisesvn.tigris.org/" target="_blank">Tortoise SVN</a> or the command prompt is what I use but any subversion client should be fine. </li>
	<li>If you don&#39;t already have <a href="http://nant.sourceforge.net/" target="_blank">Nant</a> installed on your machine download and install that</li>
	<li>Download and build the following (<a href="http://www.ayende.com/blog" target="_blank">Ayende </a>mentions, the <a href="http://www.ayende.com/Blog/archive/2007/08/06/Running-on-the-trunk-Building-Rhino-Commons.aspx" target="_blank">trick is not opening in Visual Studio</a>):
	<ul>
		<li>Castle Project -- (<a href="http://svn.castleproject.org:8080/svn/castle/trunk" target="_blank">http://svn.castleproject.org:8080/svn/castle/trunk</a>)</li>
		<li> NHibernate -- (<a href="https://nhibernate.svn.sourceforge.net/svnroot/nhibernate/trunk" target="_blank">https://nhibernate.svn.sourceforge.net/svnroot/nhibernate/trunk</a>)</li>
		<li> Rhino-Tools (<a href="https://rhino-tools.svn.sourceforge.net/svnroot/rhino-tools/trunk" target="_blank">https://rhino-tools.svn.sourceforge.net/svnroot/rhino-tools/trunk</a>) </li>
	</ul>
	</li>
	<li>Next you&#39;re going to want to setup the NHibernate Query Generator (we&#39;re going to use Linq to NHibernate in a later example but for now get this installed). This should be a part of the Rhino-tools package but if you want you can <a href="http://www.ayende.com/projects/nhibernate-query-analyzer/downloads.aspx" target="_blank">download the binaries</a>. Then setup the application as an external tool in Visual Studio (my settings are posted below). <a href="http://jhollingworth.wordpress.com/2008/03/28/subsonic-like-nhibernate-query-generator-button-in-visual-studio/%20target=">see James Hollingworth&#39;s post for more info</a>
	<br />
	<img src="/ryanlanciaux.com/image.axd?picture=nhibernateqg.gif" alt="" />
	<ul>
		<li>Command: C:\program files\nhqg\NHQG.exe</li>
		<li>Arguments: /Lang:cs /InputFilePattern:$(BinDir)/ProductModelActiveRecord.dll /OutputDirectory:$(ProjectDir)/Queries /BaseNamespace:Queries</li>
		<li>Initial Directory: $(TargetDir)</li>
	</ul>
	</li>
	<li>Finally make sure you&#39;re running the preview 3 drop of the ASP.NET MVC Framework -- you can <a href="http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=12640" target="_blank">get that here from CodePlex</a> </li>
</ol>
You should now have everything setup. It may be good to take a look at the Exesto application in the rhino-tools\SampleApplications directory to get an introduction to the Rhino-tools / binsor / castle settings that we&#39;ll be looking at later on. Finally, if you are not familiar with the ASP.NET MVC Framework take a look <a href="http://weblogs.asp.net/fredriknormen/archive/2008/04/17/asp-net-mvc-framework-pre-preview-3-a-step-by-step-guide-to-create-a-simple-web-app.aspx" target="_blank">Fredrik Normen&#39;s step by step guide</a>. In the next couple of days, I will be posting how to wire these tools together for quick web application development. Stay Tuned.<br />


