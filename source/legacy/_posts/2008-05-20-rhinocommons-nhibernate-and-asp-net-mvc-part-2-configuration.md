---
layout: post
title: RhinoCommons, NHibernate and ASP.NET MVC Part 2 - Configuration
date: 2008-05-20 22:23
comments: false
categories: [C#, nhibernate]
---
<p>
Following up on <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC.aspx" target="_blank">my last post</a>, we&#39;re going to setup a project and get everything ready for the code (we&#39;ll be doing the coding very soon -- I promise).&nbsp; First off, create a new MVC application (make sure you&#39;re using the latest preview from codeplex) and a new Class library. From here, you&#39;d normally want to want to do some TDD to create your model but that&#39;s a little outside the scope of this example.
</p>
<p>
Add the references to Boo, Castle, NHibernate, RhinoCommons and Log4Net to the MVC application. In the class library, add Castle.ActiveRecord, Iesi.Collections, NHibernate, Rhino.Commons and Rhino.Commons.NHibernate. Switch over to your web.config file and Underneath the ConfigSections node add the following custom tags:
</p>
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">section</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">activerecord</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Castle.ActiveRecord.Framework.Config.ActiveRecordSectionHandler, Castle.ActiveRecord</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">sectionGroup</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">applicationSettings</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">System.Configuration.ApplicationSettingsGroup, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> &gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">section</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Rhino.Commons.Properties.Settings</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">System.Configuration.ClientSettingsSection, System, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">/&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">sectionGroup</span><span style="color: #88d0e8">&gt;&nbsp;&nbsp;&nbsp;  </span>
</p>
</div>
</div>
<p>
Next add the specific custom tag properties somewhere after the &lt;/ConfigSections&gt; :&nbsp;
</p>
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">activerecord</span><span style="color: #88d0e8"> </span><span style="color: #cecece">isWeb</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">config</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">key</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">hibernate.connection.driver_class</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  </span><span style="color: #cecece">value</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">NHibernate.Driver.SqlClientDriver</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">key</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">dialect</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  </span><span style="color: #cecece">value</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">NHibernate.Dialect.MsSql2005Dialect</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">key</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">hibernate.connection.provider</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  </span><span style="color: #cecece">value</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">NHibernate.Connection.DriverConnectionProvider</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">key</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">hibernate.show_sql</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  </span><span style="color: #cecece">value</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">key</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">connection.connection_string</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">value</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Data Source=___________;Initial Catalog=NHibernateTest;Integrated Security=True</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">config</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">activerecord</span><span style="color: #88d0e8">&gt;</span>
</p>
</div>
</div>
<!--end code-->
These active record settings should be pretty straight-forward but for more information on specific dialects or other properties check out the <a href="http://using.castleproject.org/display/AR/Configuration+Reference" target="_blank">Castle&#39;s Configuration Reference</a>. Be sure to swap out my Data Source and Initial Catalog settings with yours.<br />
<br />
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">applicationSettings</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">Rhino.Commons.Properties.Settings</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">setting</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">WindsorConfig</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  </span><span style="color: #cecece">serializeAs</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">String</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;</span><span style="color: lime">value</span><span style="color: #88d0e8">&gt;</span><span style="color: #47b3d1">windsor.boo</span><span style="color: #88d0e8">&lt;/</span><span style="color: lime">value</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">setting</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">Rhino.Commons.Properties.Settings</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp;&nbsp;&nbsp; &lt;/</span><span style="color: lime">applicationSettings</span><span style="color: #88d0e8">&gt;</span>
</p>
</div>
</div>
<!--end code-->With this tag, we&#39;re telling Castle that we&#39;re going to configure Windsor with a boo file instead of an xml document. <a href="http://ayende.com/blog/" target="_blank">Ayende Rahien</a> pointed out in the comments that this tag is no longer necessary as long as the file is named windsor.boo
<p>
<strong>Windsor Configuration With Boo</strong>&nbsp;
</p>
<p>
Up until this point, we&#39;ve been dealing with the web.config to configure our application -- now we want to configure Windsor but instead of using another xml file, we&#39;re going to use a boo file. What is Boo you might ask? According to <a href="http://en.wikipedia.org/wiki/Boo_(programming_language)" target="_blank">wiki</a>...
</p>
<blockquote>
	Boo is an object oriented, statically typed programming language developed starting in 2003, which seeks to make use of the Common Language Infrastructure support for Unicode, internationalization and web style applications, while using a Python-inspired syntax and a special focus on language and compiler extensibility.&nbsp;
</blockquote>
<p>
The mere fact that you can use a programming language instead of an XML file to configure Windsor is pretty sweet. I would be lying if I claimed to know boo very well, however, the Exesto and Hibernating-Forums samples (from the Rhino-Tools project) have enough information to get you up and running. I plan on learning boo well enought to create my own config files from scratch but in the mean time, here&#39;s what my boo file looks like (heavily influenced by the sample applications mentioned above)...
</p>
<!--begin code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
import Rhino.Commons
</p>
<p style="margin: 0px">
import System.Reflection
</p>
<p style="margin: 0px">
import Castle.Core
</p>
<p style="margin: 0px">
import Castle.Services.Transaction
</p>
<p style="margin: 0px">
import Castle.Facilities.AutomaticTransactionManagement
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
activeRecordAssemblies = ( Assembly.Load(&quot;ProductModelActiveRecord&quot;), )
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
Component(&quot;active_record_repository&quot;, IRepository, ARRepository)
</p>
<p style="margin: 0px">
Component(&quot;active_record_unit_of_work&quot;,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; IUnitOfWorkFactory,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; ActiveRecordUnitOfWorkFactory,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; assemblies: activeRecordAssemblies )
</p>
</div>
</div>
<p>
<!--end code-->Check out <a href="http://ayende.com/blog/" target="_blank">Ayende&#39;s</a> <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-2--.aspx#comment">comment </a>for a more succinct way to register these components.
As you might have noticed, I still have to set up the colors for boo files in Visual Studio :) What this file is doing is loading the assemblies and setting up the repository / unit of work (we&#39;ll see those in action in the next parts of this series). Your project configuration should be all set. Next time we will actually be writing some code so stick around for that. <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-3-the-model.aspx">View Part Three - The Model</a>
</p>


