const BODY = `# jup.bar

> The Unofficial Directory of Jupiter Products — sortable, pinable, shuffleable icon map of the Jupiverse.

## Disclaimer
Not affiliated with Jupiter Labs. Built by Metasal (metasal.xyz).

## Features
- Full official product grid (Trade · Earn · Manage · Apps · Developers · Community)
- Pin favourites (localStorage)
- Shuffle + A–Z / Featured / Category sort
- Category: **No Jup equivalent** for third-party tools (JupBar, jup.gifts, …)
- Official jup.ag / *.jup.ag links append referral refId+ref

## Site
- https://jup.bar/
- https://jup.bar/llms-full.txt
- GA4 G-ZEE2ETRWL9

## Credit
Metasal · @metasal · milysec.com
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
