import type { Metadata } from "next";
import { GENERATIONS_ROWS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { PlaceholderBanner, PlaceholderTag } from "@/components/PlaceholderBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.generations.title };
}

export default async function GenerationsPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const rows = t.generations.rows;
  const tag = t.common.placeholderTag;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.generations}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.generations.title}
      </h1>
      <p className="mt-3 text-muted">{t.generations.intro}</p>
      <PlaceholderBanner label={t.common.placeholderBanner} className="mt-4" />

      <div className="mt-8 overflow-x-auto rounded-xl border-2 border-dashed border-accent bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-accent-soft/50 text-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">{t.generations.colDept}</th>
              <th className="px-4 py-3 font-semibold">{t.generations.colAge}</th>
              <th className="px-4 py-3 font-semibold">{t.generations.colTime}</th>
              <th className="px-4 py-3 font-semibold">{t.generations.colPlace}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {GENERATIONS_ROWS.map((row) => (
              <tr key={row.key} className="bg-accent-soft/20">
                <td className="px-4 py-3 font-medium text-foreground">
                  <PlaceholderTag label={tag} />
                  {rows[row.key as keyof typeof rows]}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.ageKo : row.ageEn}
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
      <p className="mt-3 text-xs font-semibold text-accent">{t.generations.verify}</p>
    </div>
  );
}
