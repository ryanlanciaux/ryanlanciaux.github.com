// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { satteri } from "@astrojs/markdown-satteri"

import { htmlImagesToMdast } from "./src/plugins/html-images-to-mdast.ts"

/** Optional, gitignored. See astro.config.local.mjs.example. */
const localDev = await import("./astro.config.local.mjs")
  .then((mod) => mod.default ?? {})
  .catch((err) => {
    if (err?.code === "ERR_MODULE_NOT_FOUND") return {}
    throw err
  })

const allowedHosts = localDev.allowedHosts ?? true

// https://astro.build/config
export default defineConfig({
  site: "https://ryanlanciaux.com",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  server: {
    host: true,
    allowedHosts,
  },
  preview: {
    host: true,
    allowedHosts,
  },
  vite: {
    server: {
      allowedHosts,
    },
  },
  markdown: {
    processor: satteri({
      // Runs before Astro's own collect-images plugin, so the images it
      // recovers from raw HTML get optimised like any other.
      mdastPlugins: [htmlImagesToMdast],
    }),
    shikiConfig: {
      theme: "night-owl",
      wrap: false,
    },
  },
})
