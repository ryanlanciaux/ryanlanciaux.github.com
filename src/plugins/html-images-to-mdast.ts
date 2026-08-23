import { defineMdastPlugin } from "satteri"

/**
 * Turn raw-HTML `<img>` tags in Markdown into real mdast image nodes.
 *
 * Astro only routes an image through its asset pipeline when it arrived as an
 * mdast `image` node — i.e. `![alt](./shot.png)`. Plenty of these posts predate
 * that convention and use raw HTML instead, usually because the image wanted a
 * wrapper:
 *
 *   <div style="width: 300px;"><img src="./hero.png" /></div>
 *
 * Those srcs were never collected, so they shipped verbatim and 404'd against
 * the post's own URL.
 *
 * Satteri does offer `features.rawHtml`, which reparses raw HTML into real hast
 * elements and would expose these to Astro's image marker — but that reparse
 * also drops the `language-*` class off fenced code, so every block downgrades
 * to plaintext and syntax highlighting dies. Splitting at the mdast level
 * instead gets the images without touching the code path.
 *
 * Each matching `html` node is replaced by the text before the tag, an image
 * node, and the text after it. Adjacent raw HTML is re-emitted verbatim, so
 * wrappers survive exactly as written.
 */

const IMG_TAG = /<img\b[^>]*?\/?>/gi

function attr(tag: string, name: string): string | undefined {
  const match = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i").exec(
    tag
  )
  return match ? (match[2] ?? match[3]) : undefined
}

/** Only colocated files belong in the asset pipeline. */
function localSrc(src: string | undefined): string | null {
  if (!src) return null
  if (src.startsWith("/")) return null // served from public/
  if (URL.canParse(src)) return null // remote or data:
  // Vite needs an explicit relative specifier, not a bare one.
  return src.startsWith("./") || src.startsWith("../") ? src : `./${src}`
}

export const htmlImagesToMdast = defineMdastPlugin({
  name: "html-images-to-mdast",
  html(node, ctx) {
    const value: string = node.value ?? ""
    if (!value.toLowerCase().includes("<img")) return

    const parts: any[] = []
    let cursor = 0
    let rewrote = false

    for (const match of value.matchAll(IMG_TAG)) {
      const tag = match[0]
      const url = localSrc(attr(tag, "src"))
      if (!url) continue

      const before = value.slice(cursor, match.index)
      if (before) parts.push({ type: "html", value: before })

      parts.push({
        type: "image",
        url,
        alt: attr(tag, "alt") ?? "",
        title: attr(tag, "title") ?? null,
      })

      cursor = match.index + tag.length
      rewrote = true
    }

    if (!rewrote) return

    const after = value.slice(cursor)
    if (after) parts.push({ type: "html", value: after })

    ctx.replaceNode(node, parts)
  },
})
