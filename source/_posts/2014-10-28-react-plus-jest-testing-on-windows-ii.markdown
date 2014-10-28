---
layout: post
title: "React + Jest Testing on Windows II"
date: 2014-10-28 03:14
comments: true
categories: [js, react, jest, testing]
---

Last time I wrote about running [Jest on Windows](http://ryanlanciaux.github.io/blog/2014/08/02/using-jest-for-testing-react-components-on-windows/) there was one thing I left out. The test output would show if the tests pass or fail but no data is displayed regarding why they fail. This is due to an [issue with stdio in Windows](https://github.com/joyent/node/issues/3584), however, there appears to be [a fix in the works](https://github.com/facebook/jest/pull/111).

Until that fix makes its way into a released version of Jest, you can simply copy bin/jest.js from [Connor Malone's branch on GitHub](https://github.com/malonecj/jest) as a workaround. If using the file outright doesn't sound desirable, any line that has `process.exit(0)` can be wrapped in a `process.on('exit')` block:

```
process.on('exit', function(){
  process.exit(0);
});
```

See the diff of the modified code [here](https://github.com/malonecj/jest/commit/3e66e456f4c612126053483508d89f4751966f45).
