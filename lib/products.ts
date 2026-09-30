import { jupRef, JUP_GO_LINK } from "./jup-ref";

export type ProductCategory =
  | "trade"
  | "earn"
  | "manage"
  | "apps"
  | "dev"
  | "community"
  | "external";

export type Product = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  category: ProductCategory;
  icon?: string;
  featured?: boolean;
  /** official Jupiter property */
  official?: boolean;
};

export const CATEGORIES: { id: ProductCategory | "all" | "pinned"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "trade", label: "Trade" },
  { id: "earn", label: "Earn" },
  { id: "manage", label: "Manage" },
  { id: "apps", label: "Apps" },
  { id: "dev", label: "Developers" },
  { id: "community", label: "Community" },
  { id: "external", label: "No Jup equivalent" },
];

export type SortMode = "featured" | "name" | "category";

/**
 * Exhaustive-as-possible official Jupiter product surface (live 200s verified 2026-08).
 * External = third-party tools with no first-party Jupiter counterpart.
 */
const RAW: Product[] = [
  // —— Trade ——
  {
    id: "home",
    name: "Jupiter Home",
    blurb: "The home of onchain finance",
    href: "https://jup.ag/",
    category: "trade",
    icon: "jupiter-logo.svg",
    featured: true,
    official: true,
  },
  {
    id: "swap",
    name: "Swap",
    blurb: "Best-route spot swaps across Solana DEXes",
    href: "https://jup.ag/swap",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "spot",
    name: "Spot",
    blurb: "Token discovery, charts, and spot markets",
    href: "https://jup.ag/spot",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "spot-trending",
    name: "Trending",
    blurb: "What’s moving on Jupiter Spot",
    href: "https://jup.ag/spot/trending",
    category: "trade",
    icon: "exchange.svg",
    official: true,
  },
  {
    id: "watchlist",
    name: "Watchlist",
    blurb: "Track tokens you care about",
    href: "https://jup.ag/spot/watchlist",
    category: "trade",
    icon: "exchange.svg",
    official: true,
  },
  {
    id: "limit",
    name: "Limit",
    blurb: "Set target prices — fill on-chain",
    href: "https://jup.ag/limit",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "recurring",
    name: "Recurring / DCA",
    blurb: "Automate buys and sells on a schedule",
    href: "https://jup.ag/recurring",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "perps",
    name: "Perps",
    blurb: "Leveraged perps vs the JLP pool",
    href: "https://jup.ag/perps",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "prediction",
    name: "Prediction",
    blurb: "Trade opinions and event markets",
    href: "https://jup.ag/prediction",
    category: "trade",
    icon: "pm.svg",
    featured: true,
    official: true,
  },
  // —— Earn ——
  {
    id: "lend-earn",
    name: "Lend · Earn",
    blurb: "Supply assets and earn yield",
    href: "https://jup.ag/lend/earn",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
    official: true,
  },
  {
    id: "lend-borrow",
    name: "Lend · Borrow",
    blurb: "Collateralised borrow without selling",
    href: "https://jup.ag/lend/borrow",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
    official: true,
  },
  {
    id: "multiply",
    name: "Multiply",
    blurb: "Automated on-chain leverage loops",
    href: "https://jup.ag/lend/borrow/multiply",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
    official: true,
  },
  {
    id: "strategies",
    name: "Strategies",
    blurb: "Curated Lend strategies and vaults",
    href: "https://jup.ag/lend/strategies",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
    official: true,
  },
  {
    id: "stake",
    name: "Stake",
    blurb: "Stake JUP and related earn flows",
    href: "https://jup.ag/stake",
    category: "earn",
    icon: "governance.svg",
    featured: true,
    official: true,
  },
  {
    id: "rewards",
    name: "Rewards",
    blurb: "ASR and ecosystem rewards",
    href: "https://jup.ag/rewards",
    category: "earn",
    icon: "jupuary.svg",
    featured: true,
    official: true,
  },
  // —— Manage ——
  {
    id: "portfolio",
    name: "Portfolio",
    blurb: "Balances, positions, and P&L",
    href: "https://jup.ag/portfolio",
    category: "manage",
    icon: "wallet.svg",
    featured: true,
    official: true,
  },
  {
    id: "send",
    name: "Send",
    blurb: "Send crypto as a shareable link",
    href: "https://jup.ag/send",
    category: "manage",
    icon: "wallet.svg",
    featured: true,
    official: true,
  },
  {
    id: "onboard",
    name: "Onboard",
    blurb: "Get started on Jupiter",
    href: "https://jup.ag/onboard",
    category: "manage",
    icon: "wallet.svg",
    official: true,
  },
  {
    id: "updates",
    name: "Product Updates",
    blurb: "Changelog across the Jupiverse",
    href: "https://jup.ag/updates",
    category: "manage",
    icon: "jupiter-logo.svg",
    official: true,
  },
  // —— Apps ——
  {
    id: "mobile",
    name: "Jupiter Mobile",
    blurb: "App install / open via Adjust deep link (l6gxn)",
    href: JUP_GO_LINK,
    category: "apps",
    icon: "mobile.svg",
    featured: true,
    official: true,
  },
  {
    id: "mobile-web",
    name: "Mobile (web page)",
    blurb: "jup.ag/mobile marketing page",
    href: "https://jup.ag/mobile",
    category: "apps",
    icon: "mobile.svg",
    official: true,
  },
  {
    id: "studio",
    name: "Studio",
    blurb: "Launch and manage tokens",
    href: "https://studio.jup.ag/",
    category: "apps",
    icon: "launchpad.svg",
    featured: true,
    official: true,
  },
  {
    id: "studio-launch",
    name: "Studio Launch",
    blurb: "Direct path to token launch",
    href: "https://studio.jup.ag/launch",
    category: "apps",
    icon: "launchpad.svg",
    official: true,
  },
  {
    id: "plugin",
    name: "Plugin",
    blurb: "Embed Jupiter swap in any app",
    href: "https://plugin.jup.ag/",
    category: "apps",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "gum",
    name: "GUM",
    blurb: "gum.ag - Siong / Nix onchain product",
    href: "https://gum.ag/",
    category: "apps",
    icon: "jupiter-logo.svg",
    featured: true,
    official: true,
  },
  {
    id: "verified",
    name: "Jupiter Verified",
    blurb: "VRFD - Solana token verification. Submit, update metadata, flag bad data",
    href: "https://verified.jup.ag/",
    category: "apps",
    icon: "jupiter-logo.svg",
    featured: true,
    official: true,
  },
  // —— Community / gov ——
  {
    id: "governance",
    name: "Governance",
    blurb: "Vote and govern with JUP",
    href: "https://vote.jup.ag/",
    category: "community",
    icon: "governance.svg",
    featured: true,
    official: true,
  },
  {
    id: "support",
    name: "Support Hub",
    blurb: "Tickets, FAQs, and product help",
    href: "https://support.jup.ag/",
    category: "community",
    icon: "jupiter-logo.svg",
    official: true,
  },
  {
    id: "academy",
    name: "Academy",
    blurb: "Step-by-step DeFi tutorials",
    href: "https://academy.jup.ag/",
    category: "community",
    icon: "jupiter-logo.svg",
    official: true,
  },
  {
    id: "docs-user",
    name: "User Docs",
    blurb: "Guides for every Jupiter product",
    href: "https://docs.jup.ag/",
    category: "community",
    icon: "jupiter-logo.svg",
    official: true,
  },
  {
    id: "status",
    name: "Status",
    blurb: "System status and incidents",
    href: "https://status.jup.ag/",
    category: "community",
    icon: "jupiter-logo.svg",
    official: true,
  },
  // —— Developers ——
  {
    id: "developers",
    name: "Developer Docs",
    blurb: "APIs, SDKs, and integrator guides",
    href: "https://developers.jup.ag/",
    category: "dev",
    icon: "exchange.svg",
    featured: true,
    official: true,
  },
  {
    id: "dev-blog",
    name: "Developer Blog",
    blurb: "Changelog and engineering posts",
    href: "https://developers.jup.ag/blog",
    category: "dev",
    icon: "exchange.svg",
    official: true,
  },
  {
    id: "datapi",
    name: "Data API",
    blurb: "Public market and token data endpoints",
    href: "https://datapi.jup.ag/",
    category: "dev",
    icon: "exchange.svg",
    official: true,
  },
  {
    id: "verified-api",
    name: "Verified API",
    blurb: "Express Verification API docs - submit VRFD programmatically",
    href: "https://developers.jup.ag/docs/tokens/verification",
    category: "dev",
    icon: "exchange.svg",
    official: true,
  },
  // —— External / no first-party equivalent ——
  {
    id: "jupbar",
    name: "JupBar",
    blurb: "Floating macOS ticker for Jupiter Cats — no official desktop bar",
    href: "https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg",
    category: "external",
    featured: true,
    official: false,
  },
  {
    id: "jupgifts",
    name: "Jup Gifts",
    blurb: "Send Solana tokens as magic-link gifts",
    href: "https://jup.gifts/",
    category: "external",
    featured: true,
    official: false,
  },
  {
    id: "sol-icons",
    name: "Solana Icons",
    blurb: "Open icon pack for Solana + Jupiter brands",
    href: "https://icons.sol.new/",
    category: "external",
    official: false,
  },
  {
    id: "sol-new",
    name: "sol.new",
    blurb: "Token launcher with Jupiter-routed liquidity",
    href: "https://sol.new/?ref=jupbar",
    category: "external",
    official: false,
  },
];

export const PRODUCTS: Product[] = RAW.map((p) => {
  if (!p.official) return p;
  // App Adjust link — do not rewrite
  if (p.id === "mobile" || p.href.includes("go.link")) return p;
  // only re-link jup.ag / *.jup.ag / known jup hosts
  try {
    const host = new URL(p.href).hostname;
    const isJup =
      host === "jup.ag" ||
      host.endsWith(".jup.ag") ||
      host === "plugin.jup.ag";
    return isJup ? { ...p, href: jupRef(p.href) } : p;
  } catch {
    return p;
  }
});

export function sortProducts(list: Product[], mode: SortMode): Product[] {
  const copy = [...list];
  if (mode === "name") return copy.sort((a, b) => a.name.localeCompare(b.name));
  if (mode === "category") {
    return copy.sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
  }
  return copy.sort((a, b) => {
    const af = a.featured ? 0 : 1;
    const bf = b.featured ? 0 : 1;
    if (af !== bf) return af - bf;
    const ao = a.official === false ? 1 : 0;
    const bo = b.official === false ? 1 : 0;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
}

export function shuffleProducts(list: Product[]): Product[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const PIN_KEY = "jupbar.pins.v1";
