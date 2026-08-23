import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { getSortedPosts, postHref, excerpt } from "../utils/posts"
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts"

export async function GET(context: APIContext) {
  const posts = await getSortedPosts()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? excerpt(post.body, 300),
      link: postHref(post),
    })),
    customData: "<language>en-us</language>",
  })
}
