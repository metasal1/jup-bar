const BODY = `# jup.ag ecosystem via jup.bar

## Summary
jup.bar is a third-party sortable icon directory of **Jupiter Exchange** products. It is not operated by Jupiter Labs. Every link to jup.ag / *.jup.ag includes the builder's referral parameters (\`refId\` and \`ref\` = yfgv2ibxy07v).

## Featured destinations (re-linked)
- Swap — https://jup.ag/swap
- Spot — https://jup.ag/spot
- Limit — https://jup.ag/limit
- Recurring / DCA — https://jup.ag/recurring
- Perps — https://jup.ag/perps
- Prediction — https://jup.ag/prediction
- Lend Earn — https://jup.ag/lend/earn
- Lend Borrow — https://jup.ag/lend/borrow
- Multiply — https://jup.ag/lend/borrow/multiply
- Portfolio — https://jup.ag/portfolio
- Send — https://jup.ag/send
- Mobile — https://jup.ag/mobile
- Studio — https://studio.jup.ag/launch
- Stake — https://jup.ag/stake
- Rewards — https://jup.ag/rewards
- Governance — https://vote.jup.ag/
- Developers — https://developers.jup.ag/

## UI
- Categories: Trade · Earn · Manage · Apps · Dev · Tools
- Sort: Featured · A–Z · Category
- Search filter client-side

## Tooling tile
- JupBar macOS DMG (GitHub release) — floating ticker; not a jup.ag re-link

## Builder
- https://metasal.xyz · https://x.com/metasal · https://github.com/metasal1/jup-bar
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
