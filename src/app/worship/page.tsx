import type { Metadata } from "next";
import { CHURCH, WORSHIP_ROWS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { PlaceholderBanner, PlaceholderTag } from "@/components/PlaceholderBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.worship.title };
}

export default async function WorshipPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const rows = t.worship.rows;
  const tag = t.common.placeholderTag;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.worship}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.worship.title}
      </h1>
      <p className="mt-3 text-muted">{t.worship.intro}</p>
      <PlaceholderBanner label={t.common.placeholderBanner} className="mt-4" />

      <div className="mt-8 overflow-x-auto rounded-xl border-2 border-dashed border-accent bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-accent-soft/50 text-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">{t.worship.colMeeting}</th>
              <th className="px-4 py-3 font-semibold">{t.worship.colTime}</th>
              <th className="px-4 py-3 font-semibold">{t.worship.colPlace}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {WORSHIP_ROWS.map((row) => (
              <tr key={row.key} className="bg-accent-soft/20">
                <td className="px-4 py-3 font-medium text-foreground">
                  <PlaceholderTag label={tag} />
                  {rows[row.key as keyof typeof rows]}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.timeKo : row.timeEn}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.placeKo : row.placeEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs font-semibold text-accent">{t.worship.verify}</p>

      <section className="mt-10 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t.worship.addressHeading}</h2>
          <p className="mt-1 text-muted">{CHURCH.address}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t.worship.onlineHeading}</h2>
          <p className="mt-1 text-muted">{t.worship.onlineBody}</p>
          <a
            href={CHURCH.youtubeUrl}
            className="mt-2 inline-block font-medium text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.worship.youtubeCta}
          </a>
        </div>
      </section>
    </div>
  );
}
