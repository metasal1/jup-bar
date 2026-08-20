import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata: Metadata = {
  title: "Feedback — jup.bar",
  description:
    "Report bugs, missing Jupiter products, outdated links, or ideas for the unofficial jup.bar directory. Goes to bugs@metasal.xyz.",
  alternates: { canonical: "https://jup.bar/feedback" },
  openGraph: {
    title: "Feedback — jup.bar",
    description:
      "Typeform-style feedback for the unofficial Jupiter product directory.",
    url: "https://jup.bar/feedback",
    images: [{ url: "/images/opengraph.png?v=3", width: 1200, height: 630 }],
  },
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-text"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/jupiter-logo.svg"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
            />
            jup.bar
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-muted hover:text-primary"
          >
            ← Directory
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <FeedbackForm />
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-faint">
          Reports email{" "}
          <a
            href="mailto:bugs@metasal.xyz"
            className="text-muted hover:text-primary"
          >
            bugs@metasal.xyz
          </a>{" "}
          via Resend · not affiliated with Jupiter Labs
        </p>
      </main>
    </div>
  );
}
