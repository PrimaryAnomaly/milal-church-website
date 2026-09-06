# AGENTS.md

Instructions for coding agents working in this repo.

This is the public website for **Boston Milal Korean Church** (보스톤밀알한인장로교회), a KAPC congregation at 15 Alpha Road, Chelmsford, MA. Distinct from bostonmilal.org (disability mission) — never mix brands or link there.

## Artifact chain (read before changing product)

| File | Role |
|------|------|
| [INTENT.md](./INTENT.md) | Why this exists |
| [SPEC.md](./SPEC.md) | Binding product source of truth (`REQ-MILAL-*`, page contracts, AC-01..15, palette locks) |
| [DESIGN.md](./DESIGN.md) | Binding visual + copy system (type, buttons, layout, voice) |
| [PLAN.md](./PLAN.md) | Locked engineering decisions and batch map |
| [AUDIT.md](./AUDIT.md) | SPEC+PLAN review (historical; i18n addendum supersedes KO-primary notes) |

Do not invent IA, CMS, or visual direction outside SPEC + DESIGN. Cite `REQ-MILAL-*` / `AC-*` when the change is product-facing.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Vercel. Optional `@vercel/blob` for uploads. No Sanity/WordPress/`next-intl` (lightweight dictionaries instead).

## Commands

```bash
npm install
cp .env.example .env.local   # then set ADMIN_SECRET
npm run dev                  # http://localhost:3000
npm run build                # required before merge to main
npm run lint
```

Env: `ADMIN_SECRET` (required for `/admin/login`). `BLOB_READ_WRITE_TOKEN` optional — when unset, uploads fail gracefully; paste image URLs instead. Never commit secrets.

## Locked decisions (do not reverse)

- **IA:** `/` `/worship` `/visit` `/about` `/generations` `/sermons` `/sermons/[slug]` `/korean-school`. Canonical sermons path is `/sermons`. Permanent redirects: `/posts` → `/sermons`, `/posts/:slug` → `/sermons/:slug` (`next.config.ts`).
- **i18n:** Same URL paths (no `/en` `/ko`, no `app/[locale]`). Locales `en` | `ko`. Default **English**. Cookie `milal_locale`. First visit without cookie: `Accept-Language` Korean preferred → `ko`, else `en`. Header EN ↔ KO toggle persists and overrides browser. `html[lang]` follows locale.
- **Public copy:** Full EN+KO for all public user-facing strings. Admin MAY stay KO-primary.
- **Visuals:** Follow [DESIGN.md](./DESIGN.md). Palette locked in SPEC §7 (ground `#FAF7F2`, accent `#B45309`). No navy, megachurch dark, Netflix sermon grids, donate banners, stock-photo theater, dashed draft chrome, or heavy animation.
- **Copy:** Parish bulletin voice, both EN and KO. No marketing conversion copy. No public meta about drafts, confirmation, or omitted contacts.
- **Admin:** Shared secret `ADMIN_SECRET`, httpOnly cookie `milal_admin_session` (HMAC, 7 days, Secure in production, SameSite=Lax). No multi-user RBAC.
- **Posts:** Types `sermon_summary` | `news`. Callers go through `src/lib/posts.ts` only (file-backed `data/posts.json`; Postgres swap later). Unpublished posts must not appear on public list/detail.
- **Contacts:** Do not invent public email or phone. Omit until church confirms.

## Out of scope (refuse)

Online giving, member portal, photo albums / 밀알포토 / 자료실, English Ministry blog spectacle, Netflix-style video grids, heavy CMS, path-prefixed locales, mixing bostonmilal.org content, domain cutover.

## Where things live

| Concern | Home |
|---------|------|
| Church facts, schedule seed rows | `src/lib/church.ts` |
| Public UI strings | `src/i18n/messages/en.json` + `ko.json` (keep keys in sync) |
| Locale cookie / Accept-Language | `src/i18n/config.ts`, `src/middleware.ts` |
| Read locale + dictionary | `src/i18n/get-dictionary.ts` (`getLocale`, `getDictionary`) |
| Palette / type / buttons | `src/app/globals.css`, `src/components/Button.tsx` |
| Posts CRUD | `src/lib/posts.ts` → `data/posts.json` |
| Auth | `src/lib/auth.ts` + `src/app/api/auth/*` |
| Blob upload | `src/lib/blob.ts` + `src/app/api/upload/route.ts` |
| Nav / toggle | `src/components/Header.tsx`, `MobileNav.tsx`, `LocaleToggle.tsx` |

Public pages are Server Components. They should `await getLocale()` + `getDictionary(locale)` and not hardcode user-facing copy. Post **body** is author-entered (often Korean); chrome around posts is bilingual.

Unverified church facts (motto year, pastor bio, schedule times) stay marked as placeholders / VERIFY-WITH-CHURCH. Do not silently treat them as confirmed.

## Posts model

```ts
type PostType = "sermon_summary" | "news";
// id, type, title, slug, body, excerpt?, imageUrls[], published,
// publishedAt? (set on first publish; keep on unpublish; do not reset on republish),
// createdAt, updatedAt
```

Public sermon index: `type === "sermon_summary" && published`. News is secondary and labeled. File store is **not durable** on Vercel serverless — do not “fix” that by writing around the abstraction.

## Conventions

- TypeScript strict; App Router; Tailwind tokens from CSS variables (`bg-background`, `text-accent`, `border-border`, `bg-accent-soft`).
- Mobile-first. Primary proof viewport is phone (~390×844). Home must keep name, 표어, Sunday 10:00, address, and CTAs to `/worship` + `/visit` above the fold (AC-01).
- Admin routes never in public nav.
- In-page actions use `Button` / `ButtonLink` (primary filled, secondary bordered). Footer socials may be text links.
- Prefer real church photos or solid treatments; no stock smiles.
- Unverified displayed facts get a `TbdChip` labeled TBD. Sunday 10:00 and the street address do not. Omit unknown email/phone; do not TBD an absence.
- Korean (`html[lang=ko]`): `word-break: keep-all`. Do not CSS-truncate Korean names mid-word.
- `npm run build` must succeed. Desktop-only checks do not satisfy NFR-01.

## Proof

Product-facing work should still satisfy the relevant SPEC acceptance criteria (AC-01..15). After UI changes: phone home above-fold, localized nav + locale toggle, no admin in nav, worship table readable, footer address + YouTube + Facebook only.
