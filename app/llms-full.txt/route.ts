const BODY = `# jup.bar — full reference

## Positioning
**The Unofficial Directory of Jupiter Products.**
Third-party catalog by Metasal. Not operated by or endorsed as official Jupiter Labs infrastructure.

## UX
- Categories: All · Pinned · Trade · Earn · Manage · Apps · Developers · Community · No Jup equivalent
- Sort: Featured first · A–Z · Category
- Pin: localStorage key jupbar.pins.v1
- Shuffle: client Fisher–Yates of current filter

## Official destinations (referral on jup.ag hosts)
Home, Swap, Spot, Trending, Watchlist, Limit, Recurring/DCA, Perps, Prediction,
Lend Earn, Lend Borrow, Multiply, Strategies, Stake, Rewards,
Portfolio, Send, Onboard, Updates,
Mobile, Studio, Studio Launch, Plugin,
Governance (vote.jup.ag), Support, Academy, User Docs, Status,
Developer Docs, Dev Blog, Data API

## No Jupiter equivalent (third-party)
- JupBar — macOS floating ticker (GitHub DMG)
- Jup Gifts — jup.gifts magic-link gifts
- Solana Icons — icons.sol.new
- sol.new — token launcher

## Referral
- Web jup.ag: refId + ref = yfgv2ibxy07v
- Mobile app: https://jupiter.go.link/l6gxn (Adjust code l6gxn)

## Builder
https://metasal.xyz · https://x.com/metasal · https://milysec.com
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
