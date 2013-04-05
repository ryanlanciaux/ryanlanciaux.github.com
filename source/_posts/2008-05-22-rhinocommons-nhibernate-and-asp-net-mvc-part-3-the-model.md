---
layout: post
title: RhinoCommons, NHibernate and ASP.NET MVC Part 3 - The Model
date: 2008-05-22 10:00
comments: true
categories: [C#, nhibernate]
---
<p>
We&#39;re going to keep moving now that everything is setup (<a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC.aspx" target="_blank">see part one for setup</a>) and configured (<a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-2--.aspx" target="_blank">see part two for configuration</a>). 
</p>
<p>
First off we are going to create our classes. The original classes and SQL tables are posted below (these may look familiar -- they are from <a href="/ryanlanciaux.com/post/Using-NHibernate.aspx" target="_blank">my initial NHibernate post</a>)
</p>
<br />
Initial Product<!--code -->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">Product</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #a5a3a3">IList</span>&lt;<span style="color: #a5a3a3">Product</span>&gt; <span style="color: #a5a3a3">_RelatedProducts</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #a5a3a3">IList</span>&lt;<span style="color: #a5a3a3">ProductGroup</span>&gt; <span style="color: #a5a3a3">_ProductGroups</span>;
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">Product</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_RelatedProducts</span> = <span style="color: #23b4eb">new</span> <span style="color: #a5a3a3">List</span>&lt;<span style="color: #a5a3a3">Product</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_ProductGroups</span> = <span style="color: #23b4eb">new</span> <span style="color: #a5a3a3">List</span>&lt;<span style="color: #a5a3a3">ProductGroup</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ImagePath</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Description</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #a5a3a3">IList</span>&lt;<span style="color: #a5a3a3">Product</span>&gt; <span style="color: #a5a3a3">RelatedProducts</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_RelatedProducts</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">set</span> { <span style="color: #a5a3a3">_RelatedProducts</span> = <span style="color: #23b4eb">value</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #a5a3a3">IList</span>&lt;<span style="color: #a5a3a3">ProductGroup</span>&gt; <span style="color: #a5a3a3">ProductGroups</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_ProductGroups</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">set</span> { <span style="color: #a5a3a3">_ProductGroups</span> = <span style="color: #23b4eb">value</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<br />
<!--end code-->Initial ProductGroup<br />
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">ProductGroup</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ProductGroupID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #a5a3a3">Product</span>&gt; <span style="color: #a5a3a3">Products</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<!--end code--><br />
SQL Tables
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #a5a3a3">CREATE</span> <span style="color: #a5a3a3">TABLE</span> [<span style="color: #a5a3a3">dbo</span>].[<span style="color: #a5a3a3">SimpleProducts</span>](
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ProductID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NOT</span> <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">Title</span>] [<span style="color: #a5a3a3">nvarchar</span>](<span style="color: lime">50</span>) <span style="color: #a5a3a3">NOT</span> <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ImagePath</span>] [<span style="color: #a5a3a3">nvarchar</span>](<span style="color: lime">300</span>) <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">Description</span>] [<span style="color: #a5a3a3">nvarchar</span>](<span style="color: lime">500</span>) <span style="color: #a5a3a3">NULL</span>
</p>
<p style="margin: 0px">
)
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
<span style="color: #a5a3a3">CREATE</span> <span style="color: #a5a3a3">TABLE</span> [<span style="color: #a5a3a3">dbo</span>].[<span style="color: #a5a3a3">RelatedProductsLookup</span>](
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ProductID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NOT</span> <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">RelatedProductID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NOT</span> <span style="color: #a5a3a3">NULL</span>
</p>
<p style="margin: 0px">
)
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
<span style="color: #a5a3a3">CREATE</span> <span style="color: #a5a3a3">TABLE</span> [<span style="color: #a5a3a3">dbo</span>].[<span style="color: #a5a3a3">ProductsProductGroupsLookup</span>](
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ProductGroupID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ProductID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NULL</span>
</p>
<p style="margin: 0px">
)
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
<span style="color: #a5a3a3">CREATE</span> <span style="color: #a5a3a3">TABLE</span> [<span style="color: #a5a3a3">dbo</span>].[<span style="color: #a5a3a3">ProductGroups</span>](
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">ProductGroupID</span>] [<span style="color: #23b4eb">char</span>](<span style="color: lime">32</span>) <span style="color: #a5a3a3">NOT</span> <span style="color: #a5a3a3">NULL</span>,
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #a5a3a3">Title</span>] [<span style="color: #a5a3a3">nvarchar</span>](<span style="color: lime">50</span>) <span style="color: #a5a3a3">NULL</span>
</p>
</div>
</div>
<p>
<!--end code--><br />
<strong>ActiveRecord Classes</strong><br />
In a traditional NHibernate application, we would write usually our mapping files at this time<a href="/ryanlanciaux.com/post/Using-NHibernate.aspx" target="_blank">(see my other NHibernate post</a> for more on that). Since we&#39;re using the ActiveRecord pattern, however, we can specify all our mappings inline with the classes. It is important to note that this would not be a pure domain because we&#39;re placing our mappings inside the model. Warning if you&#39;re sensitive to using Attributes this may not be the code for you...
</p>
<p>
Our classes will now begin with an ActiveRecord attribute over the class; our properties will begin with Property/HasAndBelongsToMany/etc. Please note, for the sake of the example, I&#39;m being extremely verbose with my attributes. If your table/column names match the class/property names, some of the additional info in the attribute is not necessary.
<br />
<!--code-->
</p>
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">ActiveRecord</span>(<span style="color: #a5a3a3">Table</span>=<span style="color: #80ff00">&quot;SimpleProducts&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">Product</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">Product</span>&gt; <span style="color: #a5a3a3">_RelatedProducts</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt; <span style="color: #a5a3a3">_ProductGroups</span>;
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">Product</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_RelatedProducts</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">List</span>&lt;<span style="color: #47b3d1">Product</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_ProductGroups</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">List</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">PrimaryKey</span>(<span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;ProductID&quot;</span>, <span style="color: #a5a3a3">Generator</span>=<span style="color: #a5a3a3">Castle</span>.<span style="color: #a5a3a3">ActiveRecord</span>.<span style="color: #2b91af">PrimaryKeyType</span>.<span style="color: #a5a3a3">UuidHex</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">Property</span>(<span style="color: #a5a3a3">NotNull</span>=<span style="color: #23b4eb">true</span>, <span style="color: #a5a3a3">Length</span>=<span style="color: lime">50</span>, <span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;Title&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span> {<span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">Property</span>(<span style="color: #a5a3a3">Length</span>=<span style="color: lime">300</span>, <span style="color: #a5a3a3">NotNull</span>=<span style="color: #23b4eb">false</span>, <span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;ImagePath&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ImagePath</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">Property</span>(<span style="color: #a5a3a3">NotNull</span> = <span style="color: #23b4eb">false</span>, <span style="color: #a5a3a3">Length</span> = <span style="color: lime">500</span>, <span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;Description&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Description</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">HasAndBelongsToMany</span>(<span style="color: #a5a3a3">Table</span>=<span style="color: #80ff00">&quot;RelatedProductsLookup&quot;</span>, <span style="color: #a5a3a3">ColumnKey</span>=<span style="color: #80ff00">&quot;ProductID&quot;</span>, <span style="color: #a5a3a3">ColumnRef</span>=<span style="color: #80ff00">&quot;RelatedProductID&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">Product</span>&gt; <span style="color: #a5a3a3">RelatedProducts</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_RelatedProducts</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">set</span> { <span style="color: #a5a3a3">_RelatedProducts</span> = <span style="color: #23b4eb">value</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">HasAndBelongsToMany</span>(<span style="color: #a5a3a3">Table</span>=<span style="color: #80ff00">&quot;ProductsProductGroupsLookup&quot;</span>, <span style="color: #a5a3a3">ColumnKey</span>=<span style="color: #80ff00">&quot;ProductID&quot;</span>, <span style="color: #a5a3a3">ColumnRef</span>=<span style="color: #80ff00">&quot;ProductGroupID&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt; <span style="color: #a5a3a3">ProductGroups</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_ProductGroups</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">set</span> { <span style="color: #a5a3a3">_ProductGroups</span> = <span style="color: #23b4eb">value</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<br />
<!--code-->
<div class="code" style="width: 100%">
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">ActiveRecord</span>(<span style="color: #a5a3a3">Table</span>=<span style="color: #80ff00">&quot;ProductGroups&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">ProductGroup</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">PrimaryKey</span>(<span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;ProductGroupID&quot;</span>, <span style="color: #a5a3a3">Generator</span>=<span style="color: #a5a3a3">Castle</span>.<span style="color: #a5a3a3">ActiveRecord</span>.<span style="color: #2b91af">PrimaryKeyType</span>.<span style="color: #a5a3a3">UuidHex</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ProductGroupID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">Property</span>(<span style="color: #a5a3a3">NotNull</span>=<span style="color: #23b4eb">true</span>, <span style="color: #a5a3a3">Length</span>=<span style="color: lime">50</span>, <span style="color: #a5a3a3">Column</span>=<span style="color: #80ff00">&quot;Title&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">HasAndBelongsToMany</span>(<span style="color: #a5a3a3">Table</span>=<span style="color: #80ff00">&quot;ProductsProductGroupsLookup&quot;</span>, <span style="color: #a5a3a3">ColumnKey</span>=<span style="color: #80ff00">&quot;ProductGroupID&quot;</span>, <span style="color: #a5a3a3">ColumnRef</span>=<span style="color: #80ff00">&quot;ProductID&quot;</span>)]
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">Product</span>&gt; <span style="color: #a5a3a3">Products</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
</div>
<p>
<br />
<strong>Repository Object</strong><br />
Another added benefit of using the Castle Active Record library is that we can use the Repository&lt;T&gt; for all of our object persistence. Instead of creating our own implementation of IRepository, we can write code like this to save / retrieve / update objects.
</p>
<div class="code">
Selecting an object (our product IDs are HEX UUID&#39;s so this is not exactly accurate)
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #23b4eb">var</span> <span style="color: #a5a3a3">p</span> = <span style="color: #47b3d1">Repository</span>&lt;<span style="color: #47b3d1">Product</span>&gt;.<span style="color: #a5a3a3">Get</span>(<span style="color: lime">23</span>);&nbsp;
</p>
</div>
</div>
<br />
<div class="code">
Saving / Updating <br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Monaco; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #47b3d1">Repository</span>&lt;<span style="color: #47b3d1">Product</span>&gt;.<span style="color: #a5a3a3">Save</span>(<span style="color: #a5a3a3">p</span>);
</p>
</div>
</div>
<p>
<br />
The repository is pretty nice -- we can save all of our objects outside of the domain, which makes for a much cleaner design. Next time, we&#39;ll be looking at the extremely simple MVC application powered by this model and NHibernate Query Generator. <a href="/ryanlanciaux.com/post/RhinoCommons2c-NHibernate-and-ASPNET-MVC-Part-4---The-MVC-Application.aspx" target="_blank">Continue to Part 4</a>
</p>


