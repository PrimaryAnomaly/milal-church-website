import type { Metadata } from "next";
import { GENERATIONS_ROWS, PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { ChurchPhoto } from "@/components/ChurchPhoto";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { ScheduleTable } from "@/components/ScheduleTable";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.generations.metaTitle ?? t.generations.title,
    description: t.generations.metaDescription,
  };
}

export default async function GenerationsPage() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const labels = t.generations.rows;

  return (
    <PageShell>
      <PageHeader title={t.generations.title} intro={t.generations.intro} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">
          {t.generations.ministriesHeading}
        </h2>
        <div className="mt-4">
          <ScheduleTable
            columns={[
              { key: "dept", label: t.generations.colDept },
              { key: "age", label: t.generations.colAge },
              { key: "time", label: t.generations.colTime },
              { key: "place", label: t.generations.colPlace },
            ]}
            tbdLabel={t.common.tbd}
            rows={GENERATIONS_ROWS.map((row) => ({
              key: row.key,
              dept: labels[row.key as keyof typeof labels],
              age: locale === "ko" ? row.ageKo : row.ageEn,
              time: locale === "ko" ? row.timeKo : row.timeEn,
              place: locale === "ko" ? row.placeKo : row.placeEn,
              tbd: row.tbd,
            }))}
          />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">
          {t.generations.lifeTogetherHeading}
        </h2>
        <div className="mt-5 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          <ChurchPhoto
            src={PHOTOS.children}
            alt={t.generations.childrenAlt}
            width={800}
            height={450}
            cover
            sizes="(max-width: 640px) 100vw, 384px"
          />
          <ChurchPhoto
            src={PHOTOS.youth}
            alt={t.generations.youthAlt}
            width={960}
            height={721}
            cover
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </section>
    </PageShell>
  );
}
