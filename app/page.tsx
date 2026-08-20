import HomeClient from "./home-client";

export default function Page() {
  return (
    <>
      <div className="sr-only">
        <h1>jup.bar — The Unofficial Directory of Jupiter Products</h1>
        <p>
          Products, people, X/Twitter accounts, Discord, and Telegram links for
          the Jupiter ecosystem. Built by Metasal. Not affiliated with Jupiter
          Labs.
        </p>
        <h2>Official socials</h2>
        <ul>
          <li>
            <a href="https://discord.gg/jup">Discord</a>
          </li>
          <li>
            <a href="https://t.me/jup_dao">Telegram DAO</a>
          </li>
          <li>
            <a href="https://t.me/jup_dev">Telegram Dev</a>
          </li>
          <li>
            <a href="https://x.com/JupiterExchange">@JupiterExchange</a>
          </li>
          <li>
            <a href="https://x.com/JupDevRel">@JupDevRel</a>
          </li>
          <li>
            <a href="https://x.com/weremeow">Meow · @weremeow</a>
          </li>
        </ul>
      </div>
      <HomeClient />
    </>
  );
}
