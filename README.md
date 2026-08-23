# ryanlanciaux.com

Personal site and blog, built with [Astro](https://astro.build) and deployed to
GitHub Pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
npm run check    # astro check (types + template diagnostics)
```

Node 22+.

## Writing a post

Create `src/content/blog/<yyyy-mm-dd-some-slug>/index.md`:

```markdown
---
title: "A title in quotes"
date: "2026-08-22T09:00:00.000Z"
path: "/blog/2026/08/22/a-title-in-quotes/"
description: "Optional. Used for the excerpt, meta description and RSS."
---

Body goes here.
```

Two things worth knowing:

- **`path` is the URL**, not the directory name. Every permalink this site has
  ever published lives in frontmatter, which is why renaming a folder is safe
  and why URLs survived both the Octopress and Gatsby migrations.
- **Images go in the post's own directory** and are referenced relatively
  (`![alt](./screenshot.png)`). Astro hashes, resizes and converts them to
  WebP at build time.

Set `draft: true` to keep a post out of production builds while still seeing it
in `npm run dev`.

## Layout

```
src/
  assets/      images used by the site chrome (logo, avatar, starfield)
  components/  Astro components
  content/
    blog/      one directory per post: index.md + its images
    pages/     standalone pages (about)
  layouts/     BaseLayout (shell) and PostLayout (article)
  pages/       routes
  plugins/     markdown pipeline extensions
  styles/      global.css — all design tokens live here
public/        copied verbatim: CNAME, robots.txt, icons, sw.js
```

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages. Pages must be set to the **GitHub Actions** source (Settings → Pages).

