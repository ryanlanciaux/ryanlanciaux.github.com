// @ts-check
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { satteri } from "@astrojs/markdown-satteri"

import { htmlImagesToMdast } from "./src/plugins/html-images-to-mdast.ts"

// https://astro.build/config
export default defineConfig({
  site: "https://ryanlanciaux.com",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
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
