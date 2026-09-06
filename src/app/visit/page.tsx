import type { Metadata } from "next";
import { PHOTOS } from "@/lib/church";
import { getDictionary } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.visit.title };
}

export default async function VisitPage() {
  const t = await getDictionary();

  const blocks = [
    { title: t.visit.expectTitle, body: t.visit.expectBody, kids: false },
    { title: t.visit.parkingTitle, body: t.visit.parkingBody, kids: false },
    { title: t.visit.kidsTitle, body: t.visit.kidsBody, kids: true },
    { title: t.visit.contactTitle, body: t.visit.contactBody, kids: false },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <PageHeader title={t.visit.title} intro={t.visit.intro} />

      <div className="mt-10 space-y-10">
        {blocks.map((block) => (
          <section key={block.title}>
            <h2 className="text-xl font-semibold text-foreground">
              {block.title}
            </h2>
            <p className="mt-2 max-w-[65ch] text-muted">{block.body}</p>
            {block.kids ? (
              <ChurchPhoto
                src={PHOTOS.children}
                alt={t.visit.kidsPhotoAlt}
                width={800}
                height={450}
                className="mt-5"
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
    </div>
  );
}
