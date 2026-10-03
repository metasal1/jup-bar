import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/site-chrome";
import { PEOPLE, pfpSrc } from "@/lib/community";

export const metadata: Metadata = {
  title: "Jupiter people directory | jup.bar",
  description:
    "Public Jupiter Exchange people with X profiles: Meow, Siong Ong, Xiao-Xiao J. Zhu, Kash Dhanda, 9yointern (Head of Growth), and more. Unofficial.",
  alternates: { canonical: "https://jup.bar/people" },
};

export default function PeopleIndex() {
  return (
    <SiteChrome crumb="Directory">
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Jupiter people
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Public X profiles only. Assembled from posts and bios. Not an official
        Jupiter Labs team page. Former and probable roles are labelled.
      </p>
      <ul className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {PEOPLE.map((person) => (
          <li key={person.id}>
            <Link
              href={`/people/${person.handle.toLowerCase()}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-card/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pfpSrc(person.handle)}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
              />
              <span>
                <span className="block text-sm font-semibold text-text">
                  {person.name}
                </span>
                <span className="text-xs text-muted">
                  @{person.handle} · {person.role}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SiteChrome>
  );
}
