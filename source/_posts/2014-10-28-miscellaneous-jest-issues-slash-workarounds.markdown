---
layout: post
title: "Miscellaneous Jest Issues/Workarounds"
date: 2014-10-28 20:44
comments: true
categories: [js, react, jest, testing]
---
I've been using Jest a bit lately and wanted to document some issues I've run into for future reference. 

##Debugging Jest Tests##

Recently I had a test that was failing and from looking at the stack trace it wasn't really clear why. I followed some advice I had seen about running jest in-band and then [running node-inspector](http://ryanlanciaux.github.io/blog/2014/05/25/debugging-express-applications/). Every time I tried to run node-inspector, however, it failed. Similar to the issue I encountered in [my previous post](http://ryanlanciaux.github.io/blog/2014/10/28/react-plus-jest-testing-on-windows-ii/), it appears that there is a [forthcoming fix](https://github.com/facebook/jest/pull/153). 

Until the fix makes it's way into the release version, following the steps in [this stackoverflow post](http://stackoverflow.com/questions/25142173/debugging-jest-test-cases-using-node-inspector/26415442#26415442) should allow test debugging. Like the solution author, I'm not super thrilled about modifying the jest.js file outright but it's nice to be able to debug the tests.

##Mocking Third-Party Libraries (that aren't CommonJS modules)##

Another issue I've encountered is testing components that wrap third-party libraries that are not CommonJS modules. I tried a couple different hacks to try to shim the library in question into something that would load as a CommonJS module but ultimately was unsuccessful in the time I wanted to spend on that.
 
Thankfully, [a post in the React Google Group](https://groups.google.com/forum/#!topic/jestjs/EJGZcNtbW78) led me to use [Manual mocks](http://facebook.github.io/jest/docs/manual-mocks.html) as a way to work around these third-party libraries.  

Creating a manual mock is pretty simple. Just create a new folder called `__mocks__` at the same level as the `__tests__` directory and create a CommonJS module with the same name/properties as the third-party module that is being mocked. Adding `var someModule = require('moduleName')` will cause `someModule` to get replaced with the mock when running through jest. Finally, set the third-party library as an [external module in webpack.config.js](http://webpack.github.io/docs/library-and-externals.html) and everything should be good-to-go for both the test and the "compiled" version of the code. 


