/** Public Jupiter people + social channels (unofficial catalog). */

/** Local cached PFP path (downloaded from unavatar). */
export function pfpSrc(handle: string): string {
  return `/pfp/${handle.replace(/^@/, "").toLowerCase()}.jpg`;
}

export type Person = {
  id: string;
  name: string;
  handle: string;
  role: string;
  href: string;
  note?: string;
};

export type SocialLink = {
  id: string;
  name: string;
  href: string;
  platform: "x" | "discord" | "telegram" | "github" | "other";
  blurb: string;
  official?: boolean;
};

/** Visible public faces — keep conservative; no private/dox. */
export const PEOPLE: Person[] = [
  {
    id: "meow",
    name: "Meow",
    handle: "weremeow",
    role: "Founder",
    href: "https://x.com/weremeow",
    note: "Also github.com/whereismeow",
  },
  {
    id: "anmol",
    name: "Anmol",
    handle: "0xanmol",
    role: "Engineering (public GitHub)",
    href: "https://x.com/0xanmol",
    note: "github.com/0xanmol · jup-ag org",
  },
  {
    id: "sunnyezz",
    name: "Sunny",
    handle: "sunnyezz",
    role: "Community / public voice",
    href: "https://x.com/sunnyezz",
  },
];

export const X_ACCOUNTS: SocialLink[] = [
  {
    id: "x-main",
    name: "@JupiterExchange",
    href: "https://x.com/JupiterExchange",
    platform: "x",
    blurb: "Main Jupiter account",
    official: true,
  },
  {
    id: "x-onchain",
    name: "@JupiterOnchain",
    href: "https://x.com/JupiterOnchain",
    platform: "x",
    blurb: "Onchain / product surface",
    official: true,
  },
  {
    id: "x-devrel",
    name: "@JupDevRel",
    href: "https://x.com/JupDevRel",
    platform: "x",
    blurb: "Developers & integrators",
    official: true,
  },
  {
    id: "x-trade",
    name: "@jupiter_trade",
    href: "https://x.com/jupiter_trade",
    platform: "x",
    blurb: "Trade pillar",
    official: true,
  },
  {
    id: "x-earn",
    name: "@jupiter_earn",
    href: "https://x.com/jupiter_earn",
    platform: "x",
    blurb: "Earn pillar",
    official: true,
  },
  {
    id: "x-manage",
    name: "@jupiter_manage",
    href: "https://x.com/jupiter_manage",
    platform: "x",
    blurb: "Manage pillar",
    official: true,
  },
  {
    id: "x-lend",
    name: "@jup_lend",
    href: "https://x.com/jup_lend",
    platform: "x",
    blurb: "Jupiter Lend",
    official: true,
  },
  {
    id: "x-dao",
    name: "@jup_dao",
    href: "https://x.com/jup_dao",
    platform: "x",
    blurb: "DAO / governance chatter",
    official: true,
  },
  {
    id: "x-jupuary",
    name: "@jupuary",
    href: "https://x.com/jupuary",
    platform: "x",
    blurb: "Jupuary season",
    official: true,
  },
  {
    id: "x-research",
    name: "@JupResearch",
    href: "https://x.com/JupResearch",
    platform: "x",
    blurb: "Research",
    official: true,
  },
  {
    id: "x-support",
    name: "@jupiter_support",
    href: "https://x.com/jupiter_support",
    platform: "x",
    blurb: "Support",
    official: true,
  },
  {
    id: "x-portal",
    name: "@JupiterPortal",
    href: "https://x.com/JupiterPortal",
    platform: "x",
    blurb: "Portal / API surface",
    official: true,
  },
  {
    id: "x-terminal",
    name: "@Jup_Terminal",
    href: "https://x.com/Jup_Terminal",
    platform: "x",
    blurb: "Terminal",
    official: true,
  },
  {
    id: "x-ape",
    name: "@JupApe",
    href: "https://x.com/JupApe",
    platform: "x",
    blurb: "Ape / launch culture",
    official: true,
  },
  {
    id: "x-asr",
    name: "@jup_asr",
    href: "https://x.com/jup_asr",
    platform: "x",
    blurb: "Active Staking Rewards",
    official: true,
  },
  {
    id: "x-cat",
    name: "@jupcat",
    href: "https://x.com/jupcat",
    platform: "x",
    blurb: "Cat energy",
    official: true,
  },
  {
    id: "x-jupitersupport",
    name: "@jupitersupport",
    href: "https://x.com/jupitersupport",
    platform: "x",
    blurb: "Support alias",
    official: true,
  },
];

export const DISCORD_LINKS: SocialLink[] = [
  {
    id: "discord-main",
    name: "Jupiter Discord",
    href: "https://discord.com/invite/jup",
    platform: "discord",
    blurb: "Official community · product channels · support",
    official: true,
  },
];

export const TELEGRAM_LINKS: SocialLink[] = [
  {
    id: "tg-dao",
    name: "jup_dao",
    href: "https://t.me/jup_dao",
    platform: "telegram",
    blurb: "DAO / community chat",
    official: true,
  },
  {
    id: "tg-marketing",
    name: "jup_marketing",
    href: "https://t.me/jup_marketing",
    platform: "telegram",
    blurb: "Marketing updates",
    official: true,
  },
  {
    id: "tg-dev",
    name: "jup_dev",
    href: "https://t.me/jup_dev",
    platform: "telegram",
    blurb: "Developer community",
    official: true,
  },
  {
    id: "tg-ann",
    name: "jup_ann",
    href: "https://t.me/jup_ann",
    platform: "telegram",
    blurb: "Announcements",
    official: true,
  },
  {
    id: "tg-main",
    name: "JupiterExchange",
    href: "https://t.me/JupiterExchange",
    platform: "telegram",
    blurb: "Main Telegram presence",
    official: true,
  },
];

export const GITHUB_LINKS: SocialLink[] = [
  {
    id: "gh-org",
    name: "jup-ag",
    href: "https://github.com/jup-ag",
    platform: "github",
    blurb: "Official GitHub organization",
    official: true,
  },
];

export const ALL_SOCIALS: SocialLink[] = [
  ...DISCORD_LINKS,
  ...TELEGRAM_LINKS,
  ...X_ACCOUNTS,
  ...GITHUB_LINKS,
];
