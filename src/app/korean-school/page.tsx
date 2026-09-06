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

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t.koreanSchool.goalsHeading}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">{t.koreanSchool.goals}</p>
        </section>
        <section>
          <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
            {CHURCH.koreanSchoolTimeTbd ? (
              <TbdChip label={t.common.tbd} />
            ) : null}
            {t.koreanSchool.timeHeading}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">{t.koreanSchool.time}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t.koreanSchool.contactHeading}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">
            {t.koreanSchool.contact}
          </p>
        </section>
      </div>

      <ChurchPhoto
        src={PHOTOS.koreanSchool}
        alt={t.koreanSchool.photoAlt}
        width={1200}
        height={900}
        className="mt-12 max-w-md"
        sizes="(max-width: 448px) 100vw, 448px"
      />
    </PageShell>
  );
}
