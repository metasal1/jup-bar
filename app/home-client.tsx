"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ALL_SOCIALS,
  DISCORD_LINKS,
  GITHUB_LINKS,
  PEOPLE,
  TELEGRAM_LINKS,
  X_ACCOUNTS,
  pfpSrc,
  type Person,
  type SocialLink,
} from "@/lib/community";
import {
  CATEGORIES,
  PIN_KEY,
  PRODUCTS,
  shuffleProducts,
  sortProducts,
  type Product,
  type ProductCategory,
  type SortMode,
} from "@/lib/products";

type View = "products" | "people" | "x" | "discord" | "telegram" | "github";

function track(event: string, props: Record<string, unknown>) {
  try {
    window.gtag?.("event", event, props);
  } catch {
    /* ignore */
  }
}

function trackOpen(p: Product) {
  track("jup_relink_click", {
    product_id: p.id,
    product_name: p.name,
    category: p.category,
    outbound: p.href,
    official: p.official !== false,
  });
}

function loadPins(): string[] {
  try {
    const raw = localStorage.getItem(PIN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x) => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

function savePins(ids: string[]) {
  try {
    localStorage.setItem(PIN_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

function ProductIcon({ product }: { product: Product }) {
  if (product.id === "jupbar") {
    return (
      <Image
        src="/jupbar-icon.png"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-xl"
      />
    );
  }
  if (product.icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/icons/${product.icon}`}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-xl bg-[#0a0e13] object-contain p-1.5 ring-1 ring-[#1c2936]"
      />
    );
  }
  const letter = product.name.trim().charAt(0).toUpperCase() || "J";
  return (
    <div
      aria-hidden
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan text-sm font-bold text-primary-fg"
    >
      {letter}
    </div>
  );
}

function PinIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 17v5" />
      <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
    </svg>
  );
}

function PlatformBadge({ platform }: { platform: SocialLink["platform"] }) {
  const label =
    platform === "x"
      ? "X"
      : platform === "discord"
        ? "Discord"
        : platform === "telegram"
          ? "Telegram"
          : platform === "github"
            ? "GitHub"
            : "Link";
  return (
    <span className="rounded-md bg-border/50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted uppercase">
      {label}
    </span>
  );
}

function Avatar({ label, handle }: { label: string; handle?: string }) {
  const key = (handle || label).replace("@", "");
  const src = pfpSrc(key);
  const letter = key.charAt(0).toUpperCase() || "J";
  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/90 to-cyan/80 ring-1 ring-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden items-center justify-center text-sm font-bold text-primary-fg"
      >
        {letter}
      </div>
    </div>
  );
}

const VIEWS: { id: View; label: string; count: number }[] = [
  { id: "products", label: "Products", count: PRODUCTS.length },
  { id: "people", label: "People", count: PEOPLE.length },
  { id: "x", label: "X / Twitter", count: X_ACCOUNTS.length },
  { id: "discord", label: "Discord", count: DISCORD_LINKS.length },
  { id: "telegram", label: "Telegram", count: TELEGRAM_LINKS.length },
  { id: "github", label: "GitHub", count: GITHUB_LINKS.length },
];

export default function HomeClient() {
  const [view, setView] = useState<View>("products");
  const [cat, setCat] = useState<ProductCategory | "all" | "pinned">("all");
  const [sort, setSort] = useState<SortMode>("featured");
  const [q, setQ] = useState("");
  const [pins, setPins] = useState<string[]>([]);
  const [orderOverride, setOrderOverride] = useState<Product[] | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPins(loadPins());
    setHydrated(true);
  }, []);

  const togglePin = useCallback((id: string) => {
    setPins((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [id, ...prev];
      savePins(next);
      return next;
    });
    setOrderOverride(null);
  }, []);

  const baseFiltered = useMemo(() => {
    let list = PRODUCTS;
    if (cat === "pinned") list = PRODUCTS.filter((p) => pins.includes(p.id));
    else if (cat !== "all") list = list.filter((p) => p.category === cat);
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.blurb.toLowerCase().includes(query) ||
          p.category.includes(query),
      );
    }
    return list;
  }, [cat, q, pins]);

  const items = useMemo(() => {
    if (orderOverride) {
      const ids = new Set(baseFiltered.map((p) => p.id));
      return orderOverride.filter((p) => ids.has(p.id));
    }
    const sorted = sortProducts(baseFiltered, sort);
    if (cat === "pinned") return sorted;
    const pinnedSet = new Set(pins);
    return [
      ...sorted.filter((p) => pinnedSet.has(p.id)),
      ...sorted.filter((p) => !pinnedSet.has(p.id)),
    ];
  }, [baseFiltered, sort, orderOverride, pins, cat]);

  const socialList = useMemo(() => {
    const source: SocialLink[] =
      view === "x"
        ? X_ACCOUNTS
        : view === "discord"
          ? DISCORD_LINKS
          : view === "telegram"
            ? TELEGRAM_LINKS
            : view === "github"
              ? GITHUB_LINKS
              : ALL_SOCIALS;
    const query = q.trim().toLowerCase();
    if (!query) return source;
    return source.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.blurb.toLowerCase().includes(query) ||
        s.platform.includes(query),
    );
  }, [view, q]);

  const peopleList = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return PEOPLE;
    return PEOPLE.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.handle.toLowerCase().includes(query) ||
        p.role.toLowerCase().includes(query),
    );
  }, [q]);

  const onShuffle = () => {
    setOrderOverride(shuffleProducts(baseFiltered));
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/jupiter-logo.svg"
              alt=""
              width={22}
              height={22}
              className="h-5.5 w-5.5 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-text">
                  jup.bar
                </span>
                <span className="hidden rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
                  Unofficial
                </span>
              </div>
              <p className="truncate text-[11px] text-faint max-sm:hidden">
                Products · people · socials
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/feedback"
              className="hidden h-9 items-center rounded-full border border-border px-3 text-xs font-medium text-muted transition hover:border-primary/40 hover:text-primary sm:inline-flex"
            >
              Feedback
            </a>
            <a
              href={PRODUCTS.find((p) => p.id === "home")!.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOpen(PRODUCTS.find((p) => p.id === "home")!)}
              className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg transition hover:brightness-110 active:scale-[0.98]"
            >
              Open jup.ag
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <section className="mb-8 max-w-2xl">
          <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
            Jupiverse map
          </p>
          <h1 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-text">
            Products, people, and channels.
            <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
              {" "}
              One unofficial bar.
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            Full Jupiter product grid plus public people and official X,
            Discord, and Telegram links. Sort, pin, shuffle. Not affiliated with
            Jupiter Labs.
          </p>
        </section>

        {/* View switcher */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {VIEWS.map((v) => {
            const active = view === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setView(v.id);
                  setQ("");
                }}
                className={
                  active
                    ? "inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-fg"
                    : "inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 text-xs font-medium text-muted transition hover:border-border2 hover:text-text"
                }
              >
                {v.label}
                <span className={active ? "text-[10px] opacity-70" : "text-[10px] text-faint"}>
                  {v.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product controls */}
        {view === "products" && (
          <div className="mb-6 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => {
                const active = cat === c.id;
                const count =
                  c.id === "all"
                    ? PRODUCTS.length
                    : c.id === "pinned"
                      ? pins.length
                      : PRODUCTS.filter((p) => p.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCat(c.id);
                      setOrderOverride(null);
                    }}
                    className={
                      active
                        ? "inline-flex h-8 items-center gap-1.5 rounded-full bg-primary/20 px-3 text-xs font-semibold text-primary ring-1 ring-primary/40"
                        : "inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/40 px-3 text-xs font-medium text-muted transition hover:border-border2 hover:text-text"
                    }
                  >
                    {c.label}
                    <span className="text-[10px] opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortMode);
                    setOrderOverride(null);
                  }}
                  className="h-9 rounded-full border border-border bg-card px-3 text-xs text-text outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label="Sort"
                >
                  <option value="featured">Featured first</option>
                  <option value="name">A–Z</option>
                  <option value="category">By category</option>
                </select>
                <button
                  type="button"
                  onClick={onShuffle}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-text transition hover:border-primary/40 hover:text-primary"
                >
                  <span aria-hidden>↻</span> Shuffle
                </button>
                {orderOverride && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrderOverride(null);
                      setAnimKey((k) => k + 1);
                    }}
                    className="inline-flex h-9 items-center rounded-full border border-border px-3 text-xs text-muted hover:text-text"
                  >
                    Reset order
                  </button>
                )}
              </div>
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setOrderOverride(null);
                }}
                placeholder="Search products…"
                className="h-9 w-full rounded-full border border-border bg-card px-3.5 text-xs text-text outline-none placeholder:text-faint focus:ring-2 focus:ring-primary/40 sm:w-56"
              />
            </div>
          </div>
        )}

        {view !== "products" && (
          <div className="mb-6">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={
                view === "people"
                  ? "Search people…"
                  : "Search channels…"
              }
              className="h-9 w-full rounded-full border border-border bg-card px-3.5 text-xs text-text outline-none placeholder:text-faint focus:ring-2 focus:ring-primary/40 sm:w-72"
            />
          </div>
        )}

        {/* PRODUCTS */}
        {view === "products" && (
          <>
            <p className="mb-3 text-xs text-faint">
              {items.length} product{items.length === 1 ? "" : "s"}
              {hydrated && pins.length > 0 ? ` · ${pins.length} pinned` : ""}
              {orderOverride ? " · shuffled" : ""}
            </p>
            <ul
              key={animKey}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {items.map((p, i) => {
                const pinned = pins.includes(p.id);
                return (
                  <li
                    key={p.id}
                    className="card-enter"
                    style={{ animationDelay: `${Math.min(i, 12) * 18}ms` }}
                  >
                    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card/70 p-3.5 transition hover:border-primary/35 hover:bg-card2/80 hover:shadow-[0_0_0_1px_rgba(199,242,132,0.08),0_18px_40px_rgba(0,0,0,0.35)]">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackOpen(p)}
                          className="flex min-w-0 flex-1 items-start gap-3 outline-none"
                        >
                          <ProductIcon product={p} />
                          <div className="min-w-0 pt-0.5">
                            <div className="truncate text-sm font-semibold tracking-tight text-text group-hover:text-primary">
                              {p.name}
                            </div>
                            <div className="mt-0.5 flex flex-wrap items-center gap-1">
                              <span className="rounded-md bg-border/50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted uppercase">
                                {p.category === "external"
                                  ? "external"
                                  : p.category}
                              </span>
                            </div>
                          </div>
                        </a>
                        <button
                          type="button"
                          aria-label={
                            pinned ? `Unpin ${p.name}` : `Pin ${p.name}`
                          }
                          aria-pressed={pinned}
                          onClick={() => togglePin(p.id)}
                          className={
                            pinned
                              ? "pin-pop inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary"
                              : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-faint transition hover:bg-border/50 hover:text-primary"
                          }
                        >
                          <PinIcon filled={pinned} />
                        </button>
                      </div>
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOpen(p)}
                        className="mt-auto line-clamp-2 text-xs leading-relaxed text-muted outline-none"
                      >
                        {p.blurb}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            {items.length === 0 && (
              <Empty
                text={
                  cat === "pinned"
                    ? "No pins yet — tap the pin on any product."
                    : "No matches."
                }
              />
            )}
          </>
        )}

        {/* PEOPLE */}
        {view === "people" && (
          <>
            <p className="mb-3 text-xs text-faint">
              {peopleList.length} public profile
              {peopleList.length === 1 ? "" : "s"} · incomplete on purpose —
              only clearly public faces
            </p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {peopleList.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </ul>
            {peopleList.length === 0 && <Empty text="No matches." />}
          </>
        )}

        {/* SOCIALS */}
        {(view === "x" ||
          view === "discord" ||
          view === "telegram" ||
          view === "github") && (
          <>
            <p className="mb-3 text-xs text-faint">
              {socialList.length} link{socialList.length === 1 ? "" : "s"}
              {view === "x" ? " · X / Twitter" : ""}
              {view === "discord" ? " · Discord" : ""}
              {view === "telegram" ? " · Telegram" : ""}
              {view === "github" ? " · GitHub" : ""}
            </p>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {socialList.map((s) => (
                <SocialCard key={s.id} social={s} />
              ))}
            </ul>
            {socialList.length === 0 && <Empty text="No matches." />}
          </>
        )}

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-text">
                The Unofficial Directory of Jupiter Products
              </p>
              <p className="mt-1 max-w-lg text-xs leading-relaxed text-muted">
                Not affiliated with Jupiter Labs. People and social lists are
                assembled from public pages and may be incomplete. Official
                jup.ag product links include an integrator referral.
              </p>
            </div>
            <div className="text-xs text-faint sm:text-right">
              <p>
                Made by{" "}
                <a
                  href="https://metasal.xyz/?ref=jupbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Metasal
                </a>
                {" · "}
                <a
                  href="https://x.com/metasal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text"
                >
                  @metasal
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="https://milysec.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text"
                >
                  milysec.com
                </a>
                {" · "}
                jup.bar
                {" · "}
                <a href="/feedback" className="hover:text-primary">
                  Feedback
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted">
      {text}
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <li>
      <a
        href={person.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("jup_person_click", {
            person_id: person.id,
            handle: person.handle,
          })
        }
        className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary/35 hover:bg-card2/80"
      >
        <Avatar label={person.name} handle={person.handle} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text group-hover:text-primary">
              {person.name}
            </span>
            <span className="text-xs text-muted">@{person.handle}</span>
          </div>
          <p className="mt-1 text-xs text-muted">{person.role}</p>
          {person.note && (
            <p className="mt-1 text-[11px] text-faint">{person.note}</p>
          )}
        </div>
      </a>
    </li>
  );
}

function SocialCard({ social }: { social: SocialLink }) {
  return (
    <li>
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track("jup_social_click", {
            social_id: social.id,
            platform: social.platform,
            outbound: social.href,
          })
        }
        className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary/35 hover:bg-card2/80"
      >
        <Avatar label={social.name} handle={social.name.replace("@","")} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text group-hover:text-primary">
              {social.name}
            </span>
            <PlatformBadge platform={social.platform} />
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {social.blurb}
          </p>
          <p className="mt-2 truncate text-[11px] text-faint">{social.href}</p>
        </div>
      </a>
    </li>
  );
}
