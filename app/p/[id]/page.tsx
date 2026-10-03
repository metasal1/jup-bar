import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/site-chrome";
import { PRODUCTS } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return { title: "Not found | jup.bar" };
  const title = `${p.name} | jup.bar unofficial Jupiter directory`;
  const description = `${p.blurb}. ${p.official === false ? "Third-party listing, not a Jupiter Labs product." : "Official Jupiter product link with referral."} Unofficial directory by Metasal.`;
  return {
    title,
    description,
    alternates: { canonical: `https://jup.bar/p/${p.id}` },
    openGraph: {
      title,
      description,
      url: `https://jup.bar/p/${p.id}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) notFound();
  const related = PRODUCTS.filter(
    (x) => x.category === p.category && x.id !== p.id,
  ).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.name,
    url: `https://jup.bar/p/${p.id}`,
    description: p.blurb,
    isPartOf: { "@type": "WebSite", url: "https://jup.bar/" },
    about: {
      "@type": "SoftwareApplication",
      name: p.name,
      url: p.href,
      applicationCategory: "FinanceApplication",
    },
  };

  return (
    <SiteChrome crumb={`Product · ${p.category}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        {p.name}
      </h1>
      <p className="mt-2 text-sm text-muted">{p.blurb}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {p.official === false
          ? `${p.name} is listed on jup.bar because Jupiter does not ship a first-party equivalent. It is not operated by Jupiter Labs.`
          : `${p.name} is an official Jupiter surface. The outbound link below is a deep link (referral attached on jup.ag hosts). jup.bar is an unofficial directory.`}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
        >
          Open {p.name}
        </a>
        <Link
          href="/products"
          className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm text-muted hover:text-text"
        >
          All products
        </Link>
      </div>
      <p className="mt-4 break-all text-[11px] text-faint">{p.href}</p>
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold text-text">Same category</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/p/${r.id}`} className="text-sm text-primary hover:underline">
                  {r.name}
                </Link>
                <span className="text-xs text-muted"> - {r.blurb}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SiteChrome>
  );
}
