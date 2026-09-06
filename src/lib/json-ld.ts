import { CHURCH, PHOTOS } from "@/lib/church";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

/** schema.org Church (+ WebSite) graph. No telephone or email. */
export function buildChurchJsonLd(): Record<string, unknown> {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Church",
        name: CHURCH.nameEn,
        alternateName: [CHURCH.nameKo, "Milal Church"],
        url,
        image: [absoluteUrl(PHOTOS.congregation), absoluteUrl(PHOTOS.worship)],
        logo: absoluteUrl(PHOTOS.logo),
        address: {
          "@type": "PostalAddress",
          streetAddress: CHURCH.addressLine1,
          addressLocality: "Chelmsford",
          addressRegion: "MA",
          postalCode: "01824",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CHURCH.geo.lat,
          longitude: CHURCH.geo.lng,
        },
        hasMap: CHURCH.mapsUrl,
        areaServed: ["Chelmsford", "Greater Boston", "Massachusetts"],
        knowsLanguage: ["ko", "en"],
        isAccessibleForFree: true,
        openingHours: "Su 10:00",
        sameAs: [CHURCH.youtubeUrl, CHURCH.facebookUrl],
        description:
          "Korean Presbyterian church (KAPC) in Chelmsford, Massachusetts. Sunday worship at 10:00 AM.",
      },
      {
        "@type": "WebSite",
        name: CHURCH.nameEn,
        url,
      },
    ],
  };
}
