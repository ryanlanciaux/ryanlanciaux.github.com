---
layout: post
title: IE8 vs Firefox 3.0b5 JavaScript Part 1
date: 2008-04-12 23:24
comments: true
categories: [browsers, web]
---
<p>
Last time I posted on the latest browser from Microsoft vs. Mozilla&#39;s latest I had compared page download times between the two browsers. This time, I would like to take a brief look at how they stack up in regard to JavaScript. 
</p>
<p>
<a href="http://ejohn.org/" target="_blank">John Resig</a> (of <a href="http://www.jquery.com" target="_blank">jQuery </a>/ <a href="http://www.mozilla.org">Mozilla </a>fame) announced the <a href="http://dromaeo.com/" target="_blank">Dromaeo: Javascript Performance Testing</a> suite yesterday. The suite runs some of the same tests as the <a href="http://webkit.org/" target="_blank">WebKit </a>team&#39;s <a href="http://webkit.org/perf/sunspider-0.9/sunspider.html" target="_blank">SunSpider</a>, however, there are some improved methodolgies (see the suite&#39;s <a href="http://wiki.mozilla.org/Dromaeo" target="_blank">wiki </a>for more info on this). I don&#39;t know how often I feel like doing DNA Sequence Alignment in JavaScript but I think it would be a good way to quickly get some metrics of how both FireFox and IE8 handle the code.
</p>
<h2>The Comparison:</h2>
<p>
I ran the tests in groups because there were certain ones that were not finishing under IE8. To be quite honest, I&#39;m not 100% sure if this is an Internet Explorer issue, or an issue with the tests. Both are a work in progress so I would rather not make assumptions at this point. Anyways, the results of the tests are listed below: 
</p>
<table border="1" style="border: 1px none ; border-spacing: 0px">
	<tbody>
		<tr>
			<th>Test Name <br />
			</th>
			<th>Firefox 3.0 beta 5</th>
			<th>Internet Explorer 8</th>
		</tr>
		<tr>
			<td>Fannkuch v122</td>
			<td>802.80ms</td>
			<td>1032.20ms</td>
		</tr>
		<tr>
			<td>Base 64 Encoding and Decoding v122:</td>
			<td>2942.00ms</td>
			<td>Would not finish</td>
		</tr>
		<tr>
			<td>DNA Sequence Alignment v116:</td>
			<td>420.00ms</td>
			<td>Would not finish</td>
		</tr>
		<tr>
			<td>N-Body Rotation and Gravity v122:</td>
			<td>270ms</td>
			<td>529.40ms</td>
		</tr>
		<tr>
			<td>Prime Number Computation (2) v122:</td>
			<td>305.80ms</td>
			<td>518.20ms</td>
		</tr>
		<tr>
			<td>Recursive Number Calculation v122:</td>
			<td>184.40ms</td>
			<td>417.80ms</td>
		</tr>
		<tr>
			<td>Traversing Binary Trees v122:</td>
			<td>156.80ms</td>
			<td>422.20ms</td>
		</tr>
	</tbody>
</table>
<br />
<h2>The Results</h2>
<p>
The initial results look like Firefox is performing the more advanced Javascript operations faster than Internet Explorer. That being said, Dromaeo, IE8 and Firefox 3.0b5 are still being developed so a lot could change before the release. For more metrics <a href="http://dromaeo.com/?id=250,246,251,256" target="_blank">view a comparison</a> on the Dromaeo site of Safari 3.1, Firefox 3.0b5, Opera 9.5 and IE8b1. Let me know what you think or if you&#39;ve encountered different results.
</p>
