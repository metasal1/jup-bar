import HomeClient from "./home-client";

export default function Page() {
  return (
    <>
      <div className="sr-only">
        <h1>JupBar — Just Uptodate Pricing for Jupiter Cats</h1>
        <p>
          Free macOS floating ticker bar for Jupiter Mobile and Jupiter Exchange.
          Download JupBar for live Solana token prices, multi-mint watchlists, and
          one-click Jupiter swaps.
        </p>
        <a href="https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg">
          Download JupBar DMG
        </a>
      </div>
      <HomeClient />
    </>
  );
}
