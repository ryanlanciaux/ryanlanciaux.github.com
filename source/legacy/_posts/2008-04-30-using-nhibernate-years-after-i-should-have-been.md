---
layout: post
title: Using NHibernate (years after I should have been)
date: 2008-04-30 06:52
comments: true
categories: [nhibernate, C#]
---
<p>
As mentioned in my last post, I&#39;ve been starting to use <a href="http://www.hibernate.org/343.html" target="_blank">NHibernate </a>in some of my more recent projects. I checked it out years ago and I completely hated it (maybe becuase I was a newer developer -- not totally sure). More recently, however, I&#39;ve realized some of the benefits of <a href="http://www.domaindrivendesign.org/" target="_blank">Domain Driven Design</a> and thought its about time to give Hibernate another shot. I&#39;m admittedly pretty new to Hibernate so any feedback would be appreciated! 
</p>
<p>
<strong>Classes</strong>&nbsp;
</p>
<div style="margin: 0px; padding: 0px; background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">ProductGroup</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ProductGroupID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span>{ <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>;}
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">SimpleProduct</span>&gt; <span style="color: #a5a3a3">Products</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p>
&nbsp;&nbsp;&nbsp; }&nbsp;
</p>
</div>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">SimpleProduct</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">SimpleProduct</span>&gt; <span style="color: #a5a3a3">_relatedProducts</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ID</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">ImagePath</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Description</span> { <span style="color: #23b4eb">get</span>; <span style="color: #23b4eb">set</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">SimpleProduct</span>&gt; <span style="color: #a5a3a3">RelatedProducts</span> 
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; { 
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span>{ <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_relatedProducts</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">set</span> { <span style="color: #a5a3a3">_relatedProducts</span> = <span style="color: #23b4eb">value</span>;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">virtual</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">AddRelatedProduct</span>(<span style="color: #47b3d1">SimpleProduct</span> <span style="color: #a5a3a3">product</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">if</span> (<span style="color: #a5a3a3">_relatedProducts</span> == <span style="color: #23b4eb">null</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_relatedProducts</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">List</span>&lt;<span style="color: #47b3d1">SimpleProduct</span>&gt;();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_relatedProducts</span>.<span style="color: #a5a3a3">Add</span>(<span style="color: #a5a3a3">product</span>);
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<p>
We&#39;re going to start out with some very contrived classes (normally would start with tests but this is just for the hibernate concepts)... These classes should be pretty straight forward; they consist only of some basic properties and list methods. 
</p>
<p>
<strong>Data Tables&nbsp;</strong>
</p>
<p>
Next, we need to create our tables to hold the data coming from the Classes -- I&#39;ve created a product table / product group table and a lookup table for both (there are many-to-many references in both SimpleProduct and ProductGroup).&nbsp;
</p>
<p>
CREATE TABLE [dbo].[SimpleProducts](<br />
&nbsp;&nbsp;&nbsp; [ProductID] [char](32) NOT NULL,<br />
&nbsp;&nbsp;&nbsp; [Title] [nvarchar](50) NOT NULL,<br />
&nbsp;&nbsp;&nbsp; [ImagePath] [nvarchar](300) NULL,<br />
&nbsp;&nbsp;&nbsp; [Description] [nvarchar](500) NULL<br />
)<br />
&nbsp;&nbsp;&nbsp; <br />
CREATE TABLE [dbo].[RelatedProductsLookup](<br />
&nbsp;&nbsp;&nbsp; [ProductID] [char](32) NOT NULL,<br />
&nbsp;&nbsp;&nbsp; [RelatedProductID] [char](32) NOT NULL<br />
)<br />
<br />
CREATE TABLE [dbo].[ProductsProductGroupsLookup](<br />
&nbsp;&nbsp;&nbsp; [ProductGroupID] [char](32) NULL,<br />
&nbsp;&nbsp;&nbsp; [ProductID] [char](32) NULL<br />
)<br />
<br />
CREATE TABLE [dbo].[ProductGroups](<br />
&nbsp;&nbsp;&nbsp; [ProductGroupID] [char](32) NOT NULL,<br />
&nbsp;&nbsp;&nbsp; [Title] [nvarchar](50) NULL<br />
)&nbsp;&nbsp;&nbsp;&nbsp; 
</p>
<p>
&nbsp;You will want to set the Primary Key of the SimpleProduct and Product Groups table to be the ID.&nbsp;
</p>
<p>
<strong>Hibernate Mappings</strong>
</p>
<p>
Next we&#39;re on to the Hibernate mapping files. These files link the columns in the database to the fields/properties in the domain classes. Please check the <a href="http://www.hibernate.org/hib_docs/nhibernate/1.2/reference/en/html/" target="_blank">project documentation</a> for more detailed information on the Hibernate Schemas.
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&lt;?</span><span style="color: lime">xml</span><span style="color: #88d0e8"> </span><span style="color: #cecece">version</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">1.0</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">encoding</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">utf-8</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> ?&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&lt;</span><span style="color: lime">hibernate-mapping</span><span style="color: #88d0e8"> </span><span style="color: #cecece">xmlns</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">urn:nhibernate-mapping-2.2</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  </span><span style="color: #cecece">namespace</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductModel</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">assembly</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductModel</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">default-lazy</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">class</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroup</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">table</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroups</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">id</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">sql-type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">char(32)</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">generator</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">uuid.hex</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">id</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">property</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Title</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Title</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">length</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">50</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">property</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">bag</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Products</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&nbsp; </span><span style="color: #cecece">table</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductsProductGroupsLookup</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">lazy</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">key</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">many-to-many</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SimpleProduct</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;&nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">bag</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &lt;/</span><span style="color: lime">class</span><span style="color: #88d0e8">&gt;&nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&lt;/</span><span style="color: lime">hibernate-mapping</span><span style="color: #88d0e8">&gt;</span>
</p>
</div>
<p>
Inside the hibernate mapping tag, we have an element called class where we&#39;re defining the relationship between the class and the table in the database. From there we&#39;re defining the properties -- Most of this should be pretty straight forward but there are a couple things I would like to focus on.&nbsp;
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">id</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">sql-type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">char(32)</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">generator</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">uuid.hex</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">id</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
</div>
<p>
&nbsp;This node is defining the unique ID for the class -- the ID is being created for each item and looks a little something like this: <em>46abbefc08d14b49a5d15c8a4dd69ff2 </em>
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">bag</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Products</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&nbsp; </span><span style="color: #cecece">table</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductsProductGroupsLookup</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">lazy</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">key</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductGroupID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">many-to-many</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SimpleProduct</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;&nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">bag</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &lt;/</span><span style="color: lime">class</span><span style="color: #88d0e8">&gt;&nbsp; </span>
</p>
</div>
<p>
Here we&#39;re defining a many-to-many relationship with Products -- this is bumping up against the lookup table we defined earlier to get all SimpleProducts associated with this class. currently the bag is defining a many-to-many relationship. We&#39;re going to assume that a product can exist under any number of product groups -- for instance if we have a video game system it could be under both the Home Entertainment and Electronics product group. See the <a href="http://www.hibernate.org/hib_docs/nhibernate/1.2/reference/en/html/" target="_blank">project documentation</a> for other types of relationships (one-to-many, etc).
</p>
<p>
SimpleProduct Mapping:
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&lt;?</span><span style="color: lime">xml</span><span style="color: #88d0e8"> </span><span style="color: #cecece">version</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">1.0</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">encoding</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">utf-8</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> ?&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&lt;</span><span style="color: lime">hibernate-mapping</span><span style="color: #88d0e8"> </span><span style="color: #cecece">xmlns</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">urn:nhibernate-mapping-2.2</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  </span><span style="color: #cecece">namespace</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductModel</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">assembly</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductModel</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">default-lazy</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">class</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SimpleProduct</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">table</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SimpleProducts</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">id</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">sql-type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">char(32)</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">generator</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">uuid.hex</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">id</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">property</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Title</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Title</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">length</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">50</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">true</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">property</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">property</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ImagePath</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ImagePath</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">length</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">300</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">property</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">property</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Description</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">column</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Description</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">length</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">500</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">not-null</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">property</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">bag</span><span style="color: #88d0e8"> </span><span style="color: #cecece">name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">RelatedProducts</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&nbsp; </span><span style="color: #cecece">table</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">RelatedProductsLookup</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">lazy</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">false</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">key</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">ProductID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &lt;</span><span style="color: lime">many-to-many</span><span style="color: #88d0e8"> </span><span style="color: #cecece">class</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">SimpleProduct</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">column</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">RelatedProductID</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;&nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;/</span><span style="color: lime">bag</span><span style="color: #88d0e8">&gt;&nbsp; &nbsp; &nbsp; &nbsp; </span>
</p>
<p style="margin: 0px; padding: 0px">
<span style="color: #88d0e8">&nbsp; &lt;/</span><span style="color: lime">class</span><span style="color: #88d0e8">&gt;&nbsp; </span>
</p>
<p>
<span style="color: #88d0e8">&lt;/</span><span style="color: lime">hibernate-mapping</span><span style="color: #88d0e8">&gt;</span><br />
&nbsp;
</p>
</div>
<p>
&nbsp;
</p>
<p>
<strong>Accessing The Data</strong>
</p>
<p>
Now that we&#39;ve defined all of our mappings its time to create some methods to access our data.
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">ProductGroupRepository</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">ISession</span> <span style="color: #a5a3a3">_session</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">ProductGroupRepository</span>(<span style="color: #2b91af">ISession</span> <span style="color: #a5a3a3">session</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_session</span> = <span style="color: #a5a3a3">session</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #47b3d1">ProductGroup</span> <span style="color: #a5a3a3">GetByTitle</span>(<span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Title</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_session</span>.<span style="color: #a5a3a3">CreateCriteria</span>(<span style="color: #23b4eb">typeof</span>(<span style="color: #47b3d1">ProductGroup</span>))
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Add</span>(<span style="color: #47b3d1">Expression</span>.<span style="color: #a5a3a3">Eq</span>(<span style="color: #80ff00">&quot;Title&quot;</span>, <span style="color: #a5a3a3">Title</span>))
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">UniqueResult</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt;();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #2b91af">IList</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt; <span style="color: #a5a3a3">List</span>()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_session</span>.<span style="color: #a5a3a3">CreateCriteria</span>(<span style="color: #23b4eb">typeof</span>(<span style="color: #47b3d1">ProductGroup</span>))
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">List</span>&lt;<span style="color: #47b3d1">ProductGroup</span>&gt;();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<p>
&nbsp;
</p>
<p>
The ISession is the Hibernate object to use when accessing the data -- from what it looks like, these should pretty much line up with a unit of work (<a href="http://blogs.hibernatingrhinos.com/nhibernate/archive/2008/04/10/nhibernate-and-the-unit-of-work-pattern.aspx" target="_blank">More on that here).</a> 
</p>
<p>
In the other methods of the class, we first need to define what type of object we&#39;re looking for. In case it&#39;s not obvious, we&#39;re specifying that in the CreateCriteria section. In the List() method, we&#39;re returning a list (of ProductGroups) -- there are no filters or other criteria defined for this operation. In the GetByTitle() method, however,&nbsp; we&#39;re stating that the Title for the product must match the Parameter &#39;Title&#39;. 
</p>
<p>
<strong>Demo Application</strong>
</p>
<p>
I&#39;ve created a quick demo application using MVC and NHibernate. As I said, I&#39;m still very new to hibernate so there&#39;s a lot I&#39;m trying to learn (for instance<a href="/ryanlanciaux.com/post/NHibernate-in-an-ASPNET-MVC-application.aspx" target="_blank"> where the ISession should initially be created and closed in an MVC application</a>). Please let me know of any way that this could be better -- generally I&#39;m writing this to help solidfy my thoughts on the technology, help others (hopefully) and also improve from others feedback.&nbsp;
</p>
<p>
Disclaimer: Use this code at your own risk.&nbsp;
</p>

