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

const title = "jup.bar — JupBar for Jupiter Cats";
const description =
  "JupBar is a floating macOS ticker bar built for Jupiter Cats. Just Uptodate Pricing for Jupiter Mobile and Jupiter Exchange.";

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
        "https://github.com/metasal1/macticker",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://jup.bar/#app",
      name: "JupBar",
      applicationCategory: "FinanceApplication",
      operatingSystem: "macOS",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      downloadUrl:
        "https://github.com/metasal1/macticker/releases/latest/download/jupbar-latest.dmg",
      softwareVersion: "1.1.0",
      description,
      url: "https://jup.bar",
      author: { "@id": "https://jup.bar/#org" },
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
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
