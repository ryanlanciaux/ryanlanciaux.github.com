---
title: "Native-Surface: Iterate on React Native iOS and Android apps in the browser without React Native Web"
date: "2026-09-16T12:00:00.000Z"
path: "/blog/2026/09/16/native-surface-react-native-browser-iteration/"
ogImage: "./og-image.png"
draft: false
---

Native-Surface is a library that lets you preview React Native screens and components in a browser using a canvas renderer. I like having ways to quickly visualize what I'm building, and I was happy to send AI on a side quest to make that happen.

<video src="/videos/native-surface-demo-silent.mp4" width="414" height="674" controls autoplay muted loop playsinline aria-label="Native-Surface demo showing a Places screen with an Open sheet button." style="margin-inline: auto; border: 1px solid var(--line); border-radius: var(--radius);"><a href="/videos/native-surface-demo-silent.mp4">Watch the Native-Surface demo.</a></video>

## How it works

React Native apps on iOS and Android use the [Yoga layout engine](https://www.yogalayout.dev/docs/about-yoga), whereas [React Native Web](https://necolas.github.io/react-native-web/docs/) relies on the browser's CSS layout of DOM elements. Native-Surface also uses Yoga, running through WebAssembly in the browser, to calculate layout. It then uses Skia through [CanvasKit](https://skia.org/docs/user/modules/canvaskit/) to draw the UI onto a canvas.

Some features, including text editing, video, and web views, use DOM overlays.

## What You Can Do With It Today

You can use Native-Surface to show a version of your app on the web or preview individual screens and components in the browser.

### Show a version of your app on the web

The most complex app I've run with it so far is the [Bluesky app](https://github.com/bluesky-social/social-app), since it's a sufficiently large open source React Native app. It took some work to get it running, and there are still issues, but I can build it, log in, and navigate through the app. A nice outcome of this work is that some of the necessary fixes are now part of Native-Surface.

<video src="/videos/native-surface-bluesky-demo.mp4" width="1114" height="880" controls autoplay muted loop playsinline aria-label="Bluesky running through Native-Surface, showing profile navigation, scrolling, and dialogs alongside the boot log." style="margin-inline: auto; border: 1px solid var(--line); border-radius: var(--radius);"><a href="/videos/native-surface-bluesky-demo.mp4">Watch the Bluesky demo running through Native-Surface.</a></video>

### Iterate on your iOS / Android components in a web-based playground

Native-Surface lets you interact with your components in isolation in a web-based playground, without setting up a sibling app or swapping out your app's root component.

<video src="/videos/native-surface-playground-silent.mp4" width="1598" height="1322" controls autoplay muted loop playsinline aria-label="Native-Surface playground demonstration." style="margin-inline: auto; border: 1px solid var(--line); border-radius: var(--radius);"><a href="/videos/native-surface-playground-silent.mp4">Watch the Native-Surface playground demo.</a></video>

## Getting started

To try the playground in an existing React Native project using React 19, install [@native-surface/playground](https://www.npmjs.com/package/@native-surface/playground) as a development dependency:

```bash
npm install --save-dev @native-surface/playground
```

As an example, create `src/Counter.stories.tsx` with a component that we can use to prove that everything's working.

```tsx
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default { title: 'Counter' };

export function Default() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text>Count: {count}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setCount((value) => value + 1)}
        style={{ padding: 12, backgroundColor: '#2563eb', borderRadius: 8 }}
      >
        <Text style={{ color: 'white' }}>Increment</Text>
      </Pressable>
    </View>
  );
}
```

Start the playground and point it at your story files:

```bash
npx native-surface playground --stories 'src/**/*.stories.tsx'
```

Open the app (by default `localhost:5170`) and select **Counter → Default**. Clicking **Increment** should update the count. You can then replace this example with a story that renders one of your own components. Edits to the story update the preview while the playground is running.

For embedding components in a React DOM app, the [Native-Surface npm documentation](https://www.npmjs.com/package/native-surface) covers the Vite setup and the `<NativeSurface>` component.

## Current limitations

The goal of Native-Surface is to help you iterate quickly and review/highlight your work using the same layout engine as React Native on iOS and Android. Everything should still be tested on simulators or devices, and some native features aren't supported.

I still consider Native-Surface experimental, and it has some rough edges. Getting existing apps running end to end can expose gaps that require additional work or adapters.

## Give it a try

If you're building with React Native and want a browser surface that isn't a DOM translation, give [Native-Surface](https://ryanlanciaux.com/native-surface) a try. I'd love to hear what works for you. If something doesn't, please [file an issue](https://github.com/ryanlanciaux/native-surface/issues).

## Links

- [Playground](https://ryanlanciaux.com/native-surface)
- [GitHub](https://github.com/ryanlanciaux/native-surface)
- [npm](https://www.npmjs.com/package/native-surface)
