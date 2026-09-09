import type { Metadata } from "next";
import { CHURCH, WORSHIP_ROWS } from "@/lib/church";
import { BULLETIN } from "@/lib/bulletin";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { ScheduleTable } from "@/components/ScheduleTable";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.worship.metaTitle ?? t.worship.title,
    description: t.worship.metaDescription,
  };
}

function formatBulletinDate(iso: string, locale: "en" | "ko") {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    locale === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric", weekday: "short" },
  );
}

export default async function WorshipPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const labels = t.worship.rows;

  return (
    <PageShell>
      <PageHeader title={t.worship.title} intro={t.worship.intro} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.thisWeekHeading}
        </h2>
        <p className="mt-2 text-foreground">
          {formatBulletinDate(BULLETIN.date, locale)} · {t.home.worshipTime}
        </p>
        <p className="font-display mt-4 text-lg text-foreground">
          {BULLETIN.sermonSeries} 「{BULLETIN.sermonTitle}」
        </p>
        <p className="mt-1 text-muted">
          {BULLETIN.scripture} · {BULLETIN.preacher}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.orderHeading}
        </h2>
        <ol className="mt-4 max-w-xl divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface text-base">
          {BULLETIN.order.map((item) => (
            <li
              key={item.key}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-medium text-foreground">
                {locale === "ko" ? item.nameKo : item.nameEn}
                {item.stand ? " *" : ""}
              </span>
              <span className="text-muted sm:text-right">
                {locale === "ko" ? item.detailKo : item.detailEn}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm text-muted">{t.worship.standNote}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.gatheringsHeading}
        </h2>
        <div className="mt-4">
          <ScheduleTable
            columns={[
              { key: "meeting", label: t.worship.colMeeting },
              { key: "time", label: t.worship.colTime },
              { key: "place", label: t.worship.colPlace },
            ]}
            tbdLabel={t.common.tbd}
            rows={WORSHIP_ROWS.map((row) => ({
              key: row.key,
              meeting: labels[row.key as keyof typeof labels],
              time: locale === "ko" ? row.timeKo : row.timeEn,
              place: locale === "ko" ? row.placeKo : row.placeEn,
              tbd: row.tbd,
            }))}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.serversHeading}
        </h2>
        <div className="mt-4">
          <ScheduleTable
            columns={[
              { key: "date", label: t.worship.colDate },
              { key: "prayer", label: t.worship.colPrayer },
              { key: "reading", label: t.worship.colReading },
            ]}
            tbdLabel={t.common.tbd}
            rows={BULLETIN.servers.map((row) => ({
              key: row.date,
              date: formatBulletinDate(row.date, locale),
              prayer: locale === "ko" ? row.prayerKo : row.prayerEn,
              reading: row.reading,
            }))}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.newsHeading}
        </h2>
        <ol className="mt-4 max-w-[65ch] list-decimal space-y-2 pl-5 text-muted">
          {BULLETIN.news.map((item) => (
            <li key={item.ko}>{locale === "ko" ? item.ko : item.en}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {t.worship.prayerHeading}
        </h2>
        <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 text-muted">
          {BULLETIN.prayers.map((item) => (
            <li key={item.ko}>{locale === "ko" ? item.ko : item.en}</li>
          ))}
        </ul>
      </section>

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
            <ButtonLink
              href={CHURCH.youtubeUrl}
              external
              newTabHint={t.common.newTab}
            >
              {t.worship.youtubeCta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
