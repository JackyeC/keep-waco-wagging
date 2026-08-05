import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Parisienne,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { brandLanguage, siteConfig } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${brandLanguage.heroLine}`,
    template: "%s",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google:
            process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
            process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  openGraph: {
    title: `${siteConfig.name} — ${brandLanguage.heroLine}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/pictures/og-share.webp",
        width: 1200,
        height: 630,
        alt: "Keep Waco Wagging — group dog walk in Waco, Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${brandLanguage.heroLine}`,
    description: siteConfig.description,
    images: ["/pictures/og-share.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${parisienne.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-bark">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-wag-sage focus:px-4 focus:py-2 focus:text-cream focus:outline-none"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
