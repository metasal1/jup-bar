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
  /** Only true when account is JupiterExchange X org / affiliate badge. */
  official?: boolean;
};

/**
 * X accounts listed as Official MUST carry the JupiterExchange organization
 * affiliation on X (org badge / announced pillar). Fan, parody, and unaffiliated
 * handles stay out of this list.
 *
 * Source of truth: JupiterExchange org + public pillar announcements
 * (@jupiter_trade / @jupiter_earn / @jupiter_manage) + clear org affiliates.
 */
export const X_ORG_HANDLE = "JupiterExchange";

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
    note: "github.com/0xanmol · jup-ag org · X org affiliate",
  },
  {
    id: "ssiong",
    name: "ssiong",
    handle: "ssiong",
    role: "Public Jupiter voice",
    href: "https://x.com/ssiong",
    note: "ss lim",
  },
];

/** Official X only — JupiterExchange org / verified affiliates. */
export const X_ACCOUNTS: SocialLink[] = [
  {
    id: "x-main",
    name: "@JupiterExchange",
    href: "https://x.com/JupiterExchange",
    platform: "x",
    blurb: "Main org account",
    official: true,
  },
  {
    id: "x-trade",
    name: "@jupiter_trade",
    href: "https://x.com/jupiter_trade",
    platform: "x",
    blurb: "Trade pillar · JupiterExchange org",
    official: true,
  },
  {
    id: "x-earn",
    name: "@jupiter_earn",
    href: "https://x.com/jupiter_earn",
    platform: "x",
    blurb: "Earn pillar · JupiterExchange org",
    official: true,
  },
  {
    id: "x-manage",
    name: "@jupiter_manage",
    href: "https://x.com/jupiter_manage",
    platform: "x",
    blurb: "Manage pillar · JupiterExchange org",
    official: true,
  },
  {
    id: "x-devrel",
    name: "@JupDevRel",
    href: "https://x.com/JupDevRel",
    platform: "x",
    blurb: "Developers · JupiterExchange org",
    official: true,
  },
  {
    id: "x-dao",
    name: "@jup_dao",
    href: "https://x.com/jup_dao",
    platform: "x",
    blurb: "DAO · JupiterExchange org",
    official: true,
  },
  {
    id: "x-onchain",
    name: "@JupiterOnchain",
    href: "https://x.com/JupiterOnchain",
    platform: "x",
    blurb: "Onchain surface · JupiterExchange org",
    official: true,
  },
  {
    id: "x-lend",
    name: "@jup_lend",
    href: "https://x.com/jup_lend",
    platform: "x",
    blurb: "Jupiter Lend · JupiterExchange org",
    official: true,
  },
  {
    id: "x-support",
    name: "@jupiter_support",
    href: "https://x.com/jupiter_support",
    platform: "x",
    blurb: "Support · JupiterExchange org",
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
