import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/site-chrome";
import { PEOPLE, pfpSrc } from "@/lib/community";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ handle: p.handle.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const person = PEOPLE.find(
    (p) => p.handle.toLowerCase() === handle.toLowerCase(),
  );
  if (!person) return { title: "Not found | jup.bar" };
  const title = `${person.name} (@${person.handle}) | jup.bar`;
  const description = `${person.name} is ${person.role} in the Jupiter ecosystem. Public X: @${person.handle}. Unofficial jup.bar directory.`;
  return {
    title,
    description,
    alternates: { canonical: `https://jup.bar/people/${person.handle.toLowerCase()}` },
    openGraph: {
      title,
      description,
      url: `https://jup.bar/people/${person.handle.toLowerCase()}`,
    },
  };
}

export default async function PersonPage({ params }: Props) {
  const { handle } = await params;
  const person = PEOPLE.find(
    (p) => p.handle.toLowerCase() === handle.toLowerCase(),
  );
  if (!person) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    alternateName: `@${person.handle}`,
    jobTitle: person.role,
    url: `https://jup.bar/people/${person.handle.toLowerCase()}`,
    sameAs: [person.href],
  };

  return (
    <SiteChrome crumb="People">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pfpSrc(person.handle)}
          alt=""
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-full object-cover ring-1 ring-border"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text">
            {person.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            @{person.handle} · {person.role}
          </p>
          {person.note && (
            <p className="mt-1 text-xs text-faint">{person.note}</p>
          )}
        </div>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Public profile listed on jup.bar, an unofficial Jupiter directory. Role
        is taken from public bios and posts, not an official team page.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href={person.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg"
        >
          Open X @{person.handle}
        </a>
        <Link
          href="/people"
          className="inline-flex h-10 items-center rounded-full border border-border px-4 text-sm text-muted hover:text-text"
        >
          All people
        </Link>
      </div>
    </SiteChrome>
  );
}
