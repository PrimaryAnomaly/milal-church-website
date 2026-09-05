import type { Metadata } from "next";
import { GENERATIONS_ROWS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.generations.title };
}

export default async function GenerationsPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const rows = t.generations.rows;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.generations}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.generations.title}
      </h1>
      <p className="mt-3 text-muted">{t.generations.intro}</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-white">
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
              <tr key={row.key}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {rows[row.key as keyof typeof rows]}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.ageKo : row.ageEn}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.timeKo : row.timeEn}
                  {!row.verified ? (
                    <span className="ml-1 text-xs text-accent">*</span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted">
                  {locale === "ko" ? row.placeKo : row.placeEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-accent">* {t.generations.verify}</p>
    </div>
  );
}
