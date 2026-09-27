import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/600.css";
import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { placeOfWorshipJsonLd } from "@/lib/content/jsonld";
import { loadSiteFacts } from "@/lib/content/schema";

export const metadata: Metadata = {
  title: { default: "Haridham Ohio | HSAPSS Ohio", template: "%s | Haridham Ohio" },
  description: "Haridham Ohio, the HSAPSS Ohio place of worship in Hilliard, Ohio.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = JSON.stringify(placeOfWorshipJsonLd(loadSiteFacts())).replace(/</g, "\\u003c");

  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          dangerouslySetInnerHTML={{ __html: jsonLd }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
