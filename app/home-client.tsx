"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CATEGORIES,
  PRODUCTS,
  sortProducts,
  type Product,
  type ProductCategory,
  type SortMode,
} from "@/lib/products";

function trackOpen(p: Product) {
  try {
    window.gtag?.("event", "jup_relink_click", {
      product_id: p.id,
      product_name: p.name,
      category: p.category,
      outbound: p.href,
    });
  } catch {
    /* ignore */
  }
}

function Monogram({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "J";
  return (
    <div
      aria-hidden
      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/90 to-accent2/90 text-lg font-bold text-bg shadow-[0_0_24px_rgba(249,114,98,0.25)]"
    >
      {letter}
    </div>
  );
}

function ProductIcon({ product }: { product: Product }) {
  if (product.id === "jupbar") {
    return (
      <Image
        src="/jupbar-icon.png"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 rounded-2xl shadow-[0_0_24px_rgba(247,176,79,0.25)]"
      />
    );
  }
  if (product.icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/icons/${product.icon}`}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 rounded-2xl bg-card/80 object-contain p-1.5 ring-1 ring-border/60"
      />
    );
  }
  return <Monogram name={product.name} />;
}

export default function HomeClient() {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortMode>("featured");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    let list = PRODUCTS;
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.blurb.toLowerCase().includes(query) ||
          p.category.includes(query),
      );
    }
    return sortProducts(list, sort);
  }, [cat, sort, q]);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-accent to-accent2 shadow-[0_0_20px_rgba(249,114,98,0.4)]" />
            <span className="text-lg font-bold tracking-tight">jup.bar</span>
            <span className="hidden rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted sm:inline-flex">
              Jupiter ecosystem · re-links
            </span>
          </div>
          <a
            href={PRODUCTS.find((p) => p.id === "home")!.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOpen(PRODUCTS.find((p) => p.id === "home")!)}
            className="rounded-full bg-gradient-to-br from-accent to-accent2 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            Open jup.ag
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Jupiter Exchange ecosystem
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-bold tracking-tight">
            Every Jupiter surface.
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              {" "}
              One bar of links.
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Sortable icon directory of official Jupiter products. Every outbound
            jup.ag link carries our referral — Trade, Earn, Manage, Mobile,
            Studio, and more.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={
                    active
                      ? "rounded-full bg-gradient-to-br from-accent to-accent2 px-3.5 py-1.5 text-xs font-semibold text-bg"
                      : "rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted hover:border-accent/40 hover:text-text"
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor="sort">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-text"
            >
              <option value="featured">Featured</option>
              <option value="name">A–Z</option>
              <option value="category">Category</option>
            </select>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-full min-w-[10rem] rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-text placeholder:text-muted sm:w-44"
            />
          </div>
        </div>

        <p className="mb-4 text-xs text-muted">
          {items.length} link{items.length === 1 ? "" : "s"}
          {cat !== "all" ? ` · ${cat}` : ""}
        </p>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOpen(p)}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card/70 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <ProductIcon product={p} />
                  <span className="rounded-full border border-border/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted uppercase">
                    {p.category}
                  </span>
                </div>
                <div>
                  <div className="font-semibold tracking-tight text-text group-hover:text-accent">
                    {p.name}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                    {p.blurb}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {items.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">No matches.</p>
        )}

        <footer className="mt-16 flex flex-col gap-2 border-t border-border/50 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            Built by{" "}
            <a
              href="https://metasal.xyz/?ref=jupbar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              metasal.xyz
            </a>
            {" · "}
            jup.bar ecosystem directory
          </span>
          <span className="opacity-70">
            Outbound jup.ag links use referral · not affiliated with Jupiter
            Labs beyond integrator re-links
          </span>
        </footer>
      </main>
    </div>
  );
}
