import { jupRef } from "./jup-ref";

export type ProductCategory =
  | "trade"
  | "earn"
  | "manage"
  | "apps"
  | "dev"
  | "tools";

export type Product = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  category: ProductCategory;
  /** path under /icons/ or empty for monogram */
  icon?: string;
  featured?: boolean;
  /** open same tab for internal tiles */
  external?: boolean;
};

const RAW: Product[] = [
  {
    id: "swap",
    name: "Swap",
    blurb: "Best-route spot swaps across Solana",
    href: "https://jup.ag/swap",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
  },
  {
    id: "spot",
    name: "Spot",
    blurb: "Token discovery and spot markets",
    href: "https://jup.ag/spot",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
  },
  {
    id: "limit",
    name: "Limit",
    blurb: "Set price targets and fill on-chain",
    href: "https://jup.ag/limit",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
  },
  {
    id: "recurring",
    name: "Recurring / DCA",
    blurb: "Automate buys and sells on a schedule",
    href: "https://jup.ag/recurring",
    category: "trade",
    icon: "exchange.svg",
  },
  {
    id: "perps",
    name: "Perps",
    blurb: "Leveraged perps vs the JLP pool",
    href: "https://jup.ag/perps",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
  },
  {
    id: "prediction",
    name: "Prediction",
    blurb: "Trade opinions and event markets",
    href: "https://jup.ag/prediction",
    category: "trade",
    icon: "pm.svg",
    featured: true,
  },
  {
    id: "lend-earn",
    name: "Lend · Earn",
    blurb: "Supply assets and earn yield",
    href: "https://jup.ag/lend/earn",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
  },
  {
    id: "lend-borrow",
    name: "Lend · Borrow",
    blurb: "Collateralised borrow without selling",
    href: "https://jup.ag/lend/borrow",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
  },
  {
    id: "multiply",
    name: "Multiply",
    blurb: "Automated on-chain leverage loops",
    href: "https://jup.ag/lend/borrow/multiply",
    category: "earn",
    icon: "offerbook.svg",
    featured: true,
  },
  {
    id: "stake",
    name: "Stake",
    blurb: "Stake JUP and related earn flows",
    href: "https://jup.ag/stake",
    category: "earn",
    icon: "governance.svg",
  },
  {
    id: "rewards",
    name: "Rewards",
    blurb: "ASR and ecosystem rewards",
    href: "https://jup.ag/rewards",
    category: "earn",
    icon: "jupuary.svg",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    blurb: "Balances, positions, and P&L",
    href: "https://jup.ag/portfolio",
    category: "manage",
    icon: "wallet.svg",
    featured: true,
  },
  {
    id: "send",
    name: "Send",
    blurb: "Send crypto as a shareable link",
    href: "https://jup.ag/send",
    category: "manage",
    icon: "wallet.svg",
  },
  {
    id: "onboard",
    name: "Onboard",
    blurb: "Get started on Jupiter",
    href: "https://jup.ag/onboard",
    category: "manage",
    icon: "wallet.svg",
  },
  {
    id: "mobile",
    name: "Mobile",
    blurb: "Jupiter Mobile app",
    href: "https://jup.ag/mobile",
    category: "apps",
    icon: "mobile.svg",
    featured: true,
  },
  {
    id: "studio",
    name: "Studio",
    blurb: "Launch and manage tokens",
    href: "https://studio.jup.ag/launch",
    category: "apps",
    icon: "launchpad.svg",
    featured: true,
  },
  {
    id: "governance",
    name: "Governance",
    blurb: "Vote and govern with JUP",
    href: "https://vote.jup.ag/",
    category: "manage",
    icon: "governance.svg",
  },
  {
    id: "developers",
    name: "Developers",
    blurb: "APIs, docs, and integrator tools",
    href: "https://developers.jup.ag/",
    category: "dev",
    icon: "exchange.svg",
  },
  {
    id: "home",
    name: "jup.ag",
    blurb: "Home of onchain finance",
    href: "https://jup.ag/",
    category: "trade",
    icon: "exchange.svg",
    featured: true,
  },
  {
    id: "jupbar",
    name: "JupBar (macOS)",
    blurb: "Floating ticker bar for Jupiter Cats",
    href: "https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg",
    category: "tools",
    // local brand mark
    icon: "",
    featured: false,
    external: true,
  },
];

export const CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "trade", label: "Trade" },
  { id: "earn", label: "Earn" },
  { id: "manage", label: "Manage" },
  { id: "apps", label: "Apps" },
  { id: "dev", label: "Dev" },
  { id: "tools", label: "Tools" },
];

export type SortMode = "featured" | "name" | "category";

export const PRODUCTS: Product[] = RAW.map((p) => ({
  ...p,
  // JupBar DMG is not a jup.ag re-link
  href: p.id === "jupbar" ? p.href : jupRef(p.href),
  external: p.external ?? true,
}));

export function sortProducts(
  list: Product[],
  mode: SortMode,
): Product[] {
  const copy = [...list];
  if (mode === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (mode === "category") {
    return copy.sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
  }
  // featured first, stable name within
  return copy.sort((a, b) => {
    const af = a.featured ? 0 : 1;
    const bf = b.featured ? 0 : 1;
    if (af !== bf) return af - bf;
    return a.name.localeCompare(b.name);
  });
}
