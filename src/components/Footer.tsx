import { CHURCH } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function Footer() {
  const locale = await getLocale();
  const t = await getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{t.footer.name}</p>
          <p>
            <span className="sr-only">{t.footer.addressLabel}: </span>
            {CHURCH.address}
          </p>
          <p className="pt-3 text-xs">
            © {year} {t.footer.name}
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href={CHURCH.youtubeUrl}
            className="inline-flex min-h-11 items-center text-foreground underline-offset-4 hover:text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.youtube}
            <span className="sr-only"> ({t.common.newTab})</span>
          </a>
          <a
            href={CHURCH.facebookUrl}
            className="inline-flex min-h-11 items-center text-foreground underline-offset-4 hover:text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.facebook}
            <span className="sr-only"> ({t.common.newTab})</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
