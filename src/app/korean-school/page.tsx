import type { Metadata } from "next";
import { PHOTOS } from "@/lib/church";
import { getDictionary } from "@/i18n/get-dictionary";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.koreanSchool.title };
}

export default async function KoreanSchoolPage() {
  const t = await getDictionary();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <PageHeader title={t.koreanSchool.title} intro={t.koreanSchool.intro} />
      <ChurchPhoto
        src={PHOTOS.koreanSchool}
        alt={t.koreanSchool.photoAlt}
        width={1200}
        height={900}
        className="mt-8"
      />

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            {t.koreanSchool.goalsHeading}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">{t.koreanSchool.goals}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-foreground">
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
    </div>
  );
}
