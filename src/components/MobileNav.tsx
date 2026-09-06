"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { LocaleToggle } from "./LocaleToggle";
import { NavLink } from "./NavLink";
import type { Locale } from "@/i18n/config";

export type NavItem = { href: string; label: string };

type Props = {
  items: NavItem[];
  locale: Locale;
  openLabel: string;
  closeLabel: string;
  localeEn: string;
  localeKo: string;
  localeAria: string;
  adminLabel: string;
};

export function MobileNav({
  items,
  locale,
  openLabel,
  closeLabel,
  localeEn,
  localeKo,
  localeAria,
  adminLabel,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X size={20} weight="bold" aria-hidden />
        ) : (
          <List size={20} weight="bold" aria-hidden />
        )}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-40 border-b border-border bg-background px-4 py-4"
        >
          <nav className="flex flex-col">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-accent-soft hover:text-accent"
                activeClassName="bg-accent-soft font-semibold text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-4">
            <LocaleToggle
              locale={locale}
              labelEn={localeEn}
              labelKo={localeKo}
              ariaLabel={localeAria}
            />
            <Link
              href="/admin"
              className="mt-4 block px-1 py-2 text-xs text-muted/80"
              onClick={() => setOpen(false)}
            >
              {adminLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
