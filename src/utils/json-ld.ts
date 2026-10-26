import { SITE_AUTHOR, SITE_URL, SOCIAL } from "../consts"

export interface BlogPostingInput {
  title: string
  description: string
  date: Date
  updated?: Date
  path: string
  image?: string
  tags?: string[]
}

export function blogPostingJsonLd(input: BlogPostingInput) {
  const url = new URL(input.path, SITE_URL).href

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.date.toISOString(),
    ...(input.updated && { dateModified: input.updated.toISOString() }),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: `${SITE_URL}/`,
      sameAs: [SOCIAL.x.href, SOCIAL.github.href, SOCIAL.linkedin.href],
    },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(input.image && { image: new URL(input.image, SITE_URL).href }),
    ...(input.tags?.length ? { keywords: input.tags } : {}),
  }
}
