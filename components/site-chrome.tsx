import Link from "next/link";

export function SiteChrome({
  children,
  crumb,
}: {
  children: React.ReactNode;
  crumb?: string;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/jupiter-logo.svg"
              alt=""
              width={22}
              height={22}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-sm font-semibold tracking-tight text-text">
              jup.bar
            </span>
            <span className="hidden rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
              Unofficial
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link href="/products" className="text-muted hover:text-primary">
              Products
            </Link>
            <Link href="/people" className="text-muted hover:text-primary">
              People
            </Link>
            <Link href="/feedback" className="text-muted hover:text-primary">
              Feedback
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {crumb && (
          <p className="mb-4 text-[11px] font-medium tracking-wide text-faint uppercase">
            {crumb}
          </p>
        )}
        {children}
      </main>
      <footer className="mx-auto max-w-3xl border-t border-border px-4 py-8 text-xs text-faint sm:px-6">
        <p>
          The Unofficial Directory of Jupiter Products. Not affiliated with
          Jupiter Labs.{" "}
          <Link href="/" className="text-muted hover:text-primary">
            Home
          </Link>
        </p>
      </footer>
    </div>
  );
}
