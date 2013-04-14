---
layout: post
title: NHibernate in an ASP.NET MVC application
date: 2008-04-29 22:45
comments: false
categories: [nhibernate, C#]
---
<p>
I&#39;ve recently become interested in using <a href="http://www.hibernate.org/343.html" target="_blank">NHibernate </a>for some of my data access. For the past year or
so I have been using <a href="http://subsonicproject.com/" target="_blank">SubSonic </a>for that, however, I&#39;m trying to take a bit
more of a domain driven approach on the project I&#39;m currently messing around on. Although I&#39;ve only been looking at it for a couple of days, one thing I&#39;m having a little bit of trouble figuring out is where my ISession should be opened / closed in an ASP.NET MVC application. Currently, I&#39;m doing this in the Controller but I&#39;m not totally sure that is the right way to go...
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; -moz-background-inline-policy: -moz-initial; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; width: 600px">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #47b3d1">ActionResult</span> <span style="color: #a5a3a3">ViewProduct</span>(<span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">using</span> (<span style="color: #2b91af">ISession</span> <span style="color: #a5a3a3">session</span> = <span style="color: #47b3d1">SessionManager</span>.<span style="color: #a5a3a3">GetCurrentSession</span>())
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">SimpleProductRepository</span> <span style="color: #a5a3a3">repo</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">SimpleProductRepository</span>(<span style="color: #a5a3a3">session</span>);
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">RenderView</span>(<span style="color: #80ff00">&quot;ViewProduct&quot;</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">SimpleProductRepository</span>(<span style="color: #a5a3a3">session</span>).<span style="color: #a5a3a3">GetByTitle</span>(<span style="color: #a5a3a3">ID</span>));
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }&nbsp;
</p>
</div>
<br />
What is the best way to go about this? Also, should I be looking more at using a <a href="http://blogs.hibernatingrhinos.com/nhibernate/archive/2008/04/10/nhibernate-and-the-unit-of-work-pattern.aspx" target="_blank">Unit of Work</a> pattern to achieve this?

