import type { Metadata } from "next";
import { GENERATIONS_ROWS, PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { ScheduleTable } from "@/components/ScheduleTable";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.generations.title };
}

export default async function GenerationsPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const labels = t.generations.rows;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <PageHeader title={t.generations.title} intro={t.generations.intro} />

      <div className="mt-10">
        <ScheduleTable
          columns={[
            { key: "dept", label: t.generations.colDept },
            { key: "age", label: t.generations.colAge },
            { key: "time", label: t.generations.colTime },
            { key: "place", label: t.generations.colPlace },
          ]}
          rows={GENERATIONS_ROWS.map((row) => ({
            key: row.key,
            dept: labels[row.key as keyof typeof labels],
            age: locale === "ko" ? row.ageKo : row.ageEn,
            time: locale === "ko" ? row.timeKo : row.timeEn,
            place: locale === "ko" ? row.placeKo : row.placeEn,
          }))}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <ChurchPhoto
          src={PHOTOS.children}
          alt={t.generations.childrenAlt}
          width={800}
          height={450}
        />
        <ChurchPhoto
          src={PHOTOS.youth}
          alt={t.generations.youthAlt}
          width={960}
          height={721}
        />
      </div>
    </div>
  );
}
