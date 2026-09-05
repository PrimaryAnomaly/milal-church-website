import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { LocaleToggle } from "./LocaleToggle";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const locale = await getLocale();
  const t = await getDictionary(locale);

  const items = [
    { href: "/worship", label: t.nav.worship },
    { href: "/visit", label: t.nav.visit },
    { href: "/about", label: t.nav.about },
    { href: "/generations", label: t.nav.generations },
    { href: "/sermons", label: t.nav.sermons },
    { href: "/korean-school", label: t.nav.koreanSchool },
  ];

  return (
    <header className="relative z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="min-w-0 shrink text-base font-semibold tracking-tight text-accent sm:text-lg"
        >
          <span className="block truncate sm:hidden">{t.nav.brandShort}</span>
          <span className="hidden truncate sm:block">{t.nav.brand}</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-foreground md:flex">
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <LocaleToggle
            locale={locale}
            labelEn={t.nav.localeEn}
            labelKo={t.nav.localeKo}
            ariaLabel={t.nav.localeLabel}
          />
        </nav>

        <MobileNav
          items={items}
          locale={locale}
          openLabel={t.nav.openMenu}
          closeLabel={t.nav.closeMenu}
          localeEn={t.nav.localeEn}
          localeKo={t.nav.localeKo}
          localeAria={t.nav.localeLabel}
        />
      </div>
    </header>
  );
}
