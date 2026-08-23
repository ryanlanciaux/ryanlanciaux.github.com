export const SITE_TITLE = "Ryan Lanciaux"
export const SITE_AUTHOR = "Ryan Lanciaux"
export const SITE_DESCRIPTION = "The personal blog of ryanlanciaux"
export const SITE_URL = "https://ryanlanciaux.com"
export const POSTS_PER_PAGE = 10

const HANDLE = "ryanlanciaux"

export const SOCIAL = {
  /**
   * The `twitter:*` meta tags keep their names — that is still what X's card
   * parser reads — but every human-facing link and label says X.
   *
   * `key` selects the brand mark in FollowLine. `chipLabel` is what the follow
   * buttons show: those already carry the brand mark, so repeating "X" next to
   * the X logo was redundant — the handle is more useful there. `label` stays
   * the plain network name for list contexts like the footer.
   */
  x: {
    key: "x",
    label: "X",
    chipLabel: `@${HANDLE}`,
    href: `https://x.com/${HANDLE}`,
    handle: HANDLE,
  },
  github: {
    key: "github",
    label: "GitHub",
    chipLabel: "GitHub",
    href: `https://github.com/${HANDLE}`,
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
    chipLabel: "LinkedIn",
    href: "https://linkedin.com/in/lanciaux",
  },
  soundcloud: {
    key: "soundcloud",
    label: "SoundCloud",
    href: `https://soundcloud.com/${HANDLE}/`,
  },
} as const

export const SOCIAL_LINKS = [
  SOCIAL.x,
  SOCIAL.github,
  SOCIAL.linkedin,
  SOCIAL.soundcloud,
]

/**
 * Sections on /links/, in display order. Adding a section means adding a row
 * here and setting `group:` to its key in an entry's frontmatter. An entry
 * whose group isn't listed still renders — it just falls to the bottom under
 * its own key — so a typo never silently hides a link.
 */
export const LINK_GROUPS = [
  {
    key: "projects",
    label: "Projects",
    blurb: "Things I've built. Most are free to try.",
  },
  {
    key: "elsewhere",
    label: "Elsewhere",
    blurb: "Where to find me.",
  },
] as const
