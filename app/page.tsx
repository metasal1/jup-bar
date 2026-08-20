import HomeClient from "./home-client";

export default function Page() {
  return (
    <>
      <div className="sr-only">
        <h1>jup.bar — The Unofficial Directory of Jupiter Products</h1>
        <p>
          Sortable, pinable, shuffleable map of every Jupiter app — Swap, Spot,
          Limit, DCA, Perps, Prediction, Lend, Borrow, Multiply, Strategies,
          Portfolio, Send, Mobile, Studio, Plugin, Governance, Docs, Support,
          Academy, and more. Built by Metasal. Not affiliated with Jupiter Labs.
        </p>
      </div>
      <HomeClient />
    </>
  );
}
