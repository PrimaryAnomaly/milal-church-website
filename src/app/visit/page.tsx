import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.visit.title };
}

export default async function VisitPage() {
  const t = await getDictionary();

  const blocks = [
    { title: t.visit.expectTitle, body: t.visit.expectBody, placeholder: false },
    { title: t.visit.parkingTitle, body: t.visit.parkingBody, placeholder: true },
    { title: t.visit.kidsTitle, body: t.visit.kidsBody, placeholder: false },
    { title: t.visit.contactTitle, body: t.visit.contactBody, placeholder: true },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {t.nav.visit}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
        {t.visit.title}
      </h1>
      <p className="mt-3 text-muted">{t.visit.intro}</p>

      <div className="mt-8 space-y-4">
        {blocks.map((block) => (
          <section
            key={block.title}
            className={
              block.placeholder
                ? "rounded-xl border-2 border-dashed border-accent bg-accent-soft/40 p-5"
                : "rounded-xl border border-border bg-white p-5"
            }
          >
            {block.placeholder ? (
              <PlaceholderBanner label={t.common.placeholderBanner} className="mb-3" />
            ) : null}
            <h2 className="text-lg font-semibold text-foreground">{block.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{block.body}</p>
            {block.title === t.visit.contactTitle ? (
              <p className="mt-3 text-sm font-semibold text-accent">{t.common.emailPhone}</p>
            ) : null}
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/worship" className="font-medium text-accent hover:underline">
          {t.visit.ctaWorship}
        </Link>
        <Link href="/generations" className="font-medium text-accent hover:underline">
          {t.visit.ctaGenerations}
        </Link>
      </div>
    </div>
  );
}
