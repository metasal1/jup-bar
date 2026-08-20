import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-ZEE2ETRWL9";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "jup.bar — Unofficial Directory of Jupiter Products";
const description =
  "The unofficial directory of Jupiter products. Sort, pin, and shuffle Swap, Perps, Lend, Multiply, Portfolio, Mobile, Studio, Docs, and more — with referral re-links on every official jup.ag URL.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://jup.bar"),
  alternates: { canonical: "https://jup.bar" },
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
  other: { "theme-color": "#0A0E13" },
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
    },
    {
      "@type": "Organization",
      "@id": "https://jup.bar/#org",
      name: "jup.bar (unofficial)",
      url: "https://jup.bar",
      founder: {
        "@type": "Person",
        name: "Metasal",
        url: "https://metasal.xyz",
      },
      description:
        "Unofficial directory of Jupiter Exchange products. Not affiliated with Jupiter Labs.",
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
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');window.gtag=gtag;`}
        </Script>
      </body>
    </html>
  );
}
