---
layout: post
title: RhinoCommons, NHibernate and ASP.NET MVC Part 5 - LINQ to NHibernate
date: 2008-06-03 21:15
comments: false
categories: [C#, nhibernate]
---
<p>
<strong>Settings</strong>&nbsp;
</p>
<p>
Up until now, we&#39;ve been using&nbsp; NHibernate Query Generator for all of our data access. Although this is a great way to retrieve our data, there is another option we can play around with -- LINQ for NHibernate. To set this up in our existing application (see <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC.aspx" target="_blank">Part 1</a>, <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-2--.aspx" target="_blank">Part 2</a>, <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-3-the-model.aspx" target="_blank">Part 3</a> and <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-4---The-MVC-Application.aspx" target="_blank">Part 4</a> on creating the ASP.NET MVC Application) we&#39;ll first need to grab the code out of subversion <a href="https://rhino-tools.svn.sourceforge.net/svnroot/rhino-tools/experiments/NHibernate.Linq/" target="_blank">https://rhino-tools.svn.sourceforge.net/svnroot/rhino-tools/experiments/NHibernate.Linq/</a> and build it using MSBuild or Visual Studio. After that we want to add a reference to it in our application.
</p>
<p>
<strong>Simple Code</strong>&nbsp;
</p>
<p>
Next we&#39;ll want to update our controller to use Linq for NHibernate instead of NHQG (Service layer would be better place for this type of code but since this is a demo it&#39;ll be okay -- for more on using a service layer to handle all the repository code check out <a href="http://michaelhanney.com/blog/" target="_blank">Michael Hanney</a>&#39;s post on <a href="http://michaelhanney.com/blog/2008/05/27/systemwebmvc-rhino-commons-caslte-active-record-nhibernate-part-2/" target="_blank">ActiveRecord, NHibernate and ASP.NET MVC</a>). The initial NHGQ code is:
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = <span style="color: #47b3d1">Repository</span>&lt;<span style="color: #47b3d1">Product</span>&gt;.<span style="color: #a5a3a3">FindOne</span>(<span style="color: #47b3d1">Where</span>.<span style="color: #a5a3a3">Product</span>.<span style="color: #a5a3a3">Title</span> == <span style="color: #a5a3a3">ID</span>);
</p>
</div>
</div>
<!--end code-->
<br />
Our LINQ for NHibernate query will look like this:<br />
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = (<span style="color: #23b4eb">from</span> <span style="color: #a5a3a3">item</span> <span style="color: #23b4eb">in</span> <span style="color: #47b3d1">UnitOfWork</span>.<span style="color: #a5a3a3">CurrentSession</span>.<span style="color: #a5a3a3">Linq</span>&lt;<span style="color: #47b3d1">Product</span>&gt;()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #23b4eb">where</span> <span style="color: #a5a3a3">item</span>.<span style="color: #a5a3a3">Title</span> == <span style="color: #a5a3a3">ID</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #23b4eb">select</span> <span style="color: #a5a3a3">item</span>).<span style="color: #a5a3a3">First</span>();
</p>
</div>
</div>
<p>
<!--end code-->
It&#39;s pretty obvious that the Linq code is a bit longer than the NHQG code. Although that in itself is not a bad thing, it may turn some people away. Momentarily, we&#39;ll see some scenarios where Linq for NH is very useful.
</p>
<p>
<strong>Paging and Sorting</strong>&nbsp;
</p>
<p>
One nice thing we can easily do with Linq for NHibernate is page and sort our data. If we simply want to get a list of all products it would look like this. &nbsp;
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = (<span style="color: #23b4eb">from</span> <span style="color: #a5a3a3">item</span> <span style="color: #23b4eb">in</span> <span style="color: #47b3d1">UnitOfWork</span>.<span style="color: #a5a3a3">CurrentSession</span>.<span style="color: #a5a3a3">Linq</span>&lt;<span style="color: #47b3d1">Product</span>&gt;()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #23b4eb">select</span> <span style="color: #a5a3a3">item</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ).<span style="color: #a5a3a3">ToList</span>()
</p>
</div>
</div>
<p>
<!--end code--> To page/sort the data it&#39;s just a slight addition to the list all code.
<!--code-->
</p>
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">int</span> <span style="color: #a5a3a3">itemsPerPage</span> = <span style="color: lime">5</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">int</span> <span style="color: #a5a3a3">startIndex</span> = (<span style="color: #a5a3a3">ID</span>.<span style="color: #a5a3a3">Value</span> - <span style="color: lime">1</span>)* <span style="color: #a5a3a3">itemsPerPage</span>;
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = (<span style="color: #23b4eb">from</span> <span style="color: #a5a3a3">item</span> <span style="color: #23b4eb">in</span> <span style="color: #47b3d1">UnitOfWork</span>.<span style="color: #a5a3a3">CurrentSession</span>.<span style="color: #a5a3a3">Linq</span>&lt;<span style="color: #47b3d1">Product</span>&gt;()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #23b4eb">orderby</span> <span style="color: #a5a3a3">item</span>.<span style="color: #a5a3a3">Title</span> <span style="color: #23b4eb">ascending</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #23b4eb">select</span> <span style="color: #a5a3a3">item</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ).<strong><span style="color: #a5a3a3">Skip</span></strong>(<span style="color: #a5a3a3">startIndex</span>).<strong><span style="color: #a5a3a3">Take</span></strong>(<span style="color: #a5a3a3">itemsPerPage</span>).<span style="color: #a5a3a3">ToList</span>();
</p>
</div>
</div>
<p>
<!--endcode-->
<br />
<strong>More Advanced Usage</strong>
</p>
<p>
<a href="http://codebetter.com/blogs/kyle.baley/" target="_blank">Kyle Baley</a>&#39;s <a href="http://codebetter.com/blogs/kyle.baley/archive/2008/04/07/trying-out-linq-for-nhibernate.aspx" target="_blank">article on Linq for Nhibernate</a> shows a more interesting use for Linq for NHibernate; we can create a generic method that adds query criteria on the fly. This would make our code much more reusable so we&#39;re going to go ahead and make a <em>demo </em>class heavily based on these concepts.
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">QueryHandler</span>&lt;<span style="color: #a5a3a3">T</span>&gt;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #a5a3a3">linqExpression</span>.<span style="color: #47b3d1">Expression</span>&lt;<span style="color: #2b91af">Func</span>&lt;<span style="color: #a5a3a3">T</span>, <span style="color: #23b4eb">bool</span>&gt;&gt;&gt;&nbsp; <span style="color: #a5a3a3">_criteria</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">QueryHandler</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_criteria</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">List</span>&lt;<span style="color: #a5a3a3">linqExpression</span>.<span style="color: #47b3d1">Expression</span>&lt;<span style="color: #2b91af">Func</span>&lt;<span style="color: #a5a3a3">T</span>, <span style="color: #23b4eb">bool</span>&gt;&gt;&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">AddCriteria</span>(<span style="color: #a5a3a3">linqExpression</span>.<span style="color: #47b3d1">Expression</span>&lt;<span style="color: #2b91af">Func</span>&lt;<span style="color: #a5a3a3">T</span>, <span style="color: #23b4eb">bool</span>&gt;&gt; <span style="color: #a5a3a3">LambdaFunc</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_criteria</span>.<span style="color: #a5a3a3">Add</span>(<span style="color: #a5a3a3">LambdaFunc</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #a5a3a3">T</span>&gt; <span style="color: #a5a3a3">GetList</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">query</span> = <span style="color: #23b4eb">from</span> <span style="color: #a5a3a3">item</span> <span style="color: #23b4eb">in</span> <span style="color: #47b3d1">UnitOfWork</span>.<span style="color: #a5a3a3">CurrentSession</span>.<span style="color: #a5a3a3">Linq</span>&lt;<span style="color: #a5a3a3">T</span>&gt;()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">select</span> <span style="color: #a5a3a3">item</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #d200d5">//Tack on our query Criteria</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">foreach</span> (<span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">criterion</span> <span style="color: #23b4eb">in</span> <span style="color: #a5a3a3">_criteria</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  <span style="color: #a5a3a3">query</span> = <span style="color: #a5a3a3">query</span>.<span style="color: #a5a3a3">Where</span>&lt;<span style="color: #a5a3a3">T</span>&gt;(<span style="color: #a5a3a3">criterion</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">query</span>.<span style="color: #a5a3a3">ToList</span>();
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
<!--endcode-->
Here, we&#39;ve created a class that has a private list of criteria, a method to add criteria to the list and a method to get the list based on the given criteria. I realize it may be a little intimidating but we can perfom most of our select queries through this method due to the use of Generics.&nbsp;
</p>
<p>
Updating the controllers to use this functionality is not too difficult. For pages that simply retrieve lists we call the GetList method without specifying any criteria:
</p>
<!--code-->
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">queryHandler</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">QueryHandler</span>&lt;<span style="color: #47b3d1">Product</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = <span style="color: #a5a3a3">queryHandler</span>.<span style="color: #a5a3a3">GetList</span>().<span style="color: #a5a3a3">Skip</span>(<span style="color: #a5a3a3">startIndex</span>).<span style="color: #a5a3a3">Take</span>(<span style="color: #a5a3a3">itemsPerPage</span>).<span style="color: #a5a3a3">ToList</span>();
</p>
</div>
</div>
<p>
&nbsp;Pass in new lambda expressions to add query criteria
</p>
<div class="code">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">queryHandler</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">QueryHandler</span>&lt;<span style="color: #47b3d1">Product</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">queryHandler</span>.<span style="color: #a5a3a3">AddCriteria</span>(<span style="color: #a5a3a3">item</span> =&gt; <span style="color: #a5a3a3">item</span>.<span style="color: #a5a3a3">Title</span> == <span style="color: #a5a3a3">ID</span>);
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = <span style="color: #a5a3a3">queryHandler</span>.<span style="color: #a5a3a3">GetList</span>().<span style="color: #a5a3a3">First</span>();
</p>
</div>
</div>
<p>
<!--endcode-->
<br />
Now we see there are multiple options for interacting with our ActiveRecord Repository. Please let me know of any changes that you would make. I&#39;ve updated the demo code in Assembla -- <a href="http://svn2.assembla.com/svn/NHibernateTest" target="_blank">http://svn2.assembla.com/svn/NHibernateTest</a> - Standard disclaimer does apply (some of the code is less than ideal but for learning it should be okay).
</p>

</div>

