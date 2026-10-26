import { getCollection, type CollectionEntry } from "astro:content"

export type Post = CollectionEntry<"blog">

/** Newest first, drafts dropped in production. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

/** Frontmatter `path` is the canonical URL; normalise it to `/foo/bar/`. */
export function postHref(post: Post): string {
  const p = post.data.path.trim()
  return `/${p.replace(/^\/+/, "").replace(/\/+$/, "")}/`
}

export function postMarkdownHref(post: Post): string {
  return `${postHref(post).replace(/\/$/, "")}.md`
}

/**
 * Gatsby gave us `excerpt` for free. This is the equivalent: strip the markdown
 * down to prose and cut it at a word boundary.
 */
export function excerpt(body: string | undefined, length = 180): string {
  if (!body) return ""

  const text = body
    .replace(/^---[\s\S]*?---/, "") // stray frontmatter
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/<[^>]+>/g, " ") // raw html
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> their text
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // headings
    .replace(/^\s{0,3}>\s?/gm, "") // blockquotes
    .replace(/[*_~]{1,3}/g, "") // emphasis
    .replace(/\s+/g, " ")
    .trim()

  if (text.length <= length) return text
  const cut = text.slice(0, length)
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`
}
