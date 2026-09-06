import type { Metadata } from "next";
import { CHURCH, PHOTOS, WORSHIP_ROWS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { ScheduleTable } from "@/components/ScheduleTable";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.worship.title };
}

export default async function WorshipPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const labels = t.worship.rows;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <PageHeader title={t.worship.title} intro={t.worship.intro} />
      <ChurchPhoto
        src={PHOTOS.worship}
        alt={t.worship.photoAlt}
        width={1080}
        height={720}
        className="mt-8"
      />

      <div className="mt-10">
        <ScheduleTable
          columns={[
            { key: "meeting", label: t.worship.colMeeting },
            { key: "time", label: t.worship.colTime },
            { key: "place", label: t.worship.colPlace },
          ]}
          rows={WORSHIP_ROWS.map((row) => ({
            key: row.key,
            meeting: labels[row.key as keyof typeof labels],
            time: locale === "ko" ? row.timeKo : row.timeEn,
            place: locale === "ko" ? row.placeKo : row.placeEn,
          }))}
        />
      </div>

      <section className="mt-12 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t.worship.addressHeading}
          </h2>
          <p className="mt-2 text-muted">{CHURCH.address}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t.worship.onlineHeading}
          </h2>
          <p className="mt-2 max-w-[65ch] text-muted">{t.worship.onlineBody}</p>
          <div className="mt-4">
            <ButtonLink href={CHURCH.youtubeUrl} external>
              {t.worship.youtubeCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
