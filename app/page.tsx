"use client";

import Image from "next/image";

const tokens = [
  { name: "SOL", price: "$148.20", change: "+3.2%", up: true },
  { name: "JUP", price: "$1.24", change: "+8.7%", up: true },
  { name: "WEN", price: "$0.000142", change: "-2.1%", up: false },
  { name: "BONK", price: "$0.0000234", change: "+12.4%", up: true },
  { name: "JTO", price: "$3.87", change: "-1.8%", up: false },
  { name: "PYTH", price: "$0.42", change: "+5.6%", up: true },
  { name: "W", price: "$0.58", change: "+2.1%", up: true },
  { name: "TNSR", price: "$0.89", change: "-4.3%", up: false },
];

const features = [
  {
    title: "Instant flow",
    desc: "Hover to pause. Click a ticker to open Jupiter Exchange with the token preselected.",
    icon: "⚡",
  },
  {
    title: "Always on top",
    desc: "Drag anywhere, double-click to toggle full width, and keep it pinned above your workspace.",
    icon: "📌",
  },
  {
    title: "Paste multiple mints",
    desc: "Quick add supports spaces, commas, and new lines. CSV import/export included.",
    icon: "📋",
  },
  {
    title: "Pin + reorder",
    desc: "Drag to reorder, pin favorites, or sort A\u2013Z to keep your list clean.",
    icon: "🔀",
  },
  {
    title: "Price move alerts",
    desc: "Configurable 1h move alerts with a sound test button built in.",
    icon: "🔔",
  },
  {
    title: "Jupiter settings",
    desc: "Use your own Jupiter API key and base URL for pricing and metadata.",
    icon: "🔑",
  },
  {
    title: "Jup Bar ready",
    desc: "Keep the bar on top while you explore markets and routes.",
    icon: "🚀",
  },
  {
    title: "Multiple watchlists",
    desc: "Coming soon for Cats who track different strategies.",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-accent to-accent2 shadow-[0_0_20px_rgba(249,114,98,0.4)]" />
            <span className="text-lg font-bold tracking-tight">jup.bar</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted sm:inline-flex">
              Just Uptodate Pricing
            </span>
            <a
              href="https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg"
              className="rounded-full bg-gradient-to-br from-accent to-accent2 px-4 py-2 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(249,114,98,0.3)]"
            >
              Download
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="flex flex-col items-center text-center">
          <div className="animate-on-scroll mb-8">
            <Image
              src="/jupbar-icon.png"
              alt="JupBar icon"
              width={96}
              height={96}
              priority
              className="rounded-[22px] shadow-[0_0_50px_rgba(247,176,79,0.25),0_0_100px_rgba(249,114,98,0.10)]"
              style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
            />
          </div>

          <div className="animate-on-scroll mb-4 flex flex-wrap justify-center gap-2">
            {["macOS App", "Jupiter Mobile", "Jupiter Exchange", "Jup Bar"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-bg/60 px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <h1 className="animate-on-scroll mb-6 max-w-3xl font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-bold tracking-tight">
            Just Uptodate Pricing
            <br />
            <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
              for Jupiter Cats.
            </span>
          </h1>

          <p className="animate-on-scroll mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted">
            JupBar keeps your favorite tokens visible across Jup Bar, Jupiter
            Mobile, and Jupiter Exchange. Fast, minimal, and always ready for a
            swap.
          </p>

          <div className="animate-on-scroll flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent2 px-7 py-3.5 text-[15px] font-semibold text-bg shadow-[0_14px_40px_rgba(249,114,98,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(249,114,98,0.35)]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download for macOS
            </a>
            <a
              href="https://jup.ag/?refId=yfgv2ibxy07v"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-[15px] font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
            >
              Open Jupiter Exchange
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>

          <p className="animate-on-scroll mt-6 text-xs text-muted/60">
            Instant menu bar access &middot; Hover to pause &middot; Click to
            swap on Jupiter
          </p>
        </div>
      </section>

      {/* Live Ticker Strip */}
      <section className="animate-on-scroll relative overflow-hidden border-y border-border/40 bg-card/30 py-4">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tokens, ...tokens].map((t, i) => (
            <div
              key={i}
              className="mx-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-bg/80 px-4 py-2 text-sm"
            >
              <span className="font-semibold">{t.name}</span>
              <span className="text-muted">{t.price}</span>
              <span className={t.up ? "text-emerald-400" : "text-red-400"}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="animate-on-scroll mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            See it in action
          </h2>
          <p className="text-muted">
            Dark mode views from the live app, sized to real ratios.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-[auto_auto]">
          {/* Manage - spans 2 rows */}
          <div className="animate-on-scroll group rounded-2xl border border-border bg-[#0e141b] p-4 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:row-span-2">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-[#1e2e3a]/90 to-[#0e141b]/80">
              <Image
                src="/landing-screens/jupbar-manage.png"
                alt="JupBar manage tickers window"
                width={712}
                height={935}
                className="h-auto w-full object-contain"
              />
            </div>
            <h4 className="mt-3 font-semibold">Token manager</h4>
            <p className="text-sm text-muted">
              Add mints, import CSVs, pin tokens, and control alerts in one
              place.
            </p>
          </div>

          {/* Floating */}
          <div className="animate-on-scroll group overflow-hidden rounded-2xl border border-border bg-[#0e141b] p-4 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-[#1e2e3a]/90 to-[#0e141b]/80">
              <div className="w-[180%] animate-ticker">
                <Image
                  src="/landing-screens/jupbar-floating.png"
                  alt="JupBar floating ticker bar"
                  width={905}
                  height={80}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <h4 className="mt-3 font-semibold">Floating ticker bar</h4>
            <p className="text-sm text-muted">
              Always-on-top pricing with hover-to-pause and instant Jupiter
              Exchange links.
            </p>
          </div>

          {/* Both */}
          <div className="animate-on-scroll group rounded-2xl border border-border bg-[#0e141b] p-4 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-[#1e2e3a]/90 to-[#0e141b]/80">
              <Image
                src="/landing-screens/jupbar-both.png"
                alt="JupBar floating bar with manager"
                width={310}
                height={226}
                className="h-auto w-full object-contain"
              />
            </div>
            <h4 className="mt-3 font-semibold">Bar + manager</h4>
            <p className="text-sm text-muted">
              Keep the bar visible while managing your list.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <div className="animate-on-scroll mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Why JupBar
          </h2>
          <p className="text-muted">
            Built for Jupiter Cats who live in the Jupiter Ecosystem.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="animate-on-scroll group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <div className="animate-on-scroll relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-bg p-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-16">
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent2/10 blur-3xl" />

          <div className="relative text-center">
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Download JupBar
            </h2>
            <p className="mx-auto mb-8 max-w-md text-muted">
              Built for Jupiter Cats who want pricing on top of everything.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-accent to-accent2 px-7 py-3.5 text-[15px] font-semibold text-bg shadow-[0_14px_40px_rgba(249,114,98,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(249,114,98,0.35)]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download Latest Build
              </a>
              <a
                href="https://jup.ag/?refId=yfgv2ibxy07v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-[15px] font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
              >
                Open Jupiter Exchange
              </a>
            </div>
            <p className="mt-6 text-sm text-muted/60">
              macOS DMG &middot; Apple Silicon &middot; macOS 14+
            </p>
            <div className="mt-6 mx-auto max-w-md">
              <div className="rounded-xl border border-border/60 bg-card/60 p-4">
                <p className="mb-3 text-xs font-semibold text-muted">macOS: Run after install to bypass &quot;App Damaged/Could not verify safe&quot;</p>
                <div className="flex gap-2">
                  <code className="flex-1 rounded bg-bg/80 px-3 py-2 font-mono text-xs text-accent overflow-x-auto">
                    xattr -rd com.apple.quarantine /Applications/jup.bar.app
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("xattr -rd com.apple.quarantine /Applications/jup.bar.app");
                      alert("Copied to clipboard!");
                    }}
                    className="shrink-0 rounded-lg bg-accent/20 hover:bg-accent/30 px-3 py-2 text-xs font-semibold text-accent transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl border-t border-border/40 px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <a
            href="https://metasal.xyz/?ref=jupbarapp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            metasal.xyz
          </a>
          <span>jup.bar &middot; JupBar for Jupiter Cats</span>
          <span className="opacity-60">
            v1.1.0 &middot; updated 2026-03-17
          </span>
        </div>
      </footer>
    </div>
  );
}
