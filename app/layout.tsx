import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PRODUCTS } from "@/lib/products";
import { PEOPLE, ALL_SOCIALS } from "@/lib/community";

const GA_ID = "G-ZEE2ETRWL9";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "jup.bar — Unofficial Directory of Jupiter Products";
const description =
  "The unofficial directory of Jupiter products, people, and socials. Sort, pin, and shuffle Swap, Perps, Lend, Multiply, Portfolio, Mobile, Studio — plus X, Discord, and Telegram. Built by Metasal.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://jup.bar"),
  alternates: { canonical: "https://jup.bar/" },
  openGraph: {
    title,
    description,
    url: "https://jup.bar/",
    siteName: "jup.bar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/opengraph.png?v=3",
        width: 1200,
        height: 630,
        alt: title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/opengraph.png?v=3"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  other: { "theme-color": "#0A0E13" },
};

const productItems = PRODUCTS.filter((p) => p.official !== false)
  .slice(0, 40)
  .map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: p.href,
    description: p.blurb,
  }));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://jup.bar/#website",
      url: "https://jup.bar/",
      name: "jup.bar",
      description,
      publisher: { "@id": "https://jup.bar/#org" },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://jup.bar/#org",
      name: "jup.bar (unofficial)",
      url: "https://jup.bar/",
      logo: "https://jup.bar/jupbar-icon.png",
      founder: {
        "@type": "Person",
        name: "Metasal",
        url: "https://metasal.xyz",
        sameAs: ["https://x.com/metasal"],
      },
      description:
        "Unofficial directory of Jupiter Exchange products, people, and social channels. Not affiliated with Jupiter Labs.",
      sameAs: [
        "https://x.com/metasal",
        "https://github.com/metasal1/jup-bar",
        "https://milysec.com",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://jup.bar/#products",
      name: "Jupiter products",
      numberOfItems: productItems.length,
      itemListElement: productItems,
    },
    {
      "@type": "ItemList",
      "@id": "https://jup.bar/#people",
      name: "Public Jupiter people",
      numberOfItems: PEOPLE.length,
      itemListElement: PEOPLE.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Person",
          name: p.name,
          url: p.href,
          alternateName: `@${p.handle}`,
          jobTitle: p.role,
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": "https://jup.bar/#socials",
      name: "Jupiter social channels",
      numberOfItems: ALL_SOCIALS.length,
      itemListElement: ALL_SOCIALS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: s.href,
        description: s.blurb,
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-jup-bar" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});window.gtag=gtag;`}
        </Script>
      </body>
    </html>
  );
}
