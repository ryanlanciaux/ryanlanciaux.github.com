---
layout: post
title: NHibernate Session Per Request
date: 2008-05-11 23:47
comments: true
categories: [nhibernate, C#]
---
<p>
A little earlier on, I had posted a simple example of <a href="http://svn2.assembla.com/svn/NHibernateTest/" target="_blank">NHibernate in an MVC application</a> as well as some <a href="/ryanlanciaux.com/post/NHibernate-in-an-ASPNET-MVC-application.aspx" target="_blank">initial questions</a> I had about NHibernate Session management. In response to my question, <a href="http://mhinze.com/" target="_blank">Matt Hinze</a> mentioned that the session should be transparent to the controller and posted some links to various articles explaining how to achieve this. I finally had a chance to play around with this type of session management and spent most of my time looking through <a href="http://devlicio.us/blogs/billy_mccafferty/" target="_blank">Billy McCafferty</a>&#39;s <a href="http://www.codeproject.com/KB/architecture/NHibernateBestPractices.aspx" target="_blank">NHibernate Best practices</a> on CodeProject. As I&#39;ve mentioned before, I&#39;m very new to NHibernate so some of the things I&#39;m doing may not be ideal. 
</p>
<p>
<strong>HTTP Module</strong>
</p>
<p>
First off, I created an HTTP module; this is where the session will be opened and closed (by accessing the session manager class). You&#39;ll notice on the Init that event handlers have been added. I&#39;m using the same session manager class that I was using in my last example, however, now it&#39;s being initialized / closed here (rather than in each controller action). 
</p>
<div class="code">
<!--
{\rtf1\ansi\ansicpg\lang1024\noproof65001\uc1 \deff0{\fonttbl{\f0\fnil\fcharset0\fprq1 Monaco;}}{\colortbl;??\red255\green255\blue255;\red27\green27\blue27;\red35\green180\blue235;\red71\green179\blue209;\red43\green145\blue175;\red165\green163\blue163;}??\fs18 \cf1\cb2\highlight2     \cf3 public\cf1  \cf3 class\cf1  \cf4 SessionModule\cf1  : \cf5 IHttpModule\par ??\cf1     \{\par ??        \cf3 private\cf1  \cf5 ISession\cf1  \cf6 _session\cf1 ;\par ??\par ??        \cf3 public\cf1  \cf3 void\cf1  \cf6 Init\cf1 (\cf4 HttpApplication\cf1  \cf6 context\cf1 )\par ??        \{\par ??            \cf6 context\cf1 .\cf6 BeginRequest\cf1  += \cf3 new\cf1  \cf5 EventHandler\cf1 (\cf6 BeginTransaction\cf1 );\par ??            \cf6 context\cf1 .\cf6 EndRequest\cf1  += \cf3 new\cf1  \cf5 EventHandler\cf1 (\cf6 CloseSession\cf1 );\par ??        \}\par ??\par ??        \cf3 private\cf1  \cf3 void\cf1  \cf6 BeginTransaction\cf1 (\cf3 object\cf1  \cf6 sender\cf1 , \cf4 EventArgs\cf1  \cf6 e\cf1 )\par ??        \{\par ??            \cf6 _session\cf1  = \cf4 SessionManager\cf1 .\cf6 GetCurrentSession\cf1 ();\par ??        \}\par ??\par ??        \cf3 private\cf1  \cf3 void\cf1  \cf6 CloseSession\cf1 (\cf3 object\cf1  \cf6 sender\cf1 , \cf4 EventArgs\cf1  \cf6 e\cf1 )\par ??        \{\par ??            \cf6 _session\cf1 .\cf6 Flush\cf1 ();\par ??            \cf6 _session\cf1 .\cf6 Close\cf1 ();\par ??        \}\par ??\par ??        \cf3 public\cf1  \cf3 void\cf1  \cf6 Dispose\cf1 ()\par ??        \{\par ??            \cf6 _session\cf1  = \cf3 null\cf1 ;\par ??        \}\par ??    \}}
-->
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">SessionModule</span> : <span style="color: #2b91af">IHttpModule</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">ISession</span> <span style="color: #a5a3a3">_session</span>;
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">Init</span>(<span style="color: #47b3d1">HttpApplication</span> <span style="color: #a5a3a3">context</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">context</span>.<span style="color: #a5a3a3">BeginRequest</span> += <span style="color: #23b4eb">new</span> <span style="color: #2b91af">EventHandler</span>(<span style="color: #a5a3a3">OpenSession</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">context</span>.<span style="color: #a5a3a3">EndRequest</span> += <span style="color: #23b4eb">new</span> <span style="color: #2b91af">EventHandler</span>(<span style="color: #a5a3a3">CloseSession</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">OpenSession</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_session</span> = <span style="color: #47b3d1">SessionManager</span>.<span style="color: #a5a3a3">GetCurrentSession</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">CloseSession</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_session</span>.<span style="color: #a5a3a3">Flush</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_session</span>.<span style="color: #a5a3a3">Close</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">Dispose</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_session</span> = <span style="color: #23b4eb">null</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<p>
<br />
Next, I added this class to the HttpModules section of the web.config
</p>
<div class="code">
<!--
{\rtf1\ansi\ansicpg\lang1024\noproof65001\uc1 \deff0{\fonttbl{\f0\fnil\fcharset0\fprq1 Monaco;}}{\colortbl;??\red136\green208\blue232;\red27\green27\blue27;\red0\green255\blue0;\red206\green206\blue206;\red255\green0\blue255;}??\fs18 \cf1\cb2\highlight2 &lt;\cf3 add\cf1  \cf4 name\cf1 =\cf5 "\cf4 SessionModule\cf5 "\cf1  \cf4 type\cf1 =\cf5 "\cf4 ProductModel.Session.SessionModule\cf5 "\cf1 /&gt;}
-->
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #88d0e8">&lt;</span><span style="color: lime">add</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SessionModule</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductModel.Session.SessionModule</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">/&gt;</span>
</p>
</div>
</div>
<p>
<strong>Controller Code</strong>
</p>
<p>
Finally, since the NHibernate Session is being created / closed in the HTTP Module, I no longer have to use the <em>using</em> statement in every controller. Instead, I&#39;m just setting a ISession = to the SessionManagers Current session.
</p>
<div class="code">
<!--
{\rtf1\ansi\ansicpg\lang1024\noproof65001\uc1 \deff0{\fonttbl{\f0\fnil\fcharset0\fprq1 Monaco;}}{\colortbl;??\red255\green255\blue255;\red27\green27\blue27;\red35\green180\blue235;\red71\green179\blue209;\red165\green163\blue163;\red43\green145\blue175;\red128\green255\blue0;}??\fs18 \cf1\cb2\highlight2         \cf3 public\cf1  \cf4 ActionResult\cf1  \cf5 AddProduct\cf1 (\cf3 string\cf1  \cf5 ID\cf1 )\par ??        \{\par ??            \cf6 ISession\cf1  \cf5 session\cf1  = \cf4 SessionManager\cf1 .\cf5 GetCurrentSession\cf1 ();\par ??            \cf3 return\cf1  \cf5 RenderView\cf1 (\cf7 "AddProduct"\cf1 ,\par ??                \cf3 new\cf1  \cf4 SimpleProductRepository\cf1 (\cf5 session\cf1 ).\cf5 List\cf1 ());\par ??        \}}
-->
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #47b3d1">ActionResult</span> <span style="color: #a5a3a3">AddProduct</span>(<span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">ISession</span> <span style="color: #a5a3a3">session</span> = <span style="color: #47b3d1">SessionManager</span>.<span style="color: #a5a3a3">GetCurrentSession</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">RenderView</span>(<span style="color: #80ff00">&quot;AddProduct&quot;</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">SimpleProductRepository</span>(<span style="color: #a5a3a3">session</span>).<span style="color: #a5a3a3">List</span>());
</p>
<p style="margin: 0px">
&nbsp;&nbsp; }
</p>
</div>
</div>
<p>
<strong>Wrapping Up</strong>
</p>
<p>
There&#39;s still a bit more I want to explore with this method of Session Management (maybe transactions). Also I would be interested to test out the threading / performance implications of going this route. I&#39;ve updated the code on my assembla site. If you&#39;re interested, you can check it out here <a href="http://svn2.assembla.com/svn/NHibernateTest/" target="_blank">http://svn2.assembla.com/svn/NHibernateTest/</a> (keep in mind it&#39;s demo code -- not anything remotely resembling anything I would use in production). I would really appreciate any suggestions / feedback that you may have!
</p>

