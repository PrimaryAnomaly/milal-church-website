"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { LocaleToggle } from "./LocaleToggle";
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
};

export function MobileNav({
  items,
  locale,
  openLabel,
  closeLabel,
  localeEn,
  localeKo,
  localeAria,
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
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base text-foreground hover:bg-accent-soft hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-4">
            <LocaleToggle
              locale={locale}
              labelEn={localeEn}
              labelKo={localeKo}
              ariaLabel={localeAria}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
