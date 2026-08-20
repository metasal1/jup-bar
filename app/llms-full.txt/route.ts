const BODY = `# jup.bar — full reference

## Summary
jup.bar is the marketing and download site for **JupBar**, a free floating macOS menu-bar ticker built for Jupiter ($JUP) users (“Jupiter Cats”). It shows live token prices, supports paste-multiple-mints, pin/reorder, and 1h move alerts. Clicking a ticker opens Jupiter Exchange with the token preselected.

## Canonical URLs
- Site: https://jup.bar
- DMG: https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg
- App source: https://github.com/metasal1/macticker
- Site source: https://github.com/metasal1/jup-bar
- Builder: https://metasal.xyz · https://x.com/metasal

## Install (macOS)
1. Download jupbar-latest.dmg from the GitHub release link above.
2. Open the DMG and drag JupBar to Applications.
3. If Gatekeeper blocks: System Settings → Privacy & Security → Open Anyway, or:
   \`xattr -rd com.apple.quarantine /Applications/jup.bar.app\`

## Features
- Instant flow: hover pause; click ticker → Jupiter swap
- Always on top / full-width toggle
- Paste multiple mints (spaces, commas, newlines); CSV import/export
- Pin + drag reorder; A–Z sort
- Configurable 1h price-move alerts + sound test
- Built for Jupiter Mobile + Jupiter Exchange workflows

## Technical
- Landing: Next.js on Cloudflare Pages (jup-bar)
- Analytics: GA4 G-ZEE2ETRWL9
- Sitemap: https://jup.bar/sitemap.xml
- Robots: allow all + major AI crawlers

## Branding
- Tagline: Just Uptodate Pricing for Jupiter Cats
- Theme: dark (#0b0f12) with orange/coral accent gradient
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
