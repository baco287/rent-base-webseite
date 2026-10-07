import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "./globals.css";
import { SITE } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/ui/reveal";
import { MobileCta } from "@/components/mobile-cta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s · RentBase" },
  description: SITE.description,
  applicationName: "RentBase",
  keywords: ["Autovermietung Software", "Fahrzeugvermietung Software", "Vermietsoftware", "Fuhrparkverwaltung", "digitale Fahrzeugübergabe", "digitale Fahrzeugrückgabe", "Mietwagen Software"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE.url,
    siteName: "RentBase",
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/brand/rentbase-og.png", width: 1200, height: 630, alt: "RentBase – Rental Solutions" }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: ["/brand/rentbase-og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="min-h-dvh">
        <a href="#inhalt" className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt">{children}</main>
        <SiteFooter />
        <MobileCta />
        <RevealObserver />
      </body>
    </html>
  );
}
