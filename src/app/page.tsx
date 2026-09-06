import Link from "next/link";
import { CHURCH } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <div>
      <section className="bg-accent-soft/60">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {t.home.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {locale === "ko" ? t.home.nameKo : t.home.nameEn}
          </h1>
          <p className="mt-1 text-base text-muted sm:text-lg">
            {locale === "ko" ? t.home.nameEn : t.home.nameKo}
          </p>

          <PlaceholderBanner label={t.common.placeholderBanner} className="mt-5 max-w-xl" />
          <p className="mt-3 text-sm font-medium text-accent">{t.home.mottoLabel}</p>
          <p className="mt-1 text-lg font-medium text-foreground sm:text-xl">
            {locale === "ko" ? t.home.mottoKoLine : t.home.motto}
          </p>
          {locale === "en" ? (
            <p className="mt-1 text-sm text-muted">{t.home.mottoKoLine}</p>
          ) : (
            <p className="mt-1 text-sm text-muted">{t.home.motto}</p>
          )}

          <dl className="mt-6 space-y-2 text-base text-foreground sm:text-lg">
            <div>
              <dt className="sr-only">Worship</dt>
              <dd className="font-semibold">{t.home.worshipTime}</dd>
            </div>
            <div>
              <dt className="sr-only">Address</dt>
              <dd>{t.home.address}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/worship"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              {t.home.ctaWorship}
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent-soft"
            >
              {t.home.ctaVisit}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className="max-w-2xl text-base leading-relaxed text-muted">{t.home.intro}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link href="/sermons" className="font-medium text-accent hover:underline">
            {t.home.sermonsLink}
          </Link>
          <a
            href={CHURCH.youtubeUrl}
            className="font-medium text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.home.youtubeLink}
          </a>
        </div>
        <p className="mt-8 text-xs font-medium text-accent">{t.home.verifyNote}</p>
      </section>
    </div>
  );
}
