import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.koreanSchool.title };
}

export default async function KoreanSchoolPage() {
  const t = await getDictionary();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.koreanSchool}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.koreanSchool.title}
      </h1>
      <p className="mt-3 text-muted">{t.koreanSchool.intro}</p>

      <section className="mt-8 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {t.koreanSchool.goalsHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.koreanSchool.goals}</p>
      </section>

      <section className="mt-4 rounded-xl border-2 border-dashed border-accent bg-accent-soft/40 p-6">
        <PlaceholderBanner label={t.common.placeholderBanner} />
        <h2 className="mt-3 text-lg font-semibold text-foreground">
          {t.koreanSchool.timeHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.koreanSchool.time}</p>
      </section>

      <section className="mt-4 rounded-xl border-2 border-dashed border-accent bg-accent-soft/40 p-6">
        <PlaceholderBanner label={t.common.placeholderBanner} />
        <h2 className="mt-3 text-lg font-semibold text-foreground">
          {t.koreanSchool.contactHeading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.koreanSchool.contact}</p>
        <p className="mt-3 text-sm font-semibold text-accent">{t.common.emailPhone}</p>
      </section>

      <p className="mt-6 text-xs text-muted">{t.koreanSchool.noAlbums}</p>
    </div>
  );
}
