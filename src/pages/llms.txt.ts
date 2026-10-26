import { getSortedPosts, postMarkdownHref, excerpt } from "../utils/posts"
import { SITE_TITLE, SITE_URL } from "../consts"

function oneLine(text: string): string {
  return text
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function GET() {
  const posts = await getSortedPosts()

  const lines = posts.map((post) => {
    const title = oneLine(post.data.title).replace(/([[\]])/g, "\\$1")
    const href = new URL(postMarkdownHref(post), SITE_URL).href
    const summary = oneLine(post.data.description ?? excerpt(post.body))
    return summary
      ? `- [${title}](${href}): ${summary}`
      : `- [${title}](${href})`
  })

  const text = [
    `# ${SITE_TITLE}`,
    "",
    "> The personal blog of Ryan Lanciaux, a developer writing about web and mobile apps, JavaScript, React, developer tooling and working with AI coding agents.",
    "",
    "Each link below is a Markdown copy of a post. The HTML version lives at the same address without the .md extension.",
    "",
    "## Posts",
    "",
    ...lines,
    "",
  ].join("\n")

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
