import type { Metadata } from "next";
import { PHOTOS } from "@/lib/church";
import { getDictionary } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=15+Alpha+Road%2C+Chelmsford%2C+MA+01824";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.visit.metaTitle ?? t.visit.title,
    description: t.visit.metaDescription,
  };
}

export default async function VisitPage() {
  const t = await getDictionary();

  const blocks = [
    {
      key: "expect",
      title: t.visit.expectTitle,
      body: t.visit.expectBody,
      kids: false,
    },
    {
      key: "parking",
      title: t.visit.parkingTitle,
      body: t.visit.parkingBody,
      kids: false,
    },
    {
      key: "kids",
      title: t.visit.kidsTitle,
      body: t.visit.kidsBody,
      kids: true,
    },
    {
      key: "contact",
      title: t.visit.contactTitle,
      body: t.visit.contactBody,
      kids: false,
    },
  ];

  return (
    <PageShell>
      <PageHeader title={t.visit.title} intro={t.visit.intro} />

      <div className="mt-10 space-y-10">
        {blocks.map((block) => (
          <section key={block.key}>
            <h2 className="text-xl font-semibold text-foreground">
              {block.title}
            </h2>
            <p className="mt-2 max-w-[65ch] text-muted">{block.body}</p>
            {block.key === "parking" ? (
              <div className="mt-4">
                <ButtonLink href={MAPS_URL} variant="secondary" external>
                  {t.visit.mapsLabel}
                </ButtonLink>
              </div>
            ) : null}
            {block.kids ? (
              <ChurchPhoto
                src={PHOTOS.children}
                alt={t.visit.kidsPhotoAlt}
                width={800}
                height={450}
                className="mt-5 max-w-md"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/worship">{t.visit.ctaWorship}</ButtonLink>
        <ButtonLink href="/generations" variant="secondary">
          {t.visit.ctaGenerations}
        </ButtonLink>
      </div>
    </PageShell>
  );
}
