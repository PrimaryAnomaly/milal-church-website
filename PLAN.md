# PLAN.md — Boston Milal Korean Church Website (v1.3)

**Status:** ready for build against SPEC v1.5 (updated 2026-09-09)
**Artifact chain:** [INTENT.md](./INTENT.md) → [SPEC.md](./SPEC.md) → **PLAN.md** (this file) → build with proof  
**Design:** [SPEC.md](./SPEC.md) §7 (DESIGN.md is stub only)  
**Repo:** https://github.com/PrimaryAnomaly/milal-church-website (`main`)  
**Stack (scaffolded):** Next.js 16 App Router, TypeScript, Tailwind 4, Vercel, file-backed posts, Blob upload, cookie admin

Implement only what this PLAN scopes. Do not invent IA, CMS, or visuals outside SPEC.

---

## 0. Locked decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Canonical 설교 path | **`/sermons`** | SPEC prefers domain language; scaffold `/posts` becomes redirect |
| Detail path | **`/sermons/[slug]`** | Move from `/posts/[slug]`; permanent redirects preserve old links |
| `/posts` disposition | **Redirect** `/posts` → `/sermons`, `/posts/[slug]` → `/sermons/[slug]` | One canonical IA; no dual indexes |
| Post field naming in code | **camelCase** (`body`, `imageUrls`, `publishedAt`, `createdAt`, `updatedAt`) | Match existing TS scaffold; SPEC snake_case is the conceptual model |
| `publishedAt` on unpublish | **Keep** last `publishedAt` when unpublishing | First publish sets ISO timestamp; republish does not reset |
| `imageUrls` v1 | Array; admin UI may edit **first URL** via existing cover field mapped to `imageUrls[0]` | SPEC allows `coverImageUrl` → first entry |
| `body` vs `content` | Rename store field to **`body`**; migrate any `content` on read | SPEC POST-02 |
| `excerpt` | Keep optional for list cards; not required by SPEC | Low cost; derive from body slice if empty on public list |
| Create path | Keep create form on **`/admin`** (no separate `/admin/new`) | Scaffold already; satisfies ADMIN-01 |
| **Locale / i18n strategy** | **Same URL paths** + **locale cookie** + **lightweight dictionaries** | No `next-intl` or `/en` `/ko` prefixes. The cookie is the persisted source of truth, the Header toggle updates it, and `html[lang]` follows the active locale. |
| Default locale | **English** | SPEC I18N-02 |
| Browser detection | Korean preferred in `Accept-Language` / `navigator.languages` -> KO; else EN | Only when no stored preference (I18N-03) |
| Toggle | Header **EN <-> KO** (English-first affordance OK) | NAV-03 + I18N-04/05 |
| Public copy | **Full EN + KO** for all v1 public pages | I18N-01; replaces KO-primary / EN-essentials-only |
| Admin locale | **KO-primary OK** for thin `/admin` in v1 | SPEC open concern; not blocking AC-15 |

### Explicitly out of this PLAN (do not implement)

- Domain cutover (`bostonmilalchurch.org` → Vercel)
- Online giving / donate UI
- Photo albums / 밀알포토 / 자료실
- Cloud Agents automation
- Member portal, heavy CMS, Netflix sermon grid
- Separate English Ministry blog spectacle; disability-mission (bostonmilal.org) mix
- Inventing public email/phone (omit until church confirms)
- Path-prefixed `/en` `/ko` routes (deferred; same-path + cookie chosen above)

---
## 1. Scaffold snapshot (baseline)

