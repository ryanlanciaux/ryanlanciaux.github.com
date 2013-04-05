---
layout: post
title: RhinoCommons, NHibernate and ASP.NET MVC Part 4 - The MVC Application
date: 2008-05-26 20:26
comments: true
categories: [nhibernate, C#]
---
<p>
Finally we&#39;re to the point where we can see all our hard work come together. We have most of the hard work done but we still have a lot of ground to cover. If you haven&#39;t been following along, please check out <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC.aspx" target="_blank">Setting Up The Assemblies</a>, <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-2--.aspx" target="_blank">Configuring the Application</a> and <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-2--.aspx" target="_blank">Developing the Model</a>.
</p>
<p>
<strong>Unit of Work</strong>
</p>
<p>
In some of my initial tests with NHibernate and ASP.NET MVC Pattern I kept seeing the benefits of having a Unit of Work or Session Per Request (that is opening and closing the NHibernate session at the begining and end of the http request respectively). To Recap a little, I started to write my own Session Per Request, however, <a href="http://www.lostechies.com/blogs/chad_myers/" target="_blank">Chad Myers</a> pointed me to the Rhino Commons project which already implemented this. I think it&#39;s worthwhile becuase I don&#39;t really like putting NHibernate session code in my controller plus as <a href="http://martinfowler.com/eaaCatalog/unitOfWork.html" target="_blank">Martin Fowler writes</a>
<br />
</p>
<blockquote>
	A Unit of Work keeps track of everything you do during a business transaction that can affect the database. When you&#39;re done, it figures out everything that needs to be done to alter the database as a result of your work.
</blockquote>
<p>
Luckily, with RhinoCommons, it&#39;s pretty easy to implement this pattern (<a href="http://www.ayende.com/Blog/archive/2007/06/08/Rhino-Commons-RepositoryltTgt-and-Unit-Of-Work.aspx" target="_blank">check out Ayende&#39;s post on this</a>). In a standard web forms application, we would normally create a Global.aspx that inherits UnitOfWorkApplication. Since we&#39;re using ASP.NET MVC, however, we don&#39;t necessarily want to go that route. As <a href="http://michaelhanney.com/blog/" target="_blank">Michael Hanney</a> notes on <a href="http://michaelhanney.com/blog/2008/04/27/beginning-systemwebmvc-with-rhino-tools-caslte-active-record-and-nhibernate/" target="_blank">his post on MVC and Castle</a> we can have our Global.asax inherit from UnitOfWorkApplication. 
</p>
<p>
&nbsp;
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 0%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">GlobalApplication</span> : <span style="color: #47b3d1">UnitOfWorkApplication</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">override</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">Application_Start</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)&nbsp; 
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {&nbsp; 
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">base</span>.<span style="color: #a5a3a3">Application_Start</span>(<span style="color: #a5a3a3">sender</span>, <span style="color: #a5a3a3">e</span>);&nbsp; 
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">RegisterRoutes</span>(<span style="color: #47b3d1">RouteTable</span>.<span style="color: #a5a3a3">Routes</span>);&nbsp; 
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; } 
</p>
<p style="margin: 0px">
... 
</p>
<p style="margin: 0px">
&nbsp; &nbsp;&nbsp; } 
</p>
</div>
</div>
<p>
<!--endCode-->If you know of another way to do this, please be sure to let me know. Also, the routing still works as it normally would -- we&#39;re just running this code first to instantiate the UnitOfWork. 
</p>
<p>
In our controllers we can call our reference our Hibernate repositories and classes without specifying an ISession.
<br />
<!--code-->
</p>
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 0%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #47b3d1">ActionResult</span> <span style="color: #a5a3a3">InsertProductGroup</span>(<span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">ProductGroup</span> <span style="color: #a5a3a3">pg</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">ProductGroup</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">pg</span>.<span style="color: #a5a3a3">Title</span> = <span style="color: #a5a3a3">Title</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">Repository</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt;.<span style="color: #a5a3a3">Save</span>(<span style="color: #a5a3a3">pg</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">UnitOfWork</span>.<span style="color: #a5a3a3">Current</span>.<span style="color: #a5a3a3">Flush</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">RenderView</span>(<span style="color: #80ff00">&quot;AddProductGroup&quot;</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; } 
</p>
</div>
</div>
<p>
<!--endCode--> Notice we&#39;re still flushing our data -- but it makes the controllers a LOT cleaner. Imagine if we had to instantiate and clean up our session in each controller. 
</p>
<p>
One further thing, the UnitOfWorkApplication supports both short and long conversations. I&#39;m not going to go too much into that but if your application requires keeping objects around for a couple HTTP Requests before saving to the database Long Conversation may be the way to go. <a href="http://www.ayende.com/Wiki/HttpModules.ashx" target="_blank">See Ayende&#39;s Wiki for more on this</a> 
</p>
<p>
<strong>NHibernate Query Generator</strong><br />
In the <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC.aspx" target="_blank">first post of this series</a> we looked at what it takes to setup NHibernate Query Generator (NHQG from here out). Now we get to use it to make some really nice looking code (in a later post, however, we&#39;ll be using LINQ to NHibernate). If we&#39;ve set up the tool as mentioned in the first post (listed earlier), all we have to do is run the tool and make sure the generated code is added to the project. 
</p>
<p>
NHQG lets us use a fluent interface to set filters on our Hibernate queries; this results in code that, in my opinion, is very easy to write and understand later on. If we wanted to Find one Product with a specific title, our code would look something like this: 
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 0%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #47b3d1">ActionResult</span> <span style="color: #a5a3a3">ViewProduct</span>(<span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = <span style="color: #47b3d1">Repository</span>&lt;<span style="color: #47b3d1">Product</span>&gt;.<span style="color: #a5a3a3">FindOne</span>(<span style="color: #47b3d1">Where</span>.<span style="color: #a5a3a3">Product</span>.<span style="color: #a5a3a3">Title</span> == <span style="color: #a5a3a3">ID</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">if</span> (<span style="color: #a5a3a3">p</span> != <span style="color: #23b4eb">null</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">RenderView</span>(<span style="color: #80ff00">&quot;DisplayProduct&quot;</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; <span style="color: #a5a3a3">p</span>);&nbsp; 
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">RenderView</span>(<span style="color: #80ff00">&quot;DisplayProduct&quot;</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<p>
<!--endCode-->
The <em>Where.Product.Title == ID</em> is all from the NHQG autogenerated code. Now we actually have something to show for all our configuration and setup work. Soon, we&#39;re going to take a look at using LINQ to NHibernate instead of NHQG.</p>