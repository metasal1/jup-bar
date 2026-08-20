const BODY = `# jup.bar

> Floating macOS ticker bar for Jupiter Cats — Just Uptodate Pricing for Jupiter Mobile and Jupiter Exchange.

## Site
- Homepage: https://jup.bar/
- Download (DMG): https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg
- Source: https://github.com/metasal1/macticker
- Landing repo: https://github.com/metasal1/jup-bar

## Product
- Name: JupBar
- Platform: macOS
- Price: Free
- Version: 1.1.0
- Features: floating always-on-top ticker, multi-mint paste, pin/reorder, price-move alerts, click-to-open Jupiter swap

## Contact
- Builder: https://metasal.xyz
- X: https://x.com/metasal

## Optional
- Full text: https://jup.bar/llms-full.txt
- Sitemap: https://jup.bar/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
