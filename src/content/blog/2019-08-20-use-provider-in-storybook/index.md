---
title: "Use a Provider component in Storybook"
date: "2019-08-20T07:15:03.284Z"
path: "/blog/2019/08/20/use-provider-in-storybook/"
---

## Storybook is awesome for building components

I frequently use [Storybook](https://storybook.js.org/) and [styled components](https://www.styled-components.com/) / [Emotion](https://emotion.sh/docs/introduction) when building component libraries. The ability to apply a consistent theme to all components is very powerful but it requires wrapping your components in a [ThemeProvider](https://www.styled-components.com/docs/advanced).

Thankfully, there is a straight-forward way to apply a consistent theme object to all of our components in Storybook by using a [Storybook Decorator](https://storybook.js.org/docs/basics/writing-stories/#using-decorators).

## Create a theme decorator

We will start by creating a new decorator. In my current projects, this decorator lives in the `.storybook` folder.

```javascript
// themeDecorator.js
import React from "react"
import { ThemeProvider, theme } from "./pathToThemeProvider"

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator
```

Here we include our custom theme provider and define a component that receives a `storyFn` as a prop. This `storyFn` is where the Storybook content will be rendered. We wrap the Storybook content in our provider and export our decorator.

Next, in our project's `.storybook/config.js`, we need to specify that Storybook should use this decorator for all stories.

## Use the theme decorator in Storybook config

We'll start by importing our newly created decorator and make sure that we're using the `addDecorator` method from Storybook.

```javascript
import { configure, addDecorator } from "@storybook/react"
import themeDecorator from "./themeDecorator"
```

Next, we'll want to call the following to apply our decorator.

```
addDecorator(themeDecorator);
```

Storybook should now be wrapping all stories with a custom decorator. While this article is specifically about CSS-in-JS themes, this strategy works with other types Providers / Wrapper components as well (like [Redux](https://react-redux.js.org/api/provider)).
