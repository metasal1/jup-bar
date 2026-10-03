import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site-chrome";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Jupiter products directory | jup.bar",
  description:
    "Unofficial index of Jupiter Exchange products: Swap, Perps, Lend, Multiply, Studio, Mobile, Verified, plus third-party tools like jup.fun.",
  alternates: { canonical: "https://jup.bar/products" },
  openGraph: {
    title: "Jupiter products directory | jup.bar",
    description:
      "Unique pages for every Jupiter product listing on the unofficial jup.bar directory.",
    url: "https://jup.bar/products",
  },
};

export default function ProductsIndex() {
  const cats = CATEGORIES.filter(
    (c) => c.id !== "all" && c.id !== "pinned",
  );
  return (
    <SiteChrome crumb="Directory">
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Jupiter products
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Unique pages for each listing. Official jup.ag links include a referral.
        This is not Jupiter Labs.
      </p>
      {cats.map((c) => {
        const items = PRODUCTS.filter((p) => p.category === c.id);
        if (!items.length) return null;
        return (
          <section key={c.id} className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">
              {c.label}
            </h2>
            <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
              {items.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/p/${p.id}`}
                    className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-card/60"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-text">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {p.blurb}
                      </span>
                    </span>
                    <span className="shrink-0 text-[10px] font-medium uppercase text-faint">
                      {p.official === false ? "external" : "official"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </SiteChrome>
  );
}