| Area | Today | SPEC gap |
|------|-------|----------|
| Routes | `/`, `/about`, `/posts`, `/posts/[slug]`, `/admin/*` | Missing `/worship`, `/visit`, `/generations`, `/korean-school`, `/sermons` |
| Header | EN: Home / About / Posts; brand “Milal Church”; no locale toggle | Localized EN/KO nav + hamburger + **EN↔KO toggle**; brand per locale |
| Footer | EN copyright + fluff tagline | Name, address, YT, FB (bilingual labels); no invented email/phone |
| Tokens | `--background #faf8f5`, `--accent #7c2d12` | Ground `#FAF7F2`, accent `#B45309`, soft/border tokens |
| `layout` | `lang="en"`; EN metadata | `lang` follows active locale (`en`/`ko`); bilingual metadata |
| i18n | None | Lightweight dictionaries; cookie + browser detect; full public EN+KO |
| Home | EN placeholder hero; wrong CTAs | Above-fold contract HOME-01 in both locales |
| About | EN placeholder + fake address/email | 표어, KAPC, pastor bio (EN+KO) |
| Posts | Generic list, no type, no YT | Sermon index + channel link |
| `Post` model | `excerpt`, `content`, `coverImageUrl`, no `type`/`publishedAt` | §5.2 fields |
| Auth/admin | Login, list, create, edit, publish checkbox, delete, logout, Blob | Mostly OK; gap-fix type + body + publishedAt + KO labels |
| Public unpublished | Detail `notFound` if unpublished; list filters | Keep / harden after model change |

---

## 2. REQ coverage map

Every REQ-MILAL-* and AC-* from SPEC is either **covered** by a batch below or **deferred** with reason.

| ID | Batch | Notes |
|----|-------|-------|
| NAV-01 | B1, Bi18n | Localized EN/KO labels + mobile hamburger |
| NAV-02 | B1 | Admin not a primary nav item; discreet chrome control to `/admin` after locale toggle |
| NAV-03 | Bi18n | Header EN↔KO toggle affordance |
| NAV-04 | B1, B5 | Full nav at `lg`; internally scrolling mobile menu; controls reachable at 200% zoom |
| I18N-01..08 | **Bi18n** (+ B3/B5 copy) | Detection, default EN, toggle, persistence, same paths, natural full public bilingual copy |
| HOME-* | B3 | Rewrite `src/app/page.tsx` (both locales) |
| WORSHIP-* | B2–B3 | New `src/app/worship/page.tsx` |
| VISIT-* | B2–B3 | New `src/app/visit/page.tsx` |
| ABOUT-* | B3 | Rewrite `src/app/about/page.tsx` |
| GEN-* | B2–B3 | New `src/app/generations/page.tsx` |
| SERMON-* | B2, B4–B5 | `/sermons` + redirects; model + YT |
| KS-* | B2–B3 | New `src/app/korean-school/page.tsx` |
| FOOTER-* | B1, Bi18n | Rewrite `Footer.tsx` (localized) |
| PUB-01 | B1–B2 | All public pages in localized nav |
| PUB-02 | B5, Bi18n | Localized 404 (SHOULD) |
| PUB-03 | B4–B5 | Unpublished hidden |
| PUB-04 | B1, B3, B5 | Equivalent responsive facts and labeled phone schedule records; no horizontal panning |
| AUTH-01..05 | B4 | Mostly done; verify + KO login copy |
| POST-01..03 | B4 | Extend model + public filters |
| STORE-01..02 | B4 | Keep abstraction; Blob already graceful |
| ADMIN-01..02 | B4 | Gap-fix form fields; keep delete |
| NFR-01..07 | B1, B3, B5 | Tokens, type scale, responsive reflow, 200% text zoom, build, env |
| Visual §7 | B1, B3, B5 | Tokens, restrained hierarchy, page-specific compositions, stable media frames |
| AC-01..15 | Proof per batch + final checklist (AC-15 = i18n) |

**Deferred (not build):** domain cutover, email/phone confirmation (copy omits), ADMIN_SECRET ownership process, Cloud Agents.

### 2b. Acceptance criteria → batch

| AC | Batch | Notes |
|----|-------|-------|
| AC-01 | B3, B5 | Home hierarchy and all required facts/CTAs above fold at ~390×844 |
| AC-02 | B1-B2, Bi18n, B5 | Localized nav + toggle; `lg` full nav; overflow/large-text proof |
| AC-03 | B3, B5 | Visitor-first Worship; desktop table + labeled phone records |
| AC-04 | B3, B5 | Visit at-a-glance arrival facts + adjacent map action |
| AC-05 | B3, B5 | About motto/identity anchor + coherent pastor section |
| AC-06 | B3, B5 | Generations one page; desktop table + labeled phone records |
| AC-07 | B4-B5 | Explicit YT action + published summaries + stable image frames |
| AC-08 | B3, B5 | Korean School compact facts + goals/photo composition |
| AC-09 | B1 | Footer |
| AC-10 | B4 | Admin publish flow |
| AC-11 | B4-B5 | Unpublished hidden |
| AC-12 | Every batch | `npm run build` / Vercel |
| AC-13 | B1+B5 | Visual tokens |
| AC-14 | B1-B2 | No purged IA in nav |
| AC-15 | Bi18n, B3, B5 | Full natural EN+KO public copy; default EN; browser detect; persisted toggle |

