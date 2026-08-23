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
   * `key` selects the brand mark in FollowLine.
   */
  x: { key: "x", label: "X", href: `https://x.com/${HANDLE}`, handle: HANDLE },
  github: {
    key: "github",
    label: "GitHub",
    href: `https://github.com/${HANDLE}`,
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn",
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
