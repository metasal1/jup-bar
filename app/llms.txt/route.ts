const BODY = `# jup.bar

> Sortable Jupiter Exchange ecosystem directory. Icon grid of official products with referral re-links on every jup.ag URL.

## Purpose
- Landing hub for Jupiter Cats to open Swap, Perps, Lend, Multiply, Portfolio, Mobile, Studio, Prediction, and more
- All outbound https://jup.ag (and *.jup.ag) links append referral refId/ref = yfgv2ibxy07v
- Optional: JupBar macOS ticker download (non-referral GitHub DMG)

## Site
- Homepage: https://jup.bar/
- GA4: G-ZEE2ETRWL9
- Sitemap: https://jup.ag is external; our sitemap is https://jup.ag no — https://jup.bar/sitemap.xml

## Contact
- Builder: https://metasal.xyz/?ref=jupbar
- X: https://x.com/metasal
- Full text: https://jup.bar/llms-full.txt
`;

export function GET() {
  return new Response(BODY.replace("https://jup.ag no — ", ""), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
