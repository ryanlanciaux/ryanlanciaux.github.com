---
title: "Optional Chaining in JavaScript"
date: "2020-01-31T07:15:03.284Z"
path: "/blog/2020/01/31/optional-chaining-in-javascript/"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/u90I9BuOcmE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In this article, we're going to take a quick look at the new, Optional Chaining operator in JavaScript. This language feature is valid JavaScript as of ES 2020 (the official definition of the language).

To take a look at why I think this feature is compelling, let's assume we have an object that represents a menu for a conference meal plan. Each object represents a different day for the conference and each day can have `breakfast`, `lunch`, and `dinner`.

```
const monday = {
  menuItems: {
    breakfast: {
      items: ['Eggs', 'Oatmeal', 'Cereal']
    },
    lunch: {
      items: ['Sandwich']
    },
    dinner: {
      items: ['Cheeseburger', 'Salads', 'Tempeh Sandwich']
    }
  }
};

const tuesday = {
  menuItems: {
    breakfast: {
      items: ['Cereal', 'Bagel']
    },
    dinner: {
      items: ['Tacos']
    }
  }
};
```

For our example, we'd like to `console.log` the first element of the lunch object. We'll display "No lunch on this day" for any day where lunch is not specified (and therefore not provided). We'll start with the following code.

```
function logLunch(day) {
  const lunchItem = day.menuItems.lunch.items[0];

  console.log(lunchItem || "No lunch on this day");
}


logLunch(monday);
logLunch(tuesday);
```

This function works well for Monday, but fails for the Tuesday object since it only specifies a `breakfast` and `dinner.` Typically we could solve that by ensuring our properties exist before interacting with them. In this case, our expression could look something like this:

```
const lunchItem = day && day.menuItems && day.menuItems.lunch && day.menuItems.lunch.items && day.menuItems.lunch.items[0]
```

It's not very pleasant to guard each property like this!

## Optional Chaining

Thankfully, we can rewrite this line with Optional Chaining to the following:

```
const lunchItem = day?.menuItems?.lunch?.items[0];
```

We're using the `?.` instead of a `.` between properties. This `?.` is the `optional chaining` operator. This entire expression will be evaluated as undefined if any of the properties are null or undefined. Instead of checking these properties, we can express the desired intent much more cleanly with this new operator.

[Check out the example for this article on Codepen](https://codepen.io/ryanlanciaux/pen/KKwLBYp?editors=0012).

I'd love to know of any thoughts you have. You can [find me on Twitter here](https://twitter.com/ryanlanciaux)!
