"use client";

import { useState } from "react";
import Link from "next/link";
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-foreground"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-40 border-b border-border bg-background px-4 py-4 shadow-sm"
        >
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-base text-foreground hover:bg-accent-soft hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border pt-4">
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
