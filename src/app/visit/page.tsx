import type { Metadata } from "next";
import { CHURCH, PHOTOS } from "@/lib/church";
import { getDictionary } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { TbdChip } from "@/components/TbdChip";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.visit.metaTitle ?? t.visit.title,
    description: t.visit.metaDescription,
  };
}

export default async function VisitPage() {
  const t = await getDictionary();

  return (
    <PageShell>
      <PageHeader title={t.visit.title} intro={t.visit.intro} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.visit.glanceHeading}
        </h2>
        <dl className="mt-4 max-w-3xl divide-y divide-border border-y border-border">
          <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-semibold text-foreground">
              {t.visit.timeLabel}
            </dt>
            <dd className="text-muted">{t.visit.expectBody}</dd>
          </div>
          <div className="grid gap-3 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-semibold text-foreground">
              {t.visit.addressLabel}
            </dt>
            <dd>
              <p className="text-muted">{CHURCH.address}</p>
              <ButtonLink
                href={CHURCH.mapsUrl}
                variant="secondary"
                external
                newTabHint={t.common.newTab}
                className="mt-3"
              >
                {t.visit.mapsLabel}
              </ButtonLink>
            </dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
              <TbdChip label={t.common.tbd} />
              {t.visit.parkingLabel}
            </dt>
            <dd className="text-muted">{t.visit.parkingBody}</dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
              <TbdChip label={t.common.tbd} />
              {t.visit.entranceLabel}
            </dt>
            <dd className="text-muted">{t.visit.entranceBody}</dd>
          </div>
          <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
              <TbdChip label={t.common.tbd} />
              {t.visit.kidsTitle}
            </dt>
            <dd className="text-muted">{t.visit.kidsBody}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-12 grid items-start gap-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t.visit.contactTitle}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">{t.visit.contactBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/worship">{t.visit.ctaWorship}</ButtonLink>
            <ButtonLink href="/generations" variant="secondary">
              {t.visit.ctaGenerations}
            </ButtonLink>
          </div>
        </div>
        <ChurchPhoto
          src={PHOTOS.children}
          alt={t.visit.kidsPhotoAlt}
          width={800}
          height={450}
          cover
          sizes="(max-width: 768px) 100vw, 384px"
        />
      </section>
    </PageShell>
  );
}
