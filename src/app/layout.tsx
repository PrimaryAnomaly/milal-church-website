import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { PHOTOS } from "@/lib/church";
import { buildChurchJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/** Display / motto / scripture. Hangul + Latin from the face itself. */
const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t.meta.titleDefault,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: "Boston Milal Korean Church",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? "en_US" : "ko_KR",
      images: [
        {
          url: PHOTOS.congregation,
          width: 627,
          height: 627,
          alt: "Church gathered photo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <html lang={locale} className={notoSerifKr.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* Pretendard variable (Hangul + Latin); jsDelivr CDN works on Vercel */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-[100dvh] font-sans antialiased">
        <JsonLd data={buildChurchJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          {t.nav.skip}
        </a>
        <div className="flex min-h-[100dvh] flex-col">
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
