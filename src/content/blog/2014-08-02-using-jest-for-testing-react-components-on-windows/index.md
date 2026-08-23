---
title: "Test React Components Using Jest (on Windows)"
date: "2014-08-02T12:37:03.284Z"
path: "/blog/2014/08/02/using-jest-for-testing-react-components-on-windows/"
---

I'm currently going through the process creating unit tests for [Griddle](http://dynamictyped.github.io/Griddle) and thought it would be good to document the steps I took to get Jest up and running. I did not find it as simple as typing `npm install -g jest-cli`, however it was not too bad.

My primary machine is running Windows 8 -- these steps may be a bit different if you're on Mac / Linux.

1. **Install Python** - Install version 2.7 of Python and add it to your path or create a `PYTHONPATH` environment variable.
2. **Install Visual Studio (Express Edition is Fine)** - Thankfully, this step was not required for me as I already use Visual Studio. We will need this for some of modules that are compiled when we are installing Jest. (Express editions available [here](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx) -- get one of the versions that has C++)
3. **Set Visual Studio Version Flags** - this step tripped me up a bit at first. We need to tell node-gyp (something that is used for compiling addons) what version of Visual Studio we want to compile with. You can do this either through an environment variable `GYP_MSVS_VERSION` or the command line option `--msvs_version`. My environment variable looks a bit like this `GYP_MSVS_VERSION=2013` but if you are using Express, I think you have to say `GYP_MSVS_VERSION=2013e`
4. **Install Jest-CLI** - Now you can run the command on the [Jest docs site](http://facebook.github.io/jest/docs/getting-started.html#content) `npm install jest-cli --save-dev`

At this point you should be ready to run Jest, however, I experienced some further trouble on Windows against React components. In the [react example](http://facebook.github.io/jest/docs/tutorial-react.html#content), the package.json contains `"unmockedModulePathPatterns": ["<rootDir>/node_modules/react"]` which is basically stating that we don't want to mock React when running our tests. Unfortunately, it seemed like we need to change this path to just `"unmockedModulePathPatterns": ["react"]` in order for the test to run successfully (again on Windows -- seems fine on other OS). See [this GitHub issue](https://github.com/facebook/jest/issues/100) for more on that.

For more reading on installing Jest's requirements see:

* [http://www.steveworkman.com/node-js/2012/installing-jsdom-on-windows/](http://www.steveworkman.com/node-js/2012/installing-jsdom-on-windows/)
* [https://github.com/atom/atom/issues/2435](https://github.com/atom/atom/issues/2435)
