webpackJsonp([0xef47e37750d80000],{"./node_modules/css-loader/lib/css-base.js":function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},"./node_modules/element-resize-event/index.js":function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&r(t.__resizeRAF__),t.__resizeRAF__=o(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var o=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),r=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function o(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var r,i=this,s=i.document,a=s.attachEvent;if("undefined"!=typeof navigator&&(r=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],a)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var l=e.__resizeTrigger__=s.createElement("object");l.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),l.setAttribute("class","resize-sensor"),l.__resizeElement__=e,l.onload=o,l.type="text/html",r&&e.appendChild(l),l.data="about:blank",r||e.appendChild(l)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var o=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(o?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},"./node_modules/performance-now/lib/performance-now.js":function(e,t,n){(function(t){(function(){var n,o,r;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-r)/1e6},o=t.hrtime,n=function(){var e;return e=o(),1e9*e[0]+e[1]},r=n()):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(t,n("./node_modules/process/browser.js"))},"./node_modules/prismjs/themes/prism-okaidia.css":function(e,t,n){t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(),t.push([e.id,"code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:none;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#272822}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#f8f8f2}.namespace{opacity:.7}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}",""])},"./node_modules/process/browser.js":function(e,t){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(e){if(u===setTimeout)return setTimeout(e,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(e,0);try{return u(e,0)}catch(t){try{return u.call(null,e,0)}catch(t){return u.call(this,e,0)}}}function i(e){if(c===clearTimeout)return clearTimeout(e);if((c===o||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(e);try{return c(e)}catch(t){try{return c.call(null,e)}catch(t){return c.call(this,e)}}}function s(){f&&m&&(f=!1,m.length?h=m.concat(h):g=-1,h.length&&a())}function a(){if(!f){var e=r(s);f=!0;for(var t=h.length;t;){for(m=h,h=[];++g<t;)m&&m[g].run();g=-1,t=h.length}m=null,f=!1,i(e)}}function l(e,t){this.fun=e,this.array=t}function d(){}var u,c,p=e.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(e){u=n}try{c="function"==typeof clearTimeout?clearTimeout:o}catch(e){c=o}}();var m,h=[],f=!1,g=-1;p.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new l(e,t)),1!==h.length||f||r(a)},l.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=d,p.addListener=d,p.once=d,p.off=d,p.removeListener=d,p.removeAllListeners=d,p.emit=d,p.prependListener=d,p.prependOnceListener=d,p.listeners=function(e){return[]},p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},"./node_modules/raf/index.js":function(e,t,n){for(var o=n("./node_modules/performance-now/lib/performance-now.js"),r="undefined"==typeof window?{}:window,i=["moz","webkit"],s="AnimationFrame",a=r["request"+s],l=r["cancel"+s]||r["cancelRequest"+s],d=!0,u=0;u<i.length&&!a;u++)a=r[i[u]+"Request"+s],l=r[i[u]+"Cancel"+s]||r[i[u]+"CancelRequest"+s];if(!a||!l){d=!1;var c=0,p=0,m=[],h=1e3/60;a=function(e){if(0===m.length){var t=o(),n=Math.max(0,h-(t-c));c=n+t,setTimeout(function(){var e=m.slice(0);m.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return m.push({handle:++p,callback:e,cancelled:!1}),p},l=function(e){for(var t=0;t<m.length;t++)m[t].handle===e&&(m[t].cancelled=!0)}}e.exports=function(e){return d?a.call(r,function(){try{e.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}}):a.call(r,e)},e.exports.cancel=function(){l.apply(r,arguments)}},"./node_modules/react-component-width-mixin/index.js":function(e,t,n){var o=n("./node_modules/react-dom/index.js"),r=n("./node_modules/element-resize-event/index.js");e.exports={getInitialState:function(){return void 0!==this.props.initialComponentWidth&&null!==this.props.initialComponentWidth?{componentWidth:this.props.initialComponentWidth}:{}},componentDidMount:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width}),r(o.findDOMNode(this),this.onResize)},componentDidUpdate:function(){0===o.findDOMNode(this).getElementsByClassName("resize-sensor").length&&r(o.findDOMNode(this),this.onResize)},onResize:function(){this.setState({componentWidth:o.findDOMNode(this).getBoundingClientRect().width})}}},"./node_modules/react-page-width/dist/index.js":function(e,t,n){var o;o=n("./node_modules/react-page-width/dist/resizeListener.js"),e.exports={getInitialState:function(){return this.props.initialPageWidth?{pageWidth:this.props.initialPageWidth}:{}},componentDidMount:function(){return o.on(this.onResize)},componentWillUnmount:function(){return o.off(this.onResize)},onResize:function(e){return this.setState({pageWidth:e})}}},"./node_modules/react-page-width/dist/resizeListener.js":function(e,t,n){var o,r,i,s,a,l;i=n("./node_modules/raf/index.js"),o=void 0,s=[],a=!1,"undefined"!=typeof window&&null!==window&&(o=window.innerWidth),r=function(){if(!a)return a=!0,i(l)},l=function(){var e,t,n;for(o=window.innerWidth,e=0,t=s.length;e<t;e++)(n=s[e])(o);return a=!1},"undefined"!=typeof window&&null!==window&&window.addEventListener("resize",r),e.exports={on:function(e){return e(o),s.push(e)},off:function(e){return s.splice(s.indexOf(e),1)}}},"./node_modules/react-responsive-grid/dist/components/Breakpoint.js":function(e,t,n){var o,r,i,s,a,l;s=n("./node_modules/react/react.js"),a=n("./node_modules/react-component-width-mixin/index.js"),i=n("./node_modules/react-page-width/dist/index.js"),l=n("./node_modules/object-assign/index.js"),o=s.createClass({displayName:"Breakpoint",mixins:[a],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=l({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.componentWidth&&this.props.minWidth<=(t=this.state.componentWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),r=s.createClass({displayName:"Breakpoint",mixins:[i],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=l({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.pageWidth&&this.props.minWidth<=(t=this.state.pageWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),e.exports=s.createClass({displayName:"Breakpoint",propTypes:{widthMethod:s.PropTypes.string.isRequired,minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{widthMethod:"pageWidth"}},render:function(){return"pageWidth"===this.props.widthMethod?s.createElement(r,Object.assign({},this.props)):"componentWidth"===this.props.widthMethod?s.createElement(o,Object.assign({},this.props)):void 0}})},"./node_modules/react-responsive-grid/dist/components/Container.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Container",render:function(){var e,t,n,i;return t={maxWidth:"960px",marginLeft:"auto",marginRight:"auto"},i=r(t,this.props.style),e=this.props.children,n=r({},this.props),delete n.children,delete n.style,o.createElement("div",Object.assign({},n,{style:i}),e,o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Grid.js":function(e,t,n){var o,r;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),e.exports=o.createClass({displayName:"Grid",propTypes:{columns:o.PropTypes.number,gutterRatio:o.PropTypes.number},getDefaultProps:function(){return{columns:12,gutterRatio:.25}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n,r;return"Breakpoint"===(n=null!=(r=t.type)?r.displayName:void 0)||"Span"===n?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.gutterRatio}}):t}}(this))},render:function(){var e;return e=r({},this.props),delete e.gutterRatio,delete e.columns,o.createElement("div",Object.assign({},e),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Span.js":function(e,t,n){var o,r,i;o=n("./node_modules/react/react.js"),r=n("./node_modules/object-assign/index.js"),i=n("./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js"),e.exports=o.createClass({displayName:"Span",propTypes:{context:o.PropTypes.object,columns:o.PropTypes.number,at:o.PropTypes.number,pre:o.PropTypes.number,post:o.PropTypes.number,squish:o.PropTypes.number,last:o.PropTypes.bool,break:o.PropTypes.bool},getDefaultProps:function(){return{at:0,pre:0,post:0,squish:0,last:!1,first:!1,break:!1}},renderChildren:function(){return o.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?o.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.context.gutterRatio}}):t}}(this))},render:function(){var e,t;return t=i({contextColumns:this.props.context.columns,gutterRatio:this.props.context.gutterRatio,columns:this.props.columns,at:this.props.at,pre:this.props.pre,post:this.props.post,squish:this.props.squish,last:this.props.last,break:this.props.break}),t=r(t,this.props.style),e=r({},this.props,{style:t}),delete e.at,delete e.break,delete e.columns,delete e.context,delete e.first,delete e.last,delete e.post,delete e.pre,delete e.squish,delete e.style,o.createElement("div",Object.assign({},e,{style:t}),this.renderChildren(),o.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/index.js":function(e,t,n){t.Container=n("./node_modules/react-responsive-grid/dist/components/Container.js"),t.Grid=n("./node_modules/react-responsive-grid/dist/components/Grid.js"),t.Breakpoint=n("./node_modules/react-responsive-grid/dist/components/Breakpoint.js"),t.Span=n("./node_modules/react-responsive-grid/dist/components/Span.js")},"./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js":function(e,t,n){var o;o=n("./node_modules/object-assign/index.js"),e.exports=function(e){var t,n,r,i,s,a,l,d,u,c;return r={columns:3,at:0,pre:0,post:0,squish:0,contextColumns:12,gutterRatio:.25,first:!1,last:!1},u=o(r,e),d=100/(u.contextColumns+(u.contextColumns-1)*u.gutterRatio),s=u.gutterRatio*d,n=function(e){return d*e+s*(e-1)},t=function(e){return 0===e?0:n(e)+s},c=n(u.columns),a=0===u.at&&0===u.pre&&0===u.squish?0:t(u.at)+t(u.pre)+t(u.squish),u.last&&0===u.post&&0===u.squish?l=0:0!==u.post||0!==u.squish?(l=t(u.post)+t(u.squish),u.last||(l+=s)):l=s,i=u.last?"right":"left",c+="%",a+="%",l+="%",{float:i,marginLeft:a,marginRight:l,width:c,clear:u.break?"both":"none"}}},"./node_modules/typography-breakpoint-constants/dist/index.js":function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LARGER_DISPLAY_WIDTH="1600px",t.LARGE_DISPLAY_WIDTH="1280px",t.DEFAULT_WIDTH="980px",t.TABLET_WIDTH="768px",t.MOBILE_WIDTH="480px",t.LARGER_DISPLAY_MEDIA_QUERY="@media only screen and (max-width:1600px)",t.LARGE_DISPLAY_MEDIA_QUERY="@media only screen and (max-width:1280px)",t.DEFAULT_MEDIA_QUERY="@media only screen and (max-width:980px)",t.TABLET_MEDIA_QUERY="@media only screen and (max-width:768px)",t.MOBILE_MEDIA_QUERY="@media only screen and (max-width:480px)",t.MIN_LARGER_DISPLAY_MEDIA_QUERY="@media (min-width:1600px)",t.MIN_LARGE_DISPLAY_MEDIA_QUERY="@media (min-width:1280px)",t.MIN_DEFAULT_MEDIA_QUERY="@media (min-width:980px)",t.MIN_TABLET_MEDIA_QUERY="@media (min-width:768px)",t.MIN_MOBILE_MEDIA_QUERY="@media (min-width:480px)"},"./node_modules/typography-theme-wordpress-2016/dist/index.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=n("./node_modules/gray-percentage/index.js"),a=o(s),l=n("./node_modules/typography-breakpoint-constants/dist/index.js"),d={title:"Wordpress Theme 2016",baseFontSize:"16px",baseLineHeight:1.75,scaleRatio:2.5,googleFonts:[{name:"Montserrat",styles:["700"]},{name:"Merriweather",styles:["400","400i","700","700i","900","900i"]}],headerFontFamily:["Merriweather","Georgia","serif"],bodyFontFamily:["Merriweather","Georgia","serif"],bodyColor:"hsla(0,0%,0%,0.9)",headerWeight:900,bodyWeight:400,boldWeight:700,overrideStyles:function(e,t){var n,o=e.adjustFontSizeTo,s=e.scale,d=e.rhythm;return n={h1:{fontFamily:["Montserrat","sans-serif"].join(",")},blockquote:i({},s(.2),{color:(0,a.default)(41),fontStyle:"italic",paddingLeft:d(.8125),marginLeft:d(-1),borderLeft:d(3/16)+" solid "+(0,a.default)(10)}),"blockquote > :last-child":{marginBottom:0},"blockquote cite":i({},o(t.baseFontSize),{color:t.bodyColor,fontWeight:t.bodyWeight}),"blockquote cite:before":{content:'"— "'},ul:{listStyle:"disc"},"ul,ol":{marginLeft:0}},r(n,l.MOBILE_MEDIA_QUERY,{"ul,ol":{marginLeft:d(1)},blockquote:{marginLeft:d(-.75),marginRight:0,paddingLeft:d(9/16)}}),r(n,"h1,h2,h3,h4,h5,h6",{marginTop:d(2)}),r(n,"h4",{letterSpacing:"0.140625em",textTransform:"uppercase"}),r(n,"h6",{fontStyle:"italic"}),r(n,"a",{boxShadow:"0 1px 0 0 currentColor",color:"#007acc",textDecoration:"none"}),r(n,"a:hover,a:active",{boxShadow:"none"}),r(n,"mark,ins",{background:"#007acc",color:"white",padding:d(1/16)+" "+d(1/8),textDecoration:"none"}),n}};t.default=d},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":["/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/babel-preset-env/lib/index.js","/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/babel-preset-stage-0/lib/index.js","/Users/ryan/projects/blog/ryanlanciaux.github.com/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/layouts/index.js':function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=n("./node_modules/react/react.js"),u=o(d),c=n("./node_modules/gatsby-link/index.js"),p=o(c),m=n("./node_modules/react-responsive-grid/dist/index.js"),h=n("./src/utils/typography.js");n("./node_modules/prismjs/themes/prism-okaidia.css"),n(!function(){var e=new Error('Cannot find module "../overrides.css"');throw e.code="MODULE_NOT_FOUND",e}());var f=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.location,n=e.children,o=void 0;return o="/"===t.pathname?u.default.createElement("h1",{style:a({},(0,h.scale)(1.5),{marginBottom:(0,h.rhythm)(1.5),marginTop:0})},u.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Software development notes")):u.default.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:(0,h.rhythm)(-1)}},u.default.createElement(p.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Software development notes - Ryan Lanciaux")),u.default.createElement(m.Container,{style:{maxWidth:1024,padding:(0,h.rhythm)(1.5)+" "+(0,h.rhythm)(.75)}},o,n())}}]),t}(u.default.Component);f.propTypes={children:u.default.PropTypes.function,location:u.default.PropTypes.object,route:u.default.PropTypes.object},t.default=f,e.exports=t.default},"./src/utils/typography.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n("./node_modules/typography/dist/index.js"),i=o(r),s=n("./node_modules/typography-theme-wordpress-2016/dist/index.js"),a=o(s),l=new i.default(a.default);t.default=l,e.exports=t.default}});
//# sourceMappingURL=layout-component---index-07a2ce745dd2866b44b5.js.map