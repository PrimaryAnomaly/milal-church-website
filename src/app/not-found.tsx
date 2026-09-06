import { getDictionary } from "@/i18n/get-dictionary";
import { ButtonLink } from "@/components/Button";

export default async function NotFound() {
  const t = await getDictionary();
  return (
    <div className="mx-auto max-w-lg px-4 py-24">
      <h1 className="text-2xl font-semibold text-foreground">
        {t.notFound.title}
      </h1>
      <p className="mt-3 text-muted">{t.notFound.body}</p>
      <div className="mt-8">
        <ButtonLink href="/">{t.notFound.home}</ButtonLink>
      </div>
    </div>
  );
}
