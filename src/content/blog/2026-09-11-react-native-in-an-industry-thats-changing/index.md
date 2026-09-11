---
title: "React Native in an Industry That’s Changing"
date: "2026-09-11T00:00:00.000Z"
path: "/blog/2026/09/11/react-native-in-an-industry-thats-changing/"
ogImage: "./og-image.png"
draft: false
---

Shopify is moving from React Native to Swift / Kotlin. [The article](https://shopify.engineering/back-to-native) was interesting, and I highly recommend reading it. My takeaway is that agents change the dynamics around building software. Although React Native was a huge success for them, it's no longer how they want to build their mobile apps in 2026.

This isn't a post critiquing anyone else's tech choices. As technologists, we should be trying to build the best software we can. Sometimes React Native is the right tool for that, and sometimes something else is. Shopify explained why native makes sense for them, but the reaction has become a broader conversation about whether React Native still makes sense at all. I think React Native is still very relevant with agentic development.

## What are we optimizing for?

Building good software involves setting goals and managing trade-offs. We should make decisions that get us closest to those goals while avoiding unnecessary tech debt or choices that paint us into a corner.

We can learn a lot from how other teams build software, but their goals aren't necessarily our goals, and the trade-offs they consider may not be the same trade-offs we encounter.

[Satyajit Sahoo makes a similar point](https://x.com/satya164/status/2098113622249480657) about choosing tools based on the problems we need them to solve.

## When agents write the code

Agents definitely make it easier to write code, even in a stack you don't know. Like Shopify, you can take an existing codebase and use it as a starting point for another implementation. With agents, writing code is less of a burden. Agents can help with reviewing and testing too, but ensuring correctness still takes work.

### Sharing an implementation

Using React Native doesn't guarantee a correct app, but it can reduce the review burden because shared features have one implementation to review rather than two. Shared code still needs testing on both platforms, but fixes to that code can benefit both. That benefit compounds as the app changes over time.

### The React Native ecosystem

As Alex Mikucki points out below, the React Native ecosystem has years of community work addressing platform quirks and edge cases. Agents can help us solve those problems again, but they don't make that work free.

<div class="react-native-post-embed">
<blockquote class="twitter-tweet"><a href="https://x.com/aleqsio/status/2098103071259668557">Read aleqsio's post about React Native</a></blockquote>
</div>

## Native where it makes sense

Choosing React Native also means we can use native code where it makes sense. We can share much of our code between platforms while writing platform-specific features as needed.

Tools like [Nitro Modules](https://nitro.margelo.com/) and React Native’s [Turbo Native Modules](https://reactnative.dev/docs/turbo-native-modules-introduction) help connect the two.

### Performance

React Native can be fast, and performance tuning is something we could spend a lot of time on while building an app. But what do we mean by fast, and how do we know when we've done enough? Our performance goals should help us answer those questions. Depending on those requirements, even in a fully native codebase, the choices may extend beyond [Swift](https://developer.apple.com/videos/play/wwdc2023/10172/) and [Kotlin](https://developer.android.com/ndk/guides).

## Still bullish on React Native

Agents are changing the entire software development industry and no language or framework is immune to this change. I'm still bullish on React Native. Sharing an implementation, building on the ecosystem's experience, and having the ability to use native code where it makes sense are compelling to me, even when agents write a lot of the code.

<div class="react-native-post-embed">
<blockquote class="twitter-tweet"><a href="https://x.com/ryanlanciaux/status/2094469011102642179">Read my August 31 post about being bullish on React Native</a></blockquote>
</div>

## Further reading

- [Native is now the future of mobile at Shopify](https://shopify.engineering/back-to-native)
- [Shop app migration](https://shopify.engineering/shop-app-migration)
- [aleqsio on React Native evolving and the value of abstractions](https://x.com/aleqsio/status/2098103071259668557)
- [satya164 on choosing tools for your needs](https://x.com/satya164/status/2098113622249480657)
- [How Kraken fixed performance issues through incremental adoption of React Native's New Architecture](https://blog.kraken.com/product/engineering/how-kraken-fixed-performance-issues-via-incremental-adoption-of-the-react-native-new-architecture)

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script>
  document.addEventListener("astro:page-load", () => {
    window.twttr?.widgets?.load()
  })
</script>

<style>
  .react-native-post-embed {
    display: flow-root;
  }
  .react-native-post-embed .twitter-tweet {
    float: none !important;
    margin-inline: 0 !important;
  }
</style>
