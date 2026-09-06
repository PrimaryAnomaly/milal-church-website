import type { Metadata } from "next";
import { CHURCH, PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { TbdChip } from "@/components/TbdChip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.about.metaTitle ?? t.about.title,
    description: t.about.metaDescription,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <PageShell>
      <PageHeader title={t.about.title} intro={t.about.intro} />

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
          {CHURCH.mottoTbd ? <TbdChip label={t.common.tbd} /> : null}
          {t.about.mottoHeading}
        </h2>
        <p className="font-display mt-4 text-xl text-foreground sm:text-2xl">
          {locale === "ko" ? t.about.mottoKo : t.about.motto}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.about.affiliationHeading}
        </h2>
        <p className="mt-2 text-muted">{t.about.affiliation}</p>
      </section>

      <section className="mt-10">
        <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
          {CHURCH.pastorTbd ? <TbdChip label={t.common.tbd} /> : null}
          {t.about.pastorHeading}
        </h2>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
          <ChurchPhoto
            src={PHOTOS.pastor}
            alt={t.about.pastorPhotoAlt}
            width={344}
            height={383}
            className="mx-auto w-44 shrink-0 sm:mx-0"
            sizes="176px"
          />
          <div className="max-w-[65ch]">
            <p className="font-medium text-foreground">{t.about.pastorName}</p>
            <p className="mt-2 text-muted">{t.about.pastorBio}</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.about.identityHeading}
        </h2>
        <p className="mt-2 max-w-[65ch] text-muted">{t.about.identity}</p>
        <ChurchPhoto
          src={PHOTOS.congregation}
          alt={t.about.congregationAlt}
          width={627}
          height={627}
          className="mt-5 max-w-md"
          sizes="(max-width: 448px) 100vw, 448px"
        />
      </section>
    </PageShell>
  );
}
