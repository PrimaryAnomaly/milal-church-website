"use client";

import { useEffect, useRef, useState } from "react";
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
  menuLabel: string;
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
  menuLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent active:bg-accent-soft"
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
          ref={panelRef}
          id="mobile-nav"
          className="absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-border bg-surface px-4 py-4 shadow-[0_12px_24px_-18px_rgba(28,25,23,0.35)]"
        >
          <nav className="flex flex-col" aria-label={menuLabel}>
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
              className="mt-3 flex min-h-11 items-center px-1 text-xs text-muted hover:text-foreground"
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
