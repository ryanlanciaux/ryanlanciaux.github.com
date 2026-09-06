import { getImage } from "astro:assets"
import type { ImageMetadata } from "astro"
import type { Post } from "./posts"

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/blog/**/*.{jpg,jpeg,png,webp,gif}",
  { eager: true },
)

/**
 * OG image: frontmatter `ogImage` if set, otherwise the first-line
 * `![alt](./cover.jpg)` convention the 2026 posts already use.
 */
export async function headerImageSrc(post: Post): Promise<string | undefined> {
  const src =
    post.data.ogImage ??
    post.body?.trim().match(/^!\[[^\]]*]\(([^)\s]+)/)?.[1]
  if (!src || src.startsWith("http") || src.startsWith("/")) return
  const dir = post.filePath?.replace(/\/[^/]+$/, "")
  if (!dir) return
  const meta = images[`/${dir}/${src.replace(/^\.\//, "")}`]?.default
  if (!meta) return
  // jpg: a few crawlers still refuse the webp the page itself uses
  return (await getImage({ src: meta, width: 1200, format: "jpg" })).src
}