---

## 3. Target file map

### Create

| File | Purpose |
|------|---------|
| `src/app/worship/page.tsx` | 예배·모임 schedule table |
| `src/app/visit/page.tsx` | 새가족 expect/parking/kids/contact |
| `src/app/generations/page.tsx` | 다음세대 one table |
| `src/app/korean-school/page.tsx` | Goals + Sunday time + contact |
| `src/app/sermons/page.tsx` | YT link + published 설교요약 (+ news secondary) |
| `src/app/sermons/[slug]/page.tsx` | Post detail (moved from posts) |
| `src/app/not-found.tsx` | Localized EN/KO 404 + home link |
| `src/components/LocaleToggle.tsx` | Client EN↔KO control; writes locale cookie |
| `src/components/ScheduleTable.tsx` (or equivalent) | Shared desktop table + labeled stacked phone records |
| `src/lib/church.ts` (optional) | Shared constants: address, 표어, YT, FB, schedule seed rows |
| `src/i18n/messages/en.json` + `ko.json` (or `src/lib/dictionaries/*`) | Public UI strings for all v1 pages |
| `src/i18n/config.ts` (or equivalent) | Locales en|ko, default en, cookie name |
| `src/middleware.ts` (lightweight) | Read locale cookie; optional Accept-Language on first visit; no path rewrite to /en or /ko |

### Rewrite / extend

| File | Change |
|------|--------|
| `src/app/globals.css` | Lock palette tokens §7 |
| `src/app/layout.tsx` | `lang` from active locale; metadata; tokens usage |
| `src/components/Header.tsx` | Localized nav + brand + hamburger + **LocaleToggle** |
| `src/components/MobileNav.tsx` | Internally scrolling below-`lg` menu resilient to short viewports and 200% text zoom |
| `src/components/Footer.tsx` | Contact facts + socials (localized labels) |
| `src/components/ChurchPhoto.tsx` | Stable aspect-ratio figure treatment for real church/post imagery |
| `src/app/page.tsx` | Home contract |
| `src/app/about/page.tsx` | About + pastor |
| `src/lib/posts.ts` | type, body, imageUrls, publishedAt; migrate JSON |
| `src/components/PostForm.tsx` | type select, body, published, imageUrls[0] |
| `src/app/admin/page.tsx` | Show type + published; KO labels OK |
| `src/app/admin/edit/[id]/page.tsx` | Wire new fields |
| `src/app/api/posts/route.ts` + `[id]/route.ts` | Accept new fields |
| `next.config.ts` | Permanent redirects `/posts` → `/sermons` |
| `data/posts.json` | Empty `[]` remains valid; document new shape |
| `README.md` | Routes list after build (optional small update in final batch) |

### Leave mostly as-is

| File | Notes |
|------|-------|
| `src/lib/auth.ts` | Meets AUTH-*; optional: validate session age from payload timestamp |
| `src/lib/blob.ts` + `api/upload` | STORE-02 already |
| `api/auth/login|logout` | OK |
| Delete buttons | ADMIN-02 MAY keep |

**Redirects for old posts routes** (prefer `next.config.ts` permanent):

- `/posts` → `/sermons`
- `/posts/:slug` → `/sermons/:slug`

---

## 4. Batches (order of work)

### Batch 1 — Visual tokens + shell chrome

**Goal:** Site shell matches SPEC section 7 and NAV/FOOTER structure without full bilingual dictionaries yet (Bi18n follows or may combine).

