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

/**
 * Everything on /links/ is an ordinary Markdown file, one per entry, so a new
 * one can be added straight from GitHub's web editor without touching any
 * code. Body copy is optional; when present it renders under the summary.
 */
const links = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/links" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    summary: z.string(),
    url: z.string().url(),
    /** The call to action. Say what the link does, never "see here". */
    linkText: z.string(),
    /**
     * Renders the brand mark in place of the title. Use it where the name is
     * a logo rather than a word — "X" as a bare letter reads as a typo.
     */
    icon: z.enum(["x", "github", "linkedin"]).optional(),
    /** Which section it appears under. See LINK_GROUPS in src/consts.ts. */
    group: z.string().default("projects"),
    /** Lower sorts first within a section. Ties fall back to title. */
    order: z.number().default(0),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { blog, links }
