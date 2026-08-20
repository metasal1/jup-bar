import HomeClient from "./home-client";
import { PRODUCTS } from "@/lib/products";
import { PEOPLE, ALL_SOCIALS } from "@/lib/community";

export default function Page() {
  return (
    <>
      <div className="sr-only">
        <h1>jup.bar — The Unofficial Directory of Jupiter Products</h1>
        <p>
          Unofficial directory of Jupiter products, people, X accounts, Discord,
          and Telegram. Built by Metasal. Not affiliated with Jupiter Labs.
        </p>
        <h2>Products</h2>
        <ul>
          {PRODUCTS.map((p) => (
            <li key={p.id}>
              <a href={p.href}>{p.name}</a> — {p.blurb}
            </li>
          ))}
        </ul>
        <h2>People</h2>
        <ul>
          {PEOPLE.map((p) => (
            <li key={p.id}>
              <a href={p.href}>
                {p.name} (@{p.handle})
              </a>{" "}
              — {p.role}
            </li>
          ))}
        </ul>
        <h2>Social channels</h2>
        <ul>
          {ALL_SOCIALS.map((s) => (
            <li key={s.id}>
              <a href={s.href}>{s.name}</a> — {s.blurb}
            </li>
          ))}
        </ul>
      </div>
      <HomeClient />
    </>
  );
}
