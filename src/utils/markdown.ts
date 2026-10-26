import { getImage } from "astro:assets"
import { SITE_AUTHOR, SITE_URL } from "../consts"
import { postHref, type Post } from "./posts"
import { postImage } from "./header-image"

const MD_IMAGE = /(!\[[^\]]*\]\(\s*)([^)\s]+)/g
const HTML_IMAGE = /(<img\b[^>]*?\bsrc=)(["'])([^"']+)\2/g

function isRelative(src: string): boolean {
  return !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(src)
}

async function absoluteImages(post: Post, body: string): Promise<string> {
  const srcs = new Set<string>()
  for (const m of body.matchAll(MD_IMAGE)) srcs.add(m[2])
  for (const m of body.matchAll(HTML_IMAGE)) srcs.add(m[3])

  const resolved = new Map<string, string>()
  for (const src of srcs) {
    if (!isRelative(src)) continue
    const meta = postImage(post, src)
    if (!meta) continue
    const image = await getImage({ src: meta })
    resolved.set(src, new URL(image.src, SITE_URL).href)
  }

  return body
    .replace(MD_IMAGE, (all, lead, src) =>
      resolved.has(src) ? `${lead}${resolved.get(src)}` : all
    )
    .replace(HTML_IMAGE, (all, lead, quote, src) =>
      resolved.has(src) ? `${lead}${quote}${resolved.get(src)}${quote}` : all
    )
}

export async function postMarkdown(post: Post): Promise<string> {
  const { title, date, description, tags } = post.data
  const frontmatter = [
    `title: ${JSON.stringify(title)}`,
    `date: ${JSON.stringify(date.toISOString())}`,
    description && `description: ${JSON.stringify(description)}`,
    `url: ${JSON.stringify(new URL(postHref(post), SITE_URL).href)}`,
    `author: ${JSON.stringify(SITE_AUTHOR)}`,
    tags.length > 0 && `tags: ${JSON.stringify(tags)}`,
  ].filter(Boolean)

  const body = await absoluteImages(post, (post.body ?? "").trim())

  return `---\n${frontmatter.join("\n")}\n---\n\n# ${title}\n\n${body}\n`
}
