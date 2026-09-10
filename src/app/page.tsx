import type { Metadata } from "next";
import Link from "next/link";
import { CHURCH, PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { TbdChip } from "@/components/TbdChip";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.home.metaTitle ?? t.home.title,
    description: t.home.metaDescription,
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  return (
    <div>
      <section className="border-b border-border bg-accent-soft/45">
        <div className="mx-auto max-w-5xl px-4 py-9 sm:py-12 lg:py-14">
          <div className="max-w-3xl">
            <h1 className="text-balance text-[2rem] font-semibold leading-tight text-foreground sm:text-[2.75rem]">
              {locale === "ko" ? t.home.nameKo : t.home.nameEn}
            </h1>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {locale === "ko" ? t.home.nameEn : t.home.nameKo}
            </p>

            <div className="mt-6 border-t border-accent/35 pt-4 sm:mt-7 sm:pt-5">
              <div className="flex flex-wrap items-start gap-2">
                {CHURCH.mottoTbd ? <TbdChip label={t.common.tbd} /> : null}
                <p className="max-w-[38ch] font-display text-lg leading-relaxed text-foreground sm:text-[1.375rem]">
                  {locale === "ko" ? t.home.mottoKoLine : t.home.motto}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-1 border-y border-border/90 py-4 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] sm:items-center sm:gap-6">
              <p className="text-lg font-semibold tabular-nums text-foreground">
                {t.home.worshipTime}
              </p>
              <p className="text-[0.9375rem] leading-snug text-foreground sm:text-base">
                {t.home.address}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/worship">{t.home.ctaWorship}</ButtonLink>
              <ButtonLink href="/visit" variant="secondary">
                {t.home.ctaVisit}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:items-start md:gap-12 md:py-16">
        <div>
          <div className="max-w-[65ch] space-y-4 text-base leading-relaxed text-muted">
            <p>{t.home.intro}</p>
            <p>{t.home.intro2}</p>
            <p>{t.home.intro3}</p>
          </div>
          <nav
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-[0.9375rem] font-medium"
            aria-label={t.nav.menu}
          >
            <Link
              className="inline-flex min-h-11 items-center text-foreground underline decoration-border hover:text-accent hover:decoration-accent"
              href="/sermons"
            >
              {t.home.sermonsLink}
            </Link>
            <a
              className="inline-flex min-h-11 items-center text-foreground underline decoration-border hover:text-accent hover:decoration-accent"
              href={CHURCH.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.home.youtubeLink}
              <span className="sr-only"> ({t.common.newTab})</span>
            </a>
            <Link
              className="inline-flex min-h-11 items-center text-foreground underline decoration-border hover:text-accent hover:decoration-accent"
              href="/about"
            >
              {t.home.aboutLink}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center text-foreground underline decoration-border hover:text-accent hover:decoration-accent"
              href="/korean-school"
            >
              {t.home.koreanSchoolLink}
            </Link>
          </nav>
        </div>
        <ChurchPhoto
          src={PHOTOS.worship}
          alt={t.home.photoAlt}
          width={1080}
          height={720}
          className="max-w-lg md:mt-1"
          sizes="(max-width: 767px) 100vw, 400px"
        />
      </section>
    </div>
  );
}
