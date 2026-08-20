import HomeClient from "./home-client";

export default function Page() {
  return (
    <>
      <div className="sr-only">
        <h1>jup.bar — Jupiter Exchange ecosystem links</h1>
        <p>
          Sortable icon directory of official Jupiter products. Swap, Perps,
          Lend, Multiply, Portfolio, Mobile, Studio, Prediction, and more. Every
          jup.ag outbound link includes a referral re-link.
        </p>
        <ul>
          <li>
            <a href="https://jup.ag/swap?refId=yfgv2ibxy07v&ref=yfgv2ibxy07v">
              Swap
            </a>
          </li>
          <li>
            <a href="https://jup.ag/perps?refId=yfgv2ibxy07v&ref=yfgv2ibxy07v">
              Perps
            </a>
          </li>
          <li>
            <a href="https://jup.ag/lend/earn?refId=yfgv2ibxy07v&ref=yfgv2ibxy07v">
              Lend Earn
            </a>
          </li>
          <li>
            <a href="https://jup.ag/portfolio?refId=yfgv2ibxy07v&ref=yfgv2ibxy07v">
              Portfolio
            </a>
          </li>
          <li>
            <a href="https://jup.ag/mobile?refId=yfgv2ibxy07v&ref=yfgv2ibxy07v">
              Mobile
            </a>
          </li>
        </ul>
      </div>
      <HomeClient />
    </>
  );
}
