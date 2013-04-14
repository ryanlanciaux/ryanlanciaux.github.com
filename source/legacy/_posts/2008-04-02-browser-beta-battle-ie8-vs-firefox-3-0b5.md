---
layout: post
title: Browser Beta Battle - IE8 vs Firefox 3.0b5
date: 2008-04-02 22:38
comments: false
categories: [browsers, web]
---
<p>
After reading <a href="http://www.stevesouders.com/" target="_blank">Steve Souders&#39;</a> article on <a href="http://www.stevesouders.com/blog/2008/03/10/ie8-speeds-things-up/" target="_blank">IE8 speed enhancements</a>, I became curious about how page download times in <a href="http://www.microsoft.com/windows/products/winfamily/ie/ie8/default.mspx" target="_blank">IE8</a> stacked up against the latest beta of <a href="http://www.mozilla.com/en-US/firefox/all-beta.html" target="_blank">Firefox (3.0b5)</a>. I realize that both of these browsers are in beta so the release product may be signficantly different. Also, please keep in mind these results are not very scientific (obviously). To obtain download times, I used <a href="http://www.fiddlertool.com/fiddler/" target="_blank">Fiddler</a> for <a href="http://www.microsoft.com/windows/products/winfamily/ie/ie8/default.mspx" target="_blank">Internet Explorer</a> and <a href="https://addons.mozilla.org/en-US/firefox/addon/1843" target="_blank">Firebug </a>for <a href="http://www.mozilla.com/en-US/firefox/all-beta.html" target="_blank">Firefox</a>.
</p>
<p>
First off, I loaded a several higher volume websites to compare page download times. Each page was loaded three times (for extreme statistical accuracy :P) and the average load time was calculated.
</p>
<h2 style="margin: 0px; padding: 0px">
Google News</h2>
<a href="http://news.google.com" target="_blank">http://news.google.com </a>
<br />
<br />
<div style="border: 1px solid #656565; background-color: #ededed; width: 355px">
0 Javascript Requests - 0 CSS Requests - 32 Images
</div>
<table border="0">
	<tbody>
		<tr>
			<td align="right"><strong>Firefox:</strong></td>
			<td>1.08 Seconds</td>
		</tr>
		<tr>
			<td align="right"><strong>IE8:</strong></td>
			<td>2.43 Seconds</td>
		</tr>
	</tbody>
</table>
<br />
<br />
<h2 style="margin: 0px; padding: 0px">
Amazon
</h2>
<a href="http://www.amazon.com" target="_blank">http://www.amazon.com</a><br />
<br />
<div style="border: 1px solid #656565; background-color: #ededed; width: 355px">
12 Javascript Requests - 2 CSS Requests - 96 Images
</div>
<table border="0">
	<tbody>
		<tr>
			<td align="right"><strong>Firefox:</strong></td>
			<td>5.59 Seconds</td>
		</tr>
		<tr>
			<td align="right"><strong>IE8:</strong></td>
			<td>4.86 Seconds</td>
		</tr>
	</tbody>
</table>
<br />
<br />
<h2 style="margin: 0px; padding: 0px">
Mac.com
</h2>
<a href="http://www.mac.com" target="_blank">http://www.mac.com</a><br />
<br />
<div style="border: 1px solid #656565; background-color: #ededed; width: 355px">
15 Javascript Requests - 6 CSS Requests - 44 Images
</div>
<table border="0">
	<tbody>
		<tr>
			<td align="right"><strong>Firefox:</strong></td>
			<td>5.74 Seconds</td>
		</tr>
		<tr>
			<td align="right"><strong>IE8:</strong></td>
			<td>4.52 Seconds</td>
		</tr>
	</tbody>
</table>
<br />
<br />
<p>
Finally, I ran <a href="http://stevesouders.com/hpws/parallel-downloads.php" target="_blank">Steve Souders&#39; Parellel downloads test</a>; the results were almost identical.
</p>
<table border="0" style="border: 1px solid ">
	<tbody>
		<tr>
			<td bgcolor="#ededed"><strong>Firefox</strong></td>
		</tr>
		<tr>
			<td><img src="/files/firefox.gif" alt="" /></td>
		</tr>
	</tbody>
</table>
<br />
<table border="0" style="border: 1px solid ">
	<tbody>
		<tr>
			<td bgcolor="#ededed"><strong>Internet Explorer</strong></td>
		</tr>
		<tr>
			<td><img src="/files/ie8.gif" alt="" /></td>
		</tr>
	</tbody>
</table>
<br />
<br />
<p>
It was really odd to me that Google News loaded almost two times as fast on Firefox while all the other sites loaded close to the same speed or slightly faster on Internet Explorer. The only difference I notice off the bat is the number of JS/CSS files; maybe its something to do with that? It would be very interesting to see how the browsers compare when rendering pages. Have you found results similar to this or know of a good way to test render time? Let me know what you think.
</p>

