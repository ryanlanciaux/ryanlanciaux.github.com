---
layout: post
title: Very Quick and Simple Dependency Injection with StructureMap
date: 2008-02-26 22:51
comments: false
categories: [C#, IoC, StructureMap]
---
<p>
There are a lot of resources on the web about <a href="http://www.martinfowler.com/articles/injection.html" target="_blank">dependency injection</a> and using <a href="http://structuremap.sourceforge.net/Default.htm" target="_blank">StructureMap</a>, however, I wanted to write something that was an extremely simple example. This is basically the tip of the iceberg but hopefully it will help someone.&nbsp;
</p>
<table border="0">
	<tbody>
		<tr>
			<td valign="top">
			We want to make our application very loosely coupled -- to achieve this &#39;<a href="http://en.wikipedia.org/wiki/Loose_coupling" target="_blank">loose coupling</a>&#39; we&#39;re going to have several projects in the solution. What this means if we need to change any part of this application later on (we wouldn&#39;t want to in this case since its a demo and all), we could do so without impacting everything else. Anyways, we&#39;re going to create three class libraries and a WinForms application.
			</td>
			<td><img src="/ryanlanciaux.com/image.axd?picture=SolutionExplorer.gif" alt="" /> <br />
			</td>
		</tr>
	</tbody>
</table>
<p>
Next we want to create our main inteface -- this will be under the DisplayMessage Project:
</p>
<p>
&nbsp;
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #23b4eb">namespace</span> <span style="color: #a5a3a3">DisplayMessage</span>
</p>
<p style="margin: 0px">
{
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">interface</span> <span style="color: #2b91af">IDisplayMessage</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">message</span>();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
}
</p>
</div>
<p>
The interface defines just one method that, when implemented, will return a string stating what class its coming from. Next, we want to create our two implementation classes (one under Implementation1, the other under Implementation2). Please keep in mind I&#39;m not suggesting to have every class in it&#39;s own library -- it&#39;s just for the sake of example :)
</p>
<p>
Implementation1:
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">MessageOne</span> : <span style="color: #2b91af">IDisplayMessage</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">message</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;This is a message from Implementation1&quot;</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<p>
&nbsp;Implementation2:
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">MessageTwo</span> : <span style="color: #2b91af">IDisplayMessage</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">message</span>()
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;This is a message from Implementation2&quot;</span>;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<p>
Okay that was easy enough, now on to the Forms App.&nbsp; We&#39;re first going to add a reference to StructureMap and the project DisplayMessage and create a file called StructureMap.config -- this config file is going to define all of our assemblies. We want to make sure we edit the properties of this file and set the <em>Copy to Output Directory</em> option to &quot;<em>Copy Always</em>.&quot; StructureMap will use this file at runtime to get our object references. The config file looks like this:&nbsp;
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
<span style="color: #88d0e8">&lt;?</span><span style="color: lime">xml</span><span style="color: #88d0e8"> </span><span style="color: #cecece">version</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">1.0</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> </span><span style="color: #cecece">encoding</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">utf-8</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> ?&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&lt;</span><span style="color: lime">StructureMap</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">Assembly</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">DisplayMessage</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">Assembly</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation1</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">Assembly</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Name</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation2</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &lt;</span><span style="color: lime">PluginFamily</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">DisplayMessage.IDisplayMessage</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">Assembly</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">DisplayMessage</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">DefaultKey</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">MessageOne</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">Plugin</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation1.MessageOne</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">Assembly</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation1</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  </span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">ConcreteKey</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">MessageOne</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &lt;</span><span style="color: lime">Plugin</span><span style="color: #88d0e8"> </span><span style="color: #cecece">Type</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation2.MessageTwo</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">Assembly</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">Implementation2</span><span style="color: fuchsia">&quot;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="color: #cecece">ConcreteKey</span><span style="color: #88d0e8">=</span><span style="color: fuchsia">&quot;</span><span style="color: #cecece">MessageTwo</span><span style="color: fuchsia">&quot;</span><span style="color: #88d0e8"> /&gt;&nbsp; &nbsp; </span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&nbsp; &lt;/</span><span style="color: lime">PluginFamily</span><span style="color: #88d0e8">&gt;</span>
</p>
<p style="margin: 0px">
<span style="color: #88d0e8">&lt;/</span><span style="color: lime">StructureMap</span><span style="color: #88d0e8">&gt;</span>
</p>
</div>
<p>
Notice we define a PluginFamily for the IDisplayMessage interface and set the default implementation to be MessageOne (the DefaultKey of PluginFamily references the ConcreteKey of the Plugin). Other than that, this should be pretty straight-forward but if you have any confusion, please <a href="http://structuremap.sourceforge.net/Default.htm" target="_blank">check out the StructureMap documentation</a>. Only a couple more things to do before we can run this...
</p>
<table border="0">
	<tbody>
		<tr>
			<td>
			<img src="/ryanlanciaux.com/image.axd?picture=window2.gif" alt="" />
			</td>
			<td valign="top">Ok, we&#39;re going to add 3 buttons to our form -- one for the default IDisplayMessage and one for each implementation.</td>
		</tr>
	</tbody>
</table>
<p>
&nbsp;Now to add the code...
</p>
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #d200d5">//Default IDisplayMessage&nbsp;</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">btnDefault_Click</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;();
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">System</span>.<span style="color: #a5a3a3">Windows</span>.<span style="color: #a5a3a3">Forms</span>.<span style="color: #47b3d1">MessageBox</span>.<span style="color: #a5a3a3">Show</span>(<span style="color: #a5a3a3">msg</span>.<span style="color: #a5a3a3">message</span>());
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #d200d5">//Implementation1</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">btnOne_Click</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetNamedInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;(<span style="color: #80ff00">&quot;MessageOne&quot;</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">System</span>.<span style="color: #a5a3a3">Windows</span>.<span style="color: #a5a3a3">Forms</span>.<span style="color: #47b3d1">MessageBox</span>.<span style="color: #a5a3a3">Show</span>(<span style="color: #a5a3a3">msg</span>.<span style="color: #a5a3a3">message</span>());
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px">
&nbsp;
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #d200d5">//Implementation2</span>
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">btnTwo_Click</span>(<span style="color: #23b4eb">object</span> <span style="color: #a5a3a3">sender</span>, <span style="color: #47b3d1">EventArgs</span> <span style="color: #a5a3a3">e</span>)
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetNamedInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;(<span style="color: #80ff00">&quot;MessageTwo&quot;</span>);
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">System</span>.<span style="color: #a5a3a3">Windows</span>.<span style="color: #a5a3a3">Forms</span>.<span style="color: #47b3d1">MessageBox</span>.<span style="color: #a5a3a3">Show</span>(<span style="color: #a5a3a3">msg</span>.<span style="color: #a5a3a3">message</span>());
</p>
<p style="margin: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }&nbsp;
</p>
</div>
<p>
Lets parse this up a little bit...
</p>
<ul>
	<li><span style="color: #2b91af"></span>
	<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
	<p style="margin: 0px">
	<span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;();
	</p>
	</div>
	This statement gets the default IDisplayMessage object in the StructureMap.config file. Currently, it will get the same object as getting a named instance of &quot;MessageOne&quot;</li>
	<li>
	<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
	<p style="margin: 0px">
	<span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetNamedInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;(<span style="color: #80ff00">&quot;MessageOne&quot;</span>);
	</p>
	</div>
	This statement gets the object associated with the ConcreteKey &quot;MessageOne&quot;
	</li>
	<li>
	<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
	<p style="margin: 0px">
	<span style="color: #2b91af">IDisplayMessage</span> <span style="color: #a5a3a3">msg</span> = <span style="color: #a5a3a3">StructureMap</span>.<span style="color: #47b3d1">ObjectFactory</span>.<span style="color: #a5a3a3">GetNamedInstance</span>&lt;<span style="color: #2b91af">IDisplayMessage</span>&gt;(<span style="color: #80ff00">&quot;MessageTwo&quot;</span>);
	</p>
	</div>
	This statement gets the object associated with the ConcreteKey &quot;MessageTwo&quot;</li>
</ul>
<p>
Instead of simply hitting F5, we will need to build the application -- we want to copy the DLL files from Implementation1 and Implementation2 to the bin directory of the forms app and run the executable there.&nbsp; For testing, however, we can add a reference to both projects (this completely defeats the purpose of dependency injection so be sure to remove the references later on) or adjust the output directory of the implementation class libraries to be the same as the Form application&#39;s bin directory. Running the application shows that everything is working as expected.
</p>
<p>
For more information please check out the following links:
</p>
<ul>
	<li>&nbsp;<a href="http://structuremap.sourceforge.net/Default.htm" target="_blank">StructureMap Homepage (SourceForge)</a></li>
	<li><a href="http://codebetter.com/blogs/jeremy.miller/archive/2005/11/18/134816.aspx" target="_blank">Introduction to using StructureMap for DependencyInjection</a></li>
	<li><a href="http://dotnetslackers.com/articles/designpatterns/IntroducingDependencyInjectionFrameworks.aspx" target="_blank">Introducing Dependency Injection Frameworks</a> by <a href="http://codebetter.com/blogs/karlseguin/default.aspx" target="_blank">Karl Seguin <br />
	</a></li>
</ul>