**Files:** `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, optional `MobileNav.tsx`

**Work:**

1. Set CSS variables: ground `#FAF7F2`, text `#1C1917`, muted `#57534E`, accent `#B45309`, accent-soft `#FEF3E2`, border `#E7E5E4`.
2. Metadata title default includes both names: Boston Milal Korean Church / 보스톤밀알한인장로교회; `html lang` wired for active locale (default `en` until Bi18n lands).
3. Header brand + nav paths: `/worship`, `/visit`, `/about`, `/generations`, `/sermons`, `/korean-school` (labels may be temporary EN until Bi18n dictionary wires KO).
4. Keep the full horizontal nav hidden until `lg`. Below `lg`, use a labeled mobile nav toggle with visible hover, pressed, focus, and expanded states. Constrain the open menu to the remaining viewport and scroll it internally so all primary links, the locale toggle, and the discreet bottom 관리자/Admin control remain reachable on short phones and at 200% text zoom.
5. Footer: church name, address `15 Alpha Road, Chelmsford, MA 01824`, YouTube `@milalkoreanchurch1435`, Facebook `milalchurch`; **omit** email/phone.
6. Prefer Batch 2 pages in same PR if nav would 404; else stub minimal pages.
7. Leave a clear hook for LocaleToggle (Bi18n) — do not ship KO-primary-only chrome as final.

**Risks:** Mobile nav a11y; accent contrast on ground.

**Proof:**

- [ ] `npm run build`
- [ ] Phone viewport (~390x844): nav labels visible; 관리자 is a quiet control at the bottom of the menu, not in the primary list
- [ ] At widths below `lg`, full nav does not crowd or wrap; open menu scrolls internally and every control remains reachable at 200% text zoom
- [ ] Accent wheat-amber (not navy / not `#7c2d12`)
- [ ] Footer shows address + YT + FB only

**AC touched:** AC-02 (partial until Bi18n), AC-09, AC-13 (partial)

---

### Batch Bi18n — Locale detection, toggle, dictionaries

**Goal:** Implement SPEC section 4.4 REQ-MILAL-I18N-* and NAV-03. Full public EN+KO; default EN; browser-aware first visit; persisted Header toggle. **Same URL paths** (no `/en` `/ko`).

**Why same-path + cookie (not `[locale]` segment):**

1. Persistence already requires a cookie — reuse it as the locale source of truth after first choice.
2. Avoids rewriting every route under `app/[locale]/...` and dual canonical URLs for a small church site.
3. Header toggle flips locale without forcing a navigation to a prefixed path.
4. Lightweight dictionaries match the locked stack and avoid adding a locale framework for the same-path strategy.

**Files:** `src/i18n/*` or `src/lib/dictionaries/*`, `LocaleToggle.tsx`, `Header.tsx`, `middleware.ts` (light), `layout.tsx`, message JSON for EN+KO covering chrome + all public page strings.

**Work:**

1. Define locales `en` | `ko`; **default `en`**.
2. Cookie name `milal_locale` (client-settable or via tiny route handler); cookie is the persisted source of truth.
3. Middleware / first-load: if no cookie, parse `Accept-Language` (and/or client `navigator.languages`); if Korean preferred → `ko`, else `en`; set cookie.
4. Header: **EN | KO** (English-first affordance OK, e.g. EN | 한국어); writing preference overrides browser detection thereafter.
5. Wire all public chrome + Batch 3 page copy through dictionaries (nav, footer, home, worship, visit, about, generations, sermons chrome, korean-school, 404).
6. Set `html[lang]` to active locale; metadata titles/descriptions per locale where practical.
7. Admin MAY stay KO-primary for v1 (document in README); do not block AC-15 on admin translation.
8. Sermon **post body content** remains author-entered (often KO); UI chrome around posts is bilingual.
9. Edit English and Korean as independently natural parish copy: remove SEO-shaped repetition, literal calques, provisional/meta language, and the awkward “Kids learn Korean…” phrasing without adding unconfirmed claims.

**Risks:** Flash of wrong locale on first paint (mitigate with middleware cookie + matching `lang`); missing dictionary keys (fallback to EN string); over-building `[locale]` routes against this decision.

**Proof:**

