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

      <div className="mt-12 grid gap-8 border-y border-border py-10 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-12">
        <section>
          <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
            {CHURCH.mottoTbd ? <TbdChip label={t.common.tbd} /> : null}
            {t.about.mottoHeading}
          </h2>
          <p className="font-display mt-4 max-w-2xl text-2xl leading-relaxed text-foreground sm:text-3xl">
            {locale === "ko" ? t.about.mottoKo : t.about.motto}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t.about.affiliationHeading}
          </h2>
          <p className="mt-3 text-muted">{t.about.affiliation}</p>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
          {CHURCH.pastorTbd ? <TbdChip label={t.common.tbd} /> : null}
          {t.about.pastorHeading}
        </h2>
        <div className="mt-6 grid max-w-3xl items-start gap-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
          <ChurchPhoto
            src={PHOTOS.pastor}
            alt={t.about.pastorPhotoAlt}
            width={344}
            height={383}
            className="mx-auto w-44 sm:mx-0"
            sizes="176px"
          />
          <div className="max-w-[65ch]">
            <p className="font-medium text-foreground">{t.about.pastorName}</p>
            <p className="mt-2 text-muted">{t.about.pastorBio}</p>
          </div>
        </div>
      </section>

      <section className="mt-14 grid items-center gap-7 md:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)] md:gap-10">
        <ChurchPhoto
          src={PHOTOS.congregation}
          alt={t.about.congregationAlt}
          width={627}
          height={627}
          cover
          sizes="(max-width: 768px) 100vw, 416px"
        />
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t.about.identityHeading}
          </h2>
          <p className="mt-3 max-w-[65ch] text-muted">{t.about.identity}</p>
        </div>
      </section>
    </PageShell>
  );
}
