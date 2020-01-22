---
title: "Nullish Coalescing in JavaScript"
date: "2020-01-22T07:15:03.284Z"
path: "/blog/2020/01/22/nullish-coalescing-in-javascript/"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/CJWFr6VJ_A4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Nullish Coalescing is a language feature of JavaScript that was recently promoted to Stage 4 by TC39, the group that maintains the definition of JavaScript. This means that this language feature is valid JavaScript as of ES2020.

With any language feature, it's good to understand how it helps us. Nullish Coalescing helps us eliminate a certain class of code that primarily consists of checking if something is null or undefined.

Lets take an example where we're we want to display a Star Wars character's first and last name. When the last name is undefined, we should show "Not Specified", but if the last name is "" we should treat it like the character doesn't have a last name. (noting that if this was not example code we would probably want to implement different logic for this)

For instance, if we had the following character definitions:

```
const hanSolo = {
  first: 'Han',
  last: "Solo"
};

const chewbacca = {
  first: "Chewbacca",
  last: ""
}

const rey = {
  first: "Rey",
  lastName: undefined
}
```

Lets assume that we had a function, `displayName` that was responsible for obtaining the character's full name for display.

We may be tempted to reach for a logical OR operator like follows.

```
function displayName(character) {
  const lastName = character.last || "Not specified"

  log(character.first, lastName)
}
```

This would work well for `hanSolo` and `rey` but would fall short for Chewbacca, since we're specifying that his last name is "" (meaning he has no last name for our simple example). The `""` is evaluated as falsy, so the logical OR operator would evaluate to "Not specified" in this case. This fails to meet our requirements because a lastname of "" should not cause the `displayName` function to append "Not specified"

Without the null coalescing operator, we'd generally have to check for lastName being null or undefined since an empty string is evaluated as falsy.

If we change our function to the following, everything works as expected, however it's a bit more code.

```
function displayName(character) {
 const lastName = character.last === null || character.last === undefined
  ? 'Not Specified'
  : character.last;

  log(character.first, lastName)
}
```

Using the nullish coalescing operator is a lot more focused:

```
function displayName(character) {
  const lastName = character.last ?? "Not specified"

  log(character.first, lastName)
}
```

This is very similar to the function using the logical OR "||" except we're using two question marks instead "??"

Please [find me on Twitter at @ryanlanciaux](https://twitter.com/ryanlanciaux)