- [ ] production build succeeds
- [ ] No locale cookie + browser prefers Korean → KO UI; else EN
- [ ] Toggle flips locale; reload keeps choice via `milal_locale` cookie
- [ ] Same URL paths for both locales (no path prefix required)
- [ ] Spot-check: home + footer + nav strings in both languages
- [ ] Spot-check AC-01..08 chrome/copy in both languages; dictionary keys match exactly and neither language reads as a literal fallback

**AC touched:** AC-02, AC-15 (and enables bilingual AC-01/03-09 copy)

**Order:** Prefer after Batch 1 shell, before or interleaved with Batch 3 copy. Do not author page copy twice in hardcoded JSX; author through dictionaries once Bi18n exists. Batches 1+Bi18n may combine in one PR if small.

### Batch 2 — Routes + redirects

**Goal:** Align IA to SPEC; canonical `/sermons`.

**Files:** new page shells; `next.config.ts` redirects; move detail route.

**Work:**
1. Add pages: `/worship`, `/visit`, `/generations`, `/korean-school`, `/sermons` (thin shells OK if Batch 3 follows immediately).
2. Implement `/sermons/[slug]` from posts detail; back-link to `/sermons`.
3. Permanent redirects `/posts` -> `/sermons`, `/posts/:slug` -> `/sermons/:slug`.
4. Remove or gut old posts implementations to avoid dual maintenance.
5. Update admin View links to `/sermons/[slug]`.

**Risks:** Leftover internal `/posts` links — grep and fix.

**Proof:**
- [ ] `npm run build`
- [ ] `/posts` redirects to `/sermons`; slug redirects work
- [ ] Nav hits each new path (200)

**AC touched:** AC-02, AC-14 (nav only)

---

### Batch 3 — Page content contracts

**Goal:** Public copy matches SPEC section 4.2 **in both EN and KO** (via Bi18n dictionaries). Mark unverified facts clearly.

**Shared constants (recommended `src/lib/church.ts`):** names KO/EN, address, 표어 2026, affiliation, pastor bullets, YouTube/FB URLs, worship/generations/korean-school seed data.

**Per page:**

| Route | MUST deliver |
|-------|----------------|
| `/` | Above fold at ~390×844 in this order: church identity, restrained motto treatment, compact Sunday 10:00/address fact group, CTAs to `/worship` + `/visit`. Below: 1-2 sentence intro, quieter text-link destinations, then a modest sanctuary photo integrated into the rhythm. Full strings in active locale; no competing secondary pill cluster, autoplay, donate sticky, or stock photos. |
| `/worship` | Lead with permanent visitor facts: Sunday time, address, recurring schedule. Shared responsive schedule renders meeting/time/place as a table on larger screens and labeled stacked records on phones without horizontal panning. Weekly “This Sunday” bulletin treatment and member-serving order/prayer/news follow. Include online-worship YouTube action; no channel dump. |
| `/visit` | Lead with At a glance / 한눈에 보기: Sunday time, address with adjacent map action, parking, entrance, and kids. Follow with concise visit guidance, then actions to Worship and Generations. Use TBD on unconfirmed parking/entrance/kids facts; omit unconfirmed contact details. |
| `/about` | Make the motto and church identity the anchor; compose the real pastor portrait and short verified/TBD biography as one balanced section; KAPC line; no `/pastor` or long CV. |
| `/generations` | One age-band schedule with each ministry/audience/time/place grouped; desktop table + labeled stacked phone records; cohesive real-photo close after facts; explicit TBD values. |
| `/korean-school` | Promote Sunday class time/place into a compact facts group before condensed goals; one real photo may carry emphasis after facts; address/confirmed contact only; no roster/albums. |

**Copy hygiene:** Use the `TbdChip` for displayed unverified facts; never expose “교회 확인 필요” prose or conceal uncertainty with layout. Church confirmation replaces provisional wording and removes the chip. Do not invent phone/email. English and Korean must each sound like natural parish communication, not literal translations or keyword copy.

**Risks:** Stale Imweb facts — visible `TbdChip` markers until church signs off (cutover out of PLAN).

