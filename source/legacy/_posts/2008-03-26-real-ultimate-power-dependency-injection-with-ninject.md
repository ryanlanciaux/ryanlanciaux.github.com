---
layout: post
title: Real Ultimate Power Dependency Injection with Ninject
date: 2008-03-26 23:02
comments: false
categories: [C#, IoC, Ninject, ninjas]
---
<div style="padding: 10px; float: right">
<img src="/files/ninja.jpg" alt="Ninja" />
</div>
<div style="border: 1px solid #656565; background-color: #ededed; width: 350px">
<strong>UPDATE:</strong> <a href="http://kohari.org/" target="_blank">Nate Kohari</a> (the author of <a href="http://ninject.org/" target="_blank">Ninject</a>) posted some excellent information in the comments (enough info that it could probably be a post on its own).
</div>
<br />
Recently
<a href="http://www.hanselman.com/blog/" target="_blank">Scott Hanselman</a> compiled a <a href="http://www.hanselman.com/blog/ListOfNETDependencyInjectionContainersIOC.aspx" target="_blank">list of Dependency Injection frameworks</a> for .NET. I
really didn&#39;t plan on trying anything new but <a href="http://ninject.org/" target="_blank">Ninject</a> really jumped out
at me (honestly, it was more the reference to ninjas than anything).
After seeing a couple examples, I thought I would check it out in a bit
more detail. <br />
<br />
<blockquote>
	Disclaimer: I&#39;ve been playing
	around with Ninject for all of about 3 hours now ... it&#39;s very possible
	there&#39;s a better way to do some of this stuff :) So I would really
	appreciate any feedback.<br />
</blockquote>
<br />
<span><strong>On to the code</strong></span><br />
<br />
Okay,
for this very contrived example we&#39;re going to be building car objects
out of just an engine and a drive type (extremely accurate I know). Just like in my StructureMap example, I&#39;m going to start by creating
the interfaces followed by a default class that we&#39;re going to use as
our skeleton car ... the interfaces are pretty basic so no need to
spend too much time on them.<br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-family: Consolas; font-size: 9pt; color: white; max-width: 400px">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">interface</span> <span style="color: #2b91af">IDriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">DriveType</span>{ <span style="color: #23b4eb">get</span>;}
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">interface</span> <span style="color: #2b91af">IEngine</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">EngineType</span> { <span style="color: #23b4eb">get</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
Both
of the interfaces have only one string property that will be used for
output. A little on the basic side but hey, we&#39;re looking at IoC not an
accurate car construction. Next we&#39;re going to add all our
implementations of the Engine <br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; max-width: 400px">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">FourCylinder</span> : <span style="color: #2b91af">IEngine</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">EngineType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;4-Cylinder&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">Rotary</span> : <span style="color: #2b91af">IEngine</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">EngineType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;Rotary&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">SixCylinder</span> : <span style="color: #2b91af">IEngine</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">EngineType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;6-Cylinder&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
And the drive type implementations...<br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; overflow: hidden; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; max-width: 400px">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">RWD</span> : <span style="color: #2b91af">IDriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">DriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;Rear Wheel Drive&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">FourWD</span> : <span style="color: #2b91af">IDriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">DriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;Four Wheel Drive&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">FWD</span> : <span style="color: #2b91af">IDriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">DriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #80ff00">&quot;Front wheel drive&quot;</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
And finally the class we&#39;re going to use as our base car.<br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">BaseAuto</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IDriveType</span> <span style="color: #a5a3a3">_driveType</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #2b91af">IEngine</span> <span style="color: #a5a3a3">_engine</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">DriveType</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_driveType</span>.<span style="color: #a5a3a3">DriveType</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">string</span> <span style="color: #a5a3a3">Engine</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">get</span> { <span style="color: #23b4eb">return</span> <span style="color: #a5a3a3">_engine</span>.<span style="color: #a5a3a3">EngineType</span>; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; [<span style="color: #47b3d1">Inject</span>]
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">BaseAuto</span>(<span style="color: #2b91af">IDriveType</span> <span style="color: #a5a3a3">drive</span>, <span style="color: #2b91af">IEngine</span> <span style="color: #a5a3a3">engine</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_driveType</span> = <span style="color: #a5a3a3">drive</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_engine</span> = <span style="color: #a5a3a3">engine</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
You&#39;ll
notice the <strong>[Inject]</strong> attribute above our constructor. This is basically
telling Ninject to toss in an implementation of the IDriveType and
IEngine interfaces to this constructor (more on&nbsp; <a href="http://www.martinfowler.com/articles/injection.html">Constructor Injection over here</a>). <br />
<br />
Now we&#39;re on to the
fun stuff. Ninject does not use XML to configure injections. Instead
we&#39;re going to use a class called Module to define all that. As the
<a href="http://ninject.org/users-guide.html" target="_blank">documentation</a> says, this class should implement IModule but thankfully
(at least for the sake of testing), there&#39;s a pre-defined base
implementation called StandardModule that we can extend. <br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">BaseModule</span> : <span style="color: #47b3d1">StandardModule</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">override</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">Load</span>()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IEngine</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">Rotary</span>&gt;();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IDriveType</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">RWD</span>&gt;();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
In
the module definition, we&#39;re basically saying when we request an object
from the Kernel (more on that in a sec.) we want the Rotary class in
place of IEngine and the RWD instead of IDriveType. Simple enough, now
lets take a look at the Kernel definition / initial code (I&#39;m using
winforms for the sake of example but you can really go w/ whatever
project type you&#39;d like). A lot of thought went into the naming of the form.<br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">partial</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">Form1</span> : <span style="color: #47b3d1">Form</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">private</span> <span style="color: #47b3d1">BaseAuto</span> <span style="color: #a5a3a3">_rx8</span>;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">Form1</span>()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">InitializeComponent</span>();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">IKernel</span> <span style="color: #a5a3a3">kernel</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">StandardKernel</span>(<span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseModule</span>());
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_rx8</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseAuto</span>(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IDriveType</span>&gt;(),
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IEngine</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; );
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">MessageBox</span>.<span style="color: #a5a3a3">Show</span>(<span style="color: #80ff00">&quot;RX8: \n Drive Type: &quot;</span> + <span style="color: #a5a3a3">_rx8</span>.<span style="color: #a5a3a3">DriveType</span> +
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #80ff00">&quot;\n Engine:&quot;</span> + <span style="color: #a5a3a3">_rx8</span>.<span style="color: #a5a3a3">Engine</span>);
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
And when we run it...<br />
<br />
<img src="/files/rx-8+working.gif" alt="" /><br />
<br />
Just
what we expected! Lets make things a little more interesting ... Say we wanted to add some other cars to our application? We probably
don&#39;t want everything to be a rear-wheel drive rotary (Unless you
really like RX-8&#39;s -- in that case you can <a href="http://www.frickinsweet.com" target="_blank">buy my RX8</a> *shameless plug*).
Anyways, we&#39;re going to accomplish this by changing up our Module a bit
to bind to a different IEngine / IDriveType implementation depending on
the <a href="http://kohari.org/2008/03/13/context-variables-in-ninject/" target="_blank">context</a>. <br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">class</span> <span style="color: #47b3d1">BaseModule</span> : <span style="color: #47b3d1">StandardModule</span>
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #23b4eb">override</span> <span style="color: #23b4eb">void</span> <span style="color: #a5a3a3">Load</span>()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IEngine</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">Rotary</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;RX8&quot;</span>));&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IDriveType</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">RWD</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;RX8&quot;</span>));
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IEngine</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">SixCylinder</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;Jetta&quot;</span>));
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IDriveType</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">FWD</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;Jetta&quot;</span>));
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IEngine</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">FourCylinder</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;WRX&quot;</span>));
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">Bind</span>&lt;<span style="color: #2b91af">IDriveType</span>&gt;().<span style="color: #a5a3a3">To</span>&lt;<span style="color: #47b3d1">FourWD</span>&gt;()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; .<span style="color: #a5a3a3">Only</span>(<span style="color: #47b3d1">When</span>.<span style="color: #a5a3a3">Context</span>.<span style="color: #a5a3a3">Variable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>).<span style="color: #a5a3a3">EqualTo</span>(<span style="color: #80ff00">&quot;WRX&quot;</span>));
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
Not
too bad right? I mean, just looking at the code we can pretty much tell
what&#39;s going on due to the Fluent Interface goodness. We can perform
more powerful comparisons on our context variable but for now, this
will work. Next we need to set up our context in the core part of our
application <br />
(where we&#39;re instantiating and requesting classes from our Kernel).<br />
<br />
<div style="background: #1b1b1b none repeat scroll 0% 50%; font-family: Consolas; font-size: 9pt; color: white; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial">
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #23b4eb">public</span> <span style="color: #a5a3a3">Form1</span>()
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">InitializeComponent</span>();
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #2b91af">IKernel</span> <span style="color: #a5a3a3">kernel</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">StandardKernel</span>(<span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseModule</span>());
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_rx8</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseAuto</span>(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IDriveType</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;RX8&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ),
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IEngine</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;RX8&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; )
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; );
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_jetta</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseAuto</span>(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IDriveType</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;Jetta&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ),
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IEngine</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;Jetta&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; )
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; );
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">_wrx</span> = <span style="color: #23b4eb">new</span> <span style="color: #47b3d1">BaseAuto</span>(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IDriveType</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;WRX&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ),
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #a5a3a3">kernel</span>.<span style="color: #a5a3a3">Get</span>&lt;<span style="color: #a5a3a3">Auto</span>.<span style="color: #2b91af">IEngine</span>&gt;(
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span style="color: #47b3d1">With</span>.<span style="color: #a5a3a3">Parameters</span>.<span style="color: #a5a3a3">ContextVariable</span>(<span style="color: #80ff00">&quot;carType&quot;</span>, <span style="color: #80ff00">&quot;WRX&quot;</span>)
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; )
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; );
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;
</p>
<p style="margin: 0px; padding: 0px">
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</p>
</div>
<br />
<br />
I&#39;ve added some buttons so we don&#39;t get spammed with message boxes on
form load... if we fire this off and click on the various buttons, we
see we&#39;re getting the expected results!<br />
<br />
<table border="0">
	<tbody>
		<tr>
			<td><img src="/files/screen.gif" alt="" /></td>
			<td><img src="/files/rx-8+working.gif" alt="" /></td>
		</tr>
		<tr>
			<td><img src="/files/jetta.gif" alt="" /></td>
			<td><img src="/files/wrx.gif" alt="" /></td>
		</tr>
	</tbody>
</table>
<p>
<br />
All in all, I&#39;m liking Ninject for more than just the name -- I can definitely
see myself using this in small to medium sized apps. Please let me know
what you think...
</p>
<p>
More info on Ninject:
</p>
<ul>
	<li><a href="http://ninject.org/" target="_blank">Project Site</a></li>
	<li><a href="http://groups.google.com/group/ninject" target="_blank">Google Group</a></li>
	<li><a href="http://www.jaltiere.com/?p=23" target="_blank">Jack Altiere on Learning Dependency Injection</a></li>
</ul>
