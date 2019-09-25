---
title: "Effortless Application bundling: React + Parcel in under 2 minutes"
date: "2019-09-25T07:15:03.284Z"
path: "/blog/2019/09/25/effortless-application-bundling-react-parcel/"
---

`youtube:https://www.youtube.com/embed/59EFVPIxgDk`

## Bundle Web Applications effortlessly

Bundlers are used to take our various source files (JavaScript, CSS, Sass, etc). and prepare them for use in the browser. This article assumes that you're already sold on using a bundler for your JavaScript applications. For more information on bundlers and how they work, [check out this post by Alberto Gimeno
](https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da)

There are many great tools we can use to bundle our applications like [webpack](https://webpack.js.org/), [rollup](https://rollupjs.org/guide/en/), and others. Today, however, I want to focus on Parcel.

## Getting started

While there is very little overhead with Parcel, there are two steps we need to take ([as noted in the Parcel documentation](https://parceljs.org)).

First, we must install parcel as a global dependency: `npm install -g parcel-bundler` OR `yarn global add parcel-bundler`

From there, we need to create a project folder and initialize the project (with a package.json file): `npm init -y` OR `yarn init -y` (remove the `-y` flag if you'd rather walk through the initialization wizard).

## A little code

At this point, we should be good to start writing some code. We'll start by writing a "Hello world" type React component. In the video, I called this SayHello.js and created it in the root of the project folder. In a less contrived project, we might want a little bit more organization (e.g. we could place the JavaScript files under `/src/`).

`SayHello.js`

```javascript
import React from "react"

export default function SayHello({ name }) {
  return <h1>Hello {name}!</h1>
}
```

Next, we'll create an index.js file. We'll treat this file as the location where we will connect our React component with our DOM elements. We haven't created the HTML file yet but let's assume that we will eventually have an element with an id of "main" and we'd like to render our component into this element.

`index.js`

```javascript
import React from "react"
import ReactDOM from "react-dom"
import SayHello from "./SayHello"

ReactDOM.render(<SayHello name="everyone" />, document.getElementById("main"))
```

Finally, we'll create our HTML file that will serve as the entry point of the application. Please note: we're using some contrived markup in this example. Ideally, there would be more in our HTML file (like doctype, title, etc) but for the sake of clarity, we'll keep it pretty light.

`index.html`

```
<html>
  <body>
    <div id="main"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

## Running the application

Now we can jump back to our command line and type `parcel index.html` from the project directory and we should be presented with something like the following indication that our project is now running.

```
➜  testParcel parcel index.html
Server running at http://localhost:1234
⠼ Packaging
✨  Built in 1.52s.
```

Navigate to localhost:1234 in the browser, and we should see our running application.

![The running application](https://thepracticaldev.s3.amazonaws.com/i/ouo112tx6f26thc9ve0r.png)

Please [check out the Parcel documentation for more information](https://parceljs.org/).
