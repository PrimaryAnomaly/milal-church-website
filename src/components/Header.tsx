import Image from "next/image";
import Link from "next/link";
import { PHOTOS } from "@/lib/church";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { LocaleToggle } from "./LocaleToggle";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

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
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-4 py-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-[0.9375rem] font-semibold tracking-tight text-foreground sm:text-base"
        >
          <Image
            src={PHOTOS.logo}
            alt=""
            width={28}
            height={37}
            className="h-8 w-auto shrink-0"
            priority
          />
          <span className="block sm:hidden">{t.nav.brandShort}</span>
          <span className="hidden leading-snug sm:block">{t.nav.brand}</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-foreground md:flex">
          {items.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-accent"
              activeClassName="font-semibold text-accent"
            >
              {link.label}
            </NavLink>
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
