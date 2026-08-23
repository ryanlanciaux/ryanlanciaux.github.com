import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

/**
 * Posts keep the Gatsby-era shape: one directory per post holding an
 * `index.md` plus any images it references relatively. The `path`
 * frontmatter is the canonical URL and is what the router uses, so
 * renaming a directory never breaks a permalink.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    path: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { blog }
