import type { APIRoute, GetStaticPaths } from "astro"
import { getSortedPosts, postHref, type Post } from "../utils/posts"
import { postMarkdown } from "../utils/markdown"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getSortedPosts()
  return posts.map((post) => ({
    params: { slug: postHref(post).replace(/^\/|\/$/g, "") },
    props: { post },
  }))
}

export const GET: APIRoute<{ post: Post }> = async ({ props }) =>
  new Response(await postMarkdown(props.post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
