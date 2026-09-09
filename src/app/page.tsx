import type { Metadata } from "next";
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
      <section className="border-b border-border bg-accent-soft/50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {locale === "ko" ? t.home.nameKo : t.home.nameEn}
          </h1>
          <p className="mt-1 text-base text-muted">
            {locale === "ko" ? t.home.nameEn : t.home.nameKo}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {CHURCH.mottoTbd ? <TbdChip label={t.common.tbd} /> : null}
            <p className="font-display text-lg text-foreground sm:text-xl">
              {locale === "ko" ? t.home.mottoKoLine : t.home.motto}
            </p>
          </div>

          <p className="mt-6 text-lg font-semibold text-foreground">
            {t.home.worshipTime}
          </p>
          <p className="mt-1 text-base text-foreground">{t.home.address}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/worship">{t.home.ctaWorship}</ButtonLink>
            <ButtonLink href="/visit" variant="secondary">
              {t.home.ctaVisit}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="max-w-[65ch] space-y-4 text-base leading-relaxed text-muted">
          <p>{t.home.intro}</p>
          <p>{t.home.intro2}</p>
          <p>{t.home.intro3}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/sermons" variant="secondary">
            {t.home.sermonsLink}
          </ButtonLink>
          <ButtonLink
            href={CHURCH.youtubeUrl}
            variant="secondary"
            external
            newTabHint={t.common.newTab}
          >
            {t.home.youtubeLink}
          </ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            {t.home.aboutLink}
          </ButtonLink>
          <ButtonLink href="/korean-school" variant="secondary">
            {t.home.koreanSchoolLink}
          </ButtonLink>
        </div>
        <ChurchPhoto
          src={PHOTOS.worship}
          alt={t.home.photoAlt}
          width={1080}
          height={720}
          className="mt-8 max-w-md"
          sizes="(max-width: 448px) 100vw, 448px"
        />
      </section>
    </div>
  );
}
