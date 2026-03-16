import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "jup.bar — JupBar for Jupiter Cats",
  description:
    "JupBar is a floating macOS ticker bar built for Jupiter Cats. Just Uptodate Pricing for Jupiter Mobile and Jupiter Exchange.",
  metadataBase: new URL("https://jup.bar"),
  openGraph: {
    title: "jup.bar — JupBar for Jupiter Cats",
    description:
      "JupBar is a floating macOS ticker bar for Jupiter Cats. Just Uptodate Pricing for Jupiter Mobile and Jupiter Exchange.",
    url: "https://jup.bar",
    siteName: "jup.bar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "jup.bar — JupBar for Jupiter Cats",
    description:
      "JupBar is a floating macOS ticker bar for Jupiter Cats. Just Uptodate Pricing for Jupiter Mobile and Jupiter Exchange.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${sora.variable} font-sans antialiased`}
      >
        {children}
        <Script
          defer
          src="https://stats.sal.fun/script.js"
          data-website-id="56372374-e075-490e-a908-1984d4095255"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
