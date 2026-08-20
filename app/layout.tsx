import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-ZEE2ETRWL9";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const title = "jup.bar — Jupiter Exchange ecosystem links";
const description =
  "Sortable icon directory of Jupiter products — Swap, Perps, Lend, Multiply, Portfolio, Mobile, Studio, and more. Every jup.ag link is a referral re-link.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://jup.bar"),
  alternates: {
    canonical: "https://jup.bar",
  },
  openGraph: {
    title,
    description,
    url: "https://jup.bar",
    siteName: "jup.bar",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  other: {
    "theme-color": "#0b0f12",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://jup.bar/#website",
      url: "https://jup.bar",
      name: "jup.bar",
      description,
      publisher: { "@id": "https://jup.bar/#org" },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://jup.bar/#org",
      name: "jup.bar",
      url: "https://jup.bar",
      logo: "https://jup.bar/jupbar-icon.png",
      sameAs: [
        "https://x.com/metasal",
        "https://github.com/metasal1/jup-bar",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://jup.bar/#ecosystem",
      name: "Jupiter Exchange ecosystem",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Jupiter Swap",
          url: "https://jup.ag/swap",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jupiter Perps",
          url: "https://jup.ag/perps",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Jupiter Lend",
          url: "https://jup.ag/lend/earn",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Jupiter Portfolio",
          url: "https://jup.ag/portfolio",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Jupiter Mobile",
          url: "https://jup.ag/mobile",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${sora.variable} font-sans antialiased`}
      >
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-jup-bar" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');window.gtag=gtag;`}
        </Script>
      </body>
    </html>
  );
}
