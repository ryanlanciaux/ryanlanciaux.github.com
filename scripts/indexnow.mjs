import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const HOST = "ryanlanciaux.com"
const ORIGIN = `https://${HOST}`
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/indexnow"
const BATCH_SIZE = 10000
const BLOG_DIR = "src/content/blog"
const POST_FILE = /^src\/content\/blog\/[^/]+\/index\.md$/
const MARKDOWN_LINK = /\]\((https:\/\/[^)\s]+)\)/g

function findKey() {
  const dir = join(ROOT, "public")
  const keys = readdirSync(dir)
    .filter((name) => /^[0-9a-f]{32}\.txt$/.test(name))
    .map((name) => name.slice(0, -4))
    .filter(
      (key) => readFileSync(join(dir, `${key}.txt`), "utf8").trim() === key,
    )
  if (keys.length !== 1) {
    throw new Error(
      `Expected one IndexNow key file in public/, found ${keys.length}`,
    )
  }
  return keys[0]
}

function frontmatter(file) {
  const text = readFileSync(join(ROOT, file), "utf8")
  const block = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ""
  const field = (name) =>
    block
      .match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1]
      .trim()
      .replace(/^(["'])(.*)\1$/, "$2")
  return { path: field("path"), draft: field("draft") === "true" }
}

function postUrls(files) {
  return files.flatMap((file) => {
    const { path, draft } = frontmatter(file)
    if (!path || draft) return []
    const clean = path.trim().replace(/^\/+|\/+$/g, "")
    return [`${ORIGIN}/${clean}/`, `${ORIGIN}/${clean}.md`]
  })
}

function withSiteUrls(urls) {
  return urls.length > 0 ? [`${ORIGIN}/`, ...urls, `${ORIGIN}/llms.txt`] : []
}

function changedSince(sha) {
  const out = execFileSync(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMR", sha, "HEAD", "--", BLOG_DIR],
    { cwd: ROOT, encoding: "utf8" },
  )
  return out.split("\n").filter((file) => POST_FILE.test(file))
}

function allPostFiles() {
  return readdirSync(join(ROOT, BLOG_DIR))
    .map((dir) => `${BLOG_DIR}/${dir}/index.md`)
    .filter((file) => existsSync(join(ROOT, file)))
}

function allUrls() {
  const sitemap = join(ROOT, "dist", "sitemap-0.xml")
  if (!existsSync(sitemap)) {
    console.log("No dist/sitemap-0.xml, using every post in src/content")
    return withSiteUrls(postUrls(allPostFiles()))
  }
  const urls = [
    ...readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((match) => match[1].trim())
  const llms = join(ROOT, "dist", "llms.txt")
  if (existsSync(llms)) {
    urls.push(`${ORIGIN}/llms.txt`)
    const links = readFileSync(llms, "utf8").matchAll(MARKDOWN_LINK)
    for (const match of links) urls.push(match[1])
  }
  return urls
}

function parseArgs(argv) {
  const args = { dryRun: false, all: false, since: undefined, urls: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === "--dry-run") args.dryRun = true
    else if (arg === "--all") args.all = true
    else if (arg === "--since") args.since = argv[++i]
    else if (arg.startsWith("--since=")) args.since = arg.slice(8)
    else if (arg.startsWith("--")) throw new Error(`Unknown option ${arg}`)
    else args.urls.push(arg)
  }
  if (args.since === "") throw new Error("--since needs a git revision")
  return args
}

async function submit(key, urlList, dryRun) {
  const payload = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList,
  }
  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2))
    return true
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  })
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted ${urlList.length} URL(s) with ${res.status}`)
    return true
  }
  console.error(`IndexNow returned ${res.status} ${res.statusText}`)
  const text = await res.text()
  if (text) console.error(text)
  return false
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const key = findKey()

  const urls = [...args.urls]
  if (args.all) urls.push(...allUrls())
  if (args.since) urls.push(...withSiteUrls(postUrls(changedSince(args.since))))

  const foreign = urls.filter((url) => !url.startsWith(`${ORIGIN}/`))
  if (foreign.length > 0) {
    throw new Error(`Not on ${HOST}: ${foreign.join(", ")}`)
  }

  const urlList = [...new Set(urls)]
  if (urlList.length === 0) {
    console.log("Nothing changed, no URLs to submit")
    return
  }

  let ok = true
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    const batch = urlList.slice(i, i + BATCH_SIZE)
    ok = (await submit(key, batch, args.dryRun)) && ok
  }
  if (!ok) process.exitCode = 1
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