**Proof:**
- [ ] `npm run build`
- [ ] Phone home without scrolling: name, 표어, Sunday 10:00, address, both CTAs (AC-01)
- [ ] Home secondary destinations are quiet text links; photo starts only after the required first-viewport facts/actions
- [ ] Worship permanent facts precede weekly/member detail; Worship and Generations show labeled phone records with no horizontal panning and larger-screen tables
- [ ] Visit at-a-glance group includes time, address + adjacent map action, parking, entrance, and kids; ending routes to Worship/Generations
- [ ] About, Generations, and Korean School match their page-specific compositions without changing facts or IA
- [ ] Spot-check AC-03..08 in both locales, including 200% text resizing
- [ ] No bostonmilal.org links

**AC touched:** AC-01, AC-03, AC-04, AC-05, AC-06, AC-08

---

### Batch 4 — Posts model + admin gap-fix

**Goal:** SPEC section 5.2-5.4; sermon list data shape.

**Model (`src/lib/posts.ts`):**

```ts
export type PostType = "sermon_summary" | "news";
export type Post = {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  imageUrls: string[];
  published: boolean;
  publishedAt?: string; // set on first transition to published
  createdAt: string;
  updatedAt: string;
};
```

**Migration on read:** legacy `content` -> `body`; `coverImageUrl` -> `imageUrls = [url]`; default `type: "sermon_summary"`; if published and missing publishedAt then publishedAt = createdAt.

**API + PostForm:** type select; title; body; published checkbox; slug optional auto; image paste/Blob -> imageUrls[0]; admin list shows type + published; view -> `/sermons/[slug]`.

**Public helpers:** listPosts({ publishedOnly, type }); sermon index filters sermon_summary + published; news secondary/labeled (SHOULD).

**Auth gap-fix (light):** confirm APIs still auth-gated; optional 7-day session age check; KO-friendly login copy.

**Risks:** Vercel file-backed posts.json may be ephemeral on serverless — known scaffold limit; keep abstraction (STORE-01); do not block v1 on Postgres (document in README).

**Proof:**
- [ ] `npm run build`
- [ ] Login -> create sermon_summary + image URL -> publish -> visible on `/sermons` -> unpublish -> gone from public + detail 404
- [ ] Published news labeled/secondary only
- [ ] Upload without Blob token fails gracefully; paste URL works
- [ ] Logout clears session

**AC touched:** AC-07 (data), AC-10, AC-11

---

### Batch 5 — Sermons UI polish + 404 + acceptance pass

**Goal:** Close SERMON page UX, NFR, final AC.

**Work:**
1. `/sermons`: explicit `ButtonLink` to the YouTube channel (retained even with a single embed); list sermon summaries newest first; optional secondary news block; no Netflix grid.
2. Index/detail: render author-provided `imageUrls` inside consistent reserved aspect-ratio frames so loading or missing media does not shift title/date/excerpt/body; keep media subordinate to text. Detail includes a back link to sermons.
3. `not-found.tsx`: localized message + home link (EN+KO dictionary).
4. Typography: body ~16-18px; large headings; hairlines and occasional accent-soft fields rather than repetitive cards.
5. Perform one bounded EN/KO copy sweep: remove SEO repetition, awkward/literal translation, generic marketing language, fake hello@milal.church, and placeholder address while preserving church truth.
6. Update README routes to match IA; note bilingual public UI + locale cookie behavior.

**Proof:**
- [ ] `npm run build` (AC-12 local proxy for Vercel)
- [ ] Full AC-01..15 checklist ticked or blocked only on church verification
- [ ] Phone (~390×844): AC-01 hierarchy above fold; internally scrolling nav; Worship/Generations stacked records; Visit at-a-glance; explicit sermons YT action + list
- [ ] Larger screen: full nav begins at `lg`; Worship/Generations use readable tables; page-specific compositions hold without over-wide text
- [ ] 200% text zoom: mobile menu controls and schedule facts remain reachable without two-dimensional scrolling
- [ ] Sermon cards/detail retain stable geometry while images load or are absent
- [ ] Focus visible on nav control; form labels present

**AC touched:** Final proof for AC-01..08 and AC-15; implementation closes AC-07, AC-12, AC-13, AC-14, PUB-02

