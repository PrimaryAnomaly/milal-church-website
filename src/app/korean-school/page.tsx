import type { Metadata } from "next";
import { CHURCH, PHOTOS } from "@/lib/church";
import { getDictionary } from "@/i18n/get-dictionary";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { TbdChip } from "@/components/TbdChip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.koreanSchool.metaTitle ?? t.koreanSchool.title,
    description: t.koreanSchool.metaDescription,
  };
}

export default async function KoreanSchoolPage() {
  const t = await getDictionary();

  return (
    <PageShell>
      <PageHeader title={t.koreanSchool.title} intro={t.koreanSchool.intro} />

      <div className="mt-10 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] md:gap-10">
        <div>
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              {t.koreanSchool.detailsHeading}
            </h2>
            <dl className="mt-4 divide-y divide-border border-y border-border">
              <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-5">
                <dt className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                  {CHURCH.koreanSchoolTimeTbd ? (
                    <TbdChip label={t.common.tbd} />
                  ) : null}
                  {t.koreanSchool.timeHeading}
                </dt>
                <dd className="text-muted">{t.koreanSchool.time}</dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-5">
                <dt className="font-semibold text-foreground">
                  {t.koreanSchool.contactHeading}
                </dt>
                <dd className="text-muted">{t.koreanSchool.contact}</dd>
              </div>
            </dl>
          </section>
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">
              {t.koreanSchool.goalsHeading}
            </h2>
            <p className="mt-2 max-w-[65ch] text-muted">
              {t.koreanSchool.goals}
            </p>
          </section>
        </div>

        <ChurchPhoto
          src={PHOTOS.koreanSchool}
          alt={t.koreanSchool.photoAlt}
          width={1200}
          height={900}
          cover
          sizes="(max-width: 768px) 100vw, 416px"
        />
      </div>
    </PageShell>
  );
}
