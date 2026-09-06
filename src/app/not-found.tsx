import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const t = await getDictionary();
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">{t.notFound.title}</h1>
      <p className="mt-3 text-muted">{t.notFound.body}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#FAF7F2]"
      >
        {t.notFound.home}
      </Link>
    </div>
  );
}