---

## 5. Risks register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unverified schedule/pastor/motto year | Wrong public facts | Visible `TbdChip`; church confirmation replaces the value and removes the chip before cutover |
| Vercel file-backed posts.json not durable | Lost posts on cold instances | Document; Postgres later via abstraction; thin v1 OK per SPEC |
| `/posts` bookmarks | 404 if redirect missed | Permanent redirects in next.config.ts |
| Mobile nav unusable at short heights or text zoom | Visitors cannot reach locale/Admin controls | Full nav begins at `lg`; constrain menu to remaining viewport; internal vertical scroll; test at 200% |
| Accent contrast | a11y fail | Test B45309 on ground; white text on accent buttons |
| Scope creep (albums, giving, EM blog, path-prefix i18n) | Delay | Out-of-plan list; refuse in PR review |
| Missing KO/EN string parity | Broken AC-15 | Dictionary key checklist in Bi18n proof; EN fallback for missing keys |
| Bilingual copy reads translated or SEO-shaped | Low trust; weak parish voice | Bounded EN/KO copy pass against I18N-08; preserve facts and verify markers |
| Responsive schedule loses labels/semantics | Facts become hard to scan or inaccessible | Shared table/record component; equivalent field labels; phone and assistive-technology proof |
| Sermon images cause layout shift | Unstable list/detail reading | Reserved aspect-ratio media frames and stable fallbacks |
| Locale flash / wrong `lang` | Confusing first paint | Middleware sets cookie before HTML when possible |
| Mixing bostonmilal.org | Brand harm | Copy review; no links |

---

## 6. Proof standards (every batch)

1. `npm run build` must succeed before merge to main.
2. Phone viewport checklist (~390x844):
   - [ ] Home identity → motto → time/address → two CTAs above fold after B3; secondary links remain quiet
   - [ ] Localized mobile nav + locale toggle; menu scrolls internally; 관리자 is reachable quiet chrome, not a primary item
   - [ ] Worship and Generations use labeled stacked records without horizontal panning
   - [ ] Visit answers time/address/parking/entrance/kids at a glance and keeps map beside address
   - [ ] Footer address + socials
   - [ ] Sermons explicit YT action + list + stable media frames after B4-5
3. Larger-screen checklist: full nav begins at `lg`; schedule tables and each page-specific composition remain readable.
4. Repeat key public checks at 200% text zoom and in both EN and KO; verify AC-01..08 and AC-15 directly.
5. Cite REQ-MILAL-* / AC-* in PR description.
6. Desktop-only checks do not satisfy NFR-01.

---

## 7. Suggested PR sequence

1. docs: add PLAN.md (this file) + artifact chain links
2. feat: wheat-amber tokens + header/footer shell (Batch 1)
3. feat: i18n cookie locale + Header toggle + EN/KO dictionaries (Batch Bi18n)
4. feat: public routes + /sermons canonical redirects (Batch 2)
5. feat: page content contracts in both locales (Batch 3)
6. feat: post types publishedAt + admin form (Batch 4)
7. feat: sermons UI, localized 404, acceptance polish (Batch 5)

Batches 1+Bi18n and/or Bi18n+3 may combine if small; do not merge UI rewrite without build proof. Prefer dictionaries before hardcoding page copy.

---

## Document control

| Version | Date (America/New_York) | Notes |
|---------|-------------------------|--------|
| v1.0 | 2026-09-05 | Initial PLAN from SPEC v1.0; canonical /sermons; batches 1-5 |
| v1.1 | 2026-09-05 | Language policy: Batch Bi18n; same-path + locale cookie (not /en /ko); full public EN+KO; default EN; Header toggle; AC-15; remove KO-primary contradictions |
| v1.2 | 2026-09-06 | NAV-02: discreet 관리자 chrome control (not a primary nav item) |
| v1.3 | 2026-09-09 | Align with SPEC v1.5 UX refinement: visitor-first pages, responsive schedules, `lg`/overflow-safe nav, deliberate home hierarchy, page-specific compositions, explicit YouTube action, stable sermon media, natural bilingual copy, and expanded AC-01..08/15 proof. |
