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
tags:
  - react
  - testing
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

### IndexNow

After a successful deploy, the workflow runs `scripts/indexnow.mjs` to tell
IndexNow (Bing, Yandex and friends) which URLs changed. On a push it submits
every post added or modified in that push, plus its `.md` copy, the home page
and `/llms.txt`. A manual run submits every post. The key lives in
`public/<key>.txt`, and that file is the only place it is defined. A failed
ping never fails the deploy.

`--dry-run` prints the payload without sending it. `--all` reads
`dist/sitemap-0.xml` when a build is present.

```bash
npm run indexnow -- --since HEAD~1 --dry-run
npm run indexnow -- --all --dry-run
```
