---
title: "Snowpack with React"
date: "2020-01-14T07:15:03.284Z"
path: "/blog/2020/01/14/snowpack-with-react/"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/pUUAil_9yIw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In this article, we're going to build a React application using [Snowpack](https://www.snowpack.dev/). [Snowpack](https://www.snowpack.dev/) is one of the technologies I'm most excited about right now. It's a little bit like bundler in that it's responsible for preparing an application's third-party dependencies for use on the web but it has enough differences to make it a compelling tool to explore. Instead of building every time you save your code, [Snowpack](https://www.snowpack.dev/) can do it's work after you install a dependency. Lets take a look. ([The demo application we'll be building in this article is available here](https://github.com/ryanlanciaux/snowpack-demo))

## Getting started

We're going to create a new project. Instead of starting our project with Create React App, Gatsby, Next, etc. we're simply going to create a new folder, cd into that folder, and run `npm init`

```
> mkdir snowpack-demo
> cd snowpack-demo
> npm init
```

Once that's complete, we're going to install a couple of development dependencies. We'll start by including `snowpack`, followed by `@babel/core`, `@babel/cli`, and `@babel/preset-react`.

```
> yarn add --dev snowpack
> yarn add --dev @babel/core @babel/cli @babel/preset-react
```

Traditionally, we could run `snowpack` through `npx` but we'll be using snowpack's babel plugin a little later in this example.

## Why Babel?

Speaking of Babel, you might be asking yourself why we're using Babel with Snowpack. This is a totally valid question as Babel is usually not required with Snowpack.

We're going to use JSX with our application. Unfortunately, the browser would have no idea how to handle JSX, so we're going to use Babel to help translate our code into something that the Browser can understand. Additionally, since we're using already using Babel, we're going to use Snowpacks's optional Babel plugin that will allow us to used named imports rather than importing by URL. What this means is traditionally, with Snowpack, we'd import React and ReactDOM like this.

```javascript
import React from "/web_modules/react.js"
import ReactDOM from "/web_modules/react-dom.js"
```

With the (optional) Babel plugin, we can import our modules in a way that may be more familiar if we're used to things like Create React App, etc.

```javascript
import React from "react"
import ReactDOM from "react-dom"
```

Behind the scenes, we're still using the files in the `web_modules` directory created by Snowpack. The Babel plugin is translating the name to this path for us.

## Include React

With that out of the way, we're going to add React and ReactDOM to our project. Currently, React doesn't support ES Modules. Fortunately, some in the community have a version of React that we can use that does support ES Modules (as noted in [the Snowpack docs](https://www.snowpack.dev/#react)).

```
yarn add react@npm:@reactesm/react react-dom@npm:@reactesm/react-dom
```

Now, if we run `yarn snowpack` we can watch Snowpack perform some work against our included modules.

```
> yarn snowpack
✔ snowpack installed: react, react-dom [0.79s]
✨  Done in 2.03s.
```

We can take a look at our `web_modules` directory and see that Snowpack created files for our newly included modules and an [import map](https://github.com/WICG/import-maps) that we could use for browsers that support them.

```
> ls web_modules
import-map.json
react.js
react-dom.js
```

Next, we'll add [live-server](https://www.npmjs.com/package/live-server), the tool we'll use to serve our files locally.

```
yarn add --dev live-server
```

We're finally ready to start editing our code. We'll start by creating a boilerplate HTML page. This page will have an element with an id of `app` where we'll attach our React application. Additionally, we'll include a JavaScript app that lives in `lib/app.js`. This file doesn't exist currently but we'll take care of that shortly.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello world example!</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/lib/app.js"></script>
  </body>
</html>
```

We'll add a `.babelrc` file where we'll add our Babel configuration

```javascript
{
  "plugins": [["snowpack/assets/babel-plugin.js", {}]],
  "presets": ["@babel/preset-react"]
}
```

Next, we'll create a very basic React application in `src/app.js`

```javascript
import React from "react"
import ReactDOM from "react-dom"

const App = () => <h1>Hello everyone!</h1>

ReactDOM.render(<App />, document.getElementById("app"))
```

We can run this application in watch mode with the following commands.

```
yarn babel src --out-dir lib --watch
```

This runs babel against our `src` directory and writes the transpiled files to a `lib` directory (what we reference in `index.html`)

```
yarn live-server
```

This command runs live-server to watch our HTML / JavaScript for changes. Generally, I would write a script or use something like [concurrently](https://www.npmjs.com/package/concurrently) that would run the two commands together as an `npm script.` For the sake of example, however, I like to focus on these items individually.

If we navigate to our browser and open the page (by default, localhost:8080) we should be greeted with the following:

<img src="hello.png" />

Finally, we'll make some adjustments to our application to automatically run Snowpack when we include new dependencies. If we jump back to our `package.json` file, we're going to add a `prepare` script in the `scripts` object:

```javascript
{
  "name": "snowpack-demo",
  ...
  "scripts": {
    "prepare": "npx snowpack",
    ...
  },
```

This `prepare` script will run in a couple specific instances, most notably for us, after we install a new dependency. Now if we include [styled-components](https://styled-components.com/), we should see Snowpack running for us without any manual intervention.

```
yarn add styled-components
yarn add v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
...
success Saved 1 new dependency.
info Direct dependencies
└─ styled-components@5.0.0
info All dependencies
└─ styled-components@5.0.0
$ npx snowpack
✔ snowpack installed: react, react-dom, styled-components. [0.75s]
✨  Done in 3.73s.
```

Notice that Snowpack command that occured after yarn finished including the dependency. We can continue to [Use Storybook like we would outside of an application configured with Snowpack](http://ryanlanciaux.com/blog/2020/01/09/an-introduction-to-styled-components/)

[Check out the demo application from this article here](https://github.com/ryanlanciaux/snowpack-demo).

I'm very excited about the developer experience, and performance benefits that Snowpack could unlock. I'd love to hear about any of the strategies you're using to bundle your applications or of any thoughts you have on this article. Please [find me on Twitter at @ryanlanciaux](https://twitter.com/ryanlanciaux)
