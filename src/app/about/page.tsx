import type { Metadata } from "next";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.about.title };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.about}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t.about.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted">{t.about.intro}</p>

      <section className="mt-10 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">{t.about.mottoHeading}</h2>
        <p className="mt-2 text-base text-foreground">
          {locale === "ko" ? t.about.mottoKo : t.about.motto}
        </p>
        <p className="mt-1 text-sm text-muted">
          {locale === "ko" ? t.about.motto : t.about.mottoKo}
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">{t.about.affiliationHeading}</h2>
        <p className="mt-2 text-base text-muted">{t.about.affiliation}</p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-foreground">{t.about.pastorHeading}</h2>
        <p className="mt-2 font-medium text-foreground">{t.about.pastorName}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{t.about.pastorBio}</p>
        <p className="mt-3 text-xs text-accent">{t.about.pastorVerify}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-foreground">{t.about.identityHeading}</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">{t.about.identity}</p>
      </section>
    </div>
  );
}
