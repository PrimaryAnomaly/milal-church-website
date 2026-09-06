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
import "./globals.css";

/** Display / motto / scripture. Hangul + Latin from the face itself. */
const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      locale: "en_US",
      alternateLocale: "ko_KR",
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

  return (
    <html lang={locale} className={notoSerifKr.variable}>
      <head>
        {/* Pretendard primary sans, jsDelivr CDN (Hangul-capable; works on Vercel) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-[100dvh] font-sans antialiased">
        <JsonLd data={buildChurchJsonLd()} />
        <div className="flex min-h-[100dvh] flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
