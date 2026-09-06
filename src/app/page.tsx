import { CHURCH, PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";

export const dynamic = "force-dynamic";

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

          <p className="font-display mt-6 text-lg text-foreground sm:text-xl">
            {locale === "ko" ? t.home.mottoKoLine : t.home.motto}
          </p>
          <p className="font-display mt-1 text-sm text-muted">
            {locale === "ko" ? t.home.motto : t.home.mottoKoLine}
          </p>

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
        <p className="max-w-[65ch] text-base leading-relaxed text-muted">
          {t.home.intro}
        </p>
        <ChurchPhoto
          src={PHOTOS.worship}
          alt={t.home.photoAlt}
          width={1080}
          height={720}
          className="mt-8 max-w-2xl"
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/sermons" variant="secondary">
            {t.home.sermonsLink}
          </ButtonLink>
          <ButtonLink href={CHURCH.youtubeUrl} variant="secondary" external>
            {t.home.youtubeLink}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
