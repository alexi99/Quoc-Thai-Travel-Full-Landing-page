import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { LOCALE_META, LOCALE_ORDER, dictionaries } from "@/i18n/config";
import { TOUR } from "@/lib/tour-data";

const en = dictionaries.en;

/** hreflang alternates: one entry per supported language + x-default. */
const languageAlternates = Object.fromEntries([
  ...LOCALE_ORDER.map((code) => [
    LOCALE_META[code].htmlLang,
    `${TOUR.siteUrl}/?lang=${code}`,
  ]),
  ["x-default", TOUR.siteUrl],
]);

export const metadata: Metadata = {
  metadataBase: new URL(TOUR.siteUrl),
  title: en.meta.title,
  description: en.meta.description,
  keywords: en.meta.keywords,
  alternates: {
    canonical: TOUR.siteUrl,
    languages: languageAlternates,
  },
  openGraph: {
    type: "website",
    url: TOUR.siteUrl,
    siteName: TOUR.brand,
    title: en.meta.title,
    description: en.meta.description,
    locale: "en_US",
    alternateLocale: ["fr_FR", "vi_VN", "es_ES", "zh_CN", "it_IT", "ko_KR"],
    images: [
      {
        url: "/images/hero-halong.jpg",
        width: 1200,
        height: 630,
        alt: "Sunrise over the limestone islands of Ha Long Bay, Vietnam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
    images: ["/images/hero-halong.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

/** Structured data describing the tour product for rich results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Product", "TouristTrip"],
      name: "Hanoi – Ninh Binh – Ha Long Bay 3-Day Small Group Tour",
      description: en.meta.description,
      image: [`${TOUR.siteUrl}/images/hero-halong.jpg`],
      brand: { "@type": "Brand", name: TOUR.brand },
      touristType: ["Families", "Couples", "Mature travellers"],
      itinerary: {
        "@type": "ItemList",
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "TouristAttraction",
              name: "Phat Diem Cathedral, Tam Coc & Thung Nang, Ninh Binh",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "TouristAttraction",
              name: "Ha Long Bay overnight cruise, Titop Island & Luon Cave",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "TouristAttraction",
              name: "Sung Sot (Surprise) Cave, Ha Long Bay",
            },
          },
        ],
      },
      offers: {
        "@type": "Offer",
        price: String(TOUR.priceAdultUsd),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: TOUR.siteUrl,
        validFrom: "2025-01-01",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(TOUR.ratingValue),
        reviewCount: String(TOUR.reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: en.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "TravelAgency",
      name: TOUR.brand,
      url: TOUR.siteUrl,
      email: TOUR.email,
      telephone: TOUR.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 Hang Bac Street",
        addressLocality: "Hanoi",
        addressCountry: "VN",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Loaded via <link> (not next/font) so the build never depends on
            network access to Google Fonts. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
        />
        {LOCALE_ORDER.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={LOCALE_META[code].htmlLang}
            href={`${TOUR.siteUrl}/?lang=${code}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={TOUR.siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
