---
title: "Releasing node packages"
date: "2017-08-20T05:52:03.284Z"
path: "/blog/2017/08/20/releasing-node-packages/"
---

When releasing a new version of an open source project, it's important to make sure a series of things happen in the same order for every release. I've attempted to make a "script" I follow for releasing [Griddle](http://griddlegriddle.github.io/Griddle) to npm that helps promote consistent releases and (as much as possible) illuminates any issues before they impact others using the package.

1. Run all tests and local "[smoke-tests](http://softwaretestingfundamentals.com/smoke-testing/)"
1. Update the version in package.json
1. Update CHANGELOG.md with any high-level changes
1. Push package.json and CHANGELOG.md to the master branch of the project
1. Release to npm as a tagged, pre-release version. Generally, this would be done by running `npm publish --tag next` (or whatever you want to call your pre-release version). This lets you test your project as a npm package without making it the version that is installed when running `npm install` or `yarn add`. In Griddle, we generally run this through `npm run ship-it` which essentially runs our build script and then pushes the output as a pre-release package. [See this blog post](https://blog.greenkeeper.io/one-simple-trick-for-javascript-package-maintainers-to-avoid-breaking-their-user-s-software-and-to-6edf06dc5617) for more thoughts on this pre-release strategy.
1. From here, I generally install the new, pre-release version on the `griddle-docs` project as well as some of my own projects that use the library. I do this to help ensure that there are no known regressions before making this version the `@latest` tag in npm.
1. If all is successful, it's time to officially release this version -- `npm dist-tag griddle-react@1.8.0 latest`

While following a script doesn't ensure there will be zero issues, it does help avoid common mistakes or makes things very clear where there is a problem in the process.
