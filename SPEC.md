# SPEC.md — Boston Milal Korean Church Website (v1.5)

**Status:** accepted — UX refinement approved; engineering plans against this file (updated 2026-09-09)
**Artifact chain:** [INTENT.md](./INTENT.md) → **SPEC.md** (this file) → [PLAN.md](./PLAN.md) → build with proof  
**Audit:** [AUDIT.md](./AUDIT.md) (SPEC+PLAN review)

**Design:** Visual + copy system is **this file, §7**. [DESIGN.md](./DESIGN.md) is a stub redirect only.

Implement within this frame. Do not invent IA, CMS, or visual direction outside SPEC.

---

## 1. Meta

| Field | Value |
|-------|--------|
| Product | Public church website + thin volunteer admin for posts |
| Repo | https://github.com/PrimaryAnomaly/milal-church-website |
| Stack (scaffolded) | Next.js App Router, TypeScript, Tailwind, Vercel |
| Languages | **Both EN and KO** for all public user-facing copy. **Default: English.** Initial locale follows browser (`Accept-Language` / `navigator.languages`): KO if Korean preferred, else EN. Header EN↔KO toggle persists preference (cookie/localStorage) and overrides browser default after user chooses. |
| Predecessor | bostonmilalchurch.org (Imweb brochure — cluttered; purge, do not clone) |

### Church facts (lock for copy; verify flagged items with church)

| Fact | Value | Notes |
|------|--------|--------|
| Name (KO) | 보스톤밀알한인장로교회 | Also: 보스톤 밀알 한인 장로교회 |
| Name (EN) | Boston Milal Korean Church | Distinct from bostonmilal.org disability mission — **do not mix** |
| Address | 15 Alpha Road, Chelmsford, MA 01824 | Show on home hero + footer |
| Affiliation | KAPC · 뉴잉글랜드노회 | On 교회소개 |
| 2026 표어 | "선한 청지기 같이 서로 봉사하라" (벧전 4:10) | From old 교회소개 — **verify-with-church** if year rolls |
| Pastor (old site) | 권혁진 목사 | Short bio on 교회소개 — **verify-with-church** (current pastoral roster) |
| YouTube | [@milalkoreanchurch1435](https://www.youtube.com/@milalkoreanchurch1435) | Footer + 설교 |
| Facebook | [milalchurch](https://ko-kr.facebook.com/milalchurch/) | Footer |
| Public email | Unconfirmed | Old site Cloudflare-obfuscates. **Open concern** — do not invent |
| Phone | Unconfirmed for main church | Korean school page listed 601-818-2417 / 978-501-9117 — **verify-with-church**; omit from footer until confirmed |

---

## 2. Goals & non-goals

### Goals (success)

Derived from INTENT success criteria:

1. A first-time visitor on a phone finds **주일 예배 시간** and **주소** without hunting (above the fold on home).
2. Public IA matches the **purged** page set below — no empty ministry blogs or deep Imweb leftovers as primary nav.
3. A volunteer editor can **log in**, create/edit, and **publish** a 설교요약 (and occasional 소식) with optional image.
4. Site **builds and deploys** on Vercel.
5. UI looks **sincere**: warm minimal, wheat-amber accent, not megachurch / SaaS theater (see §7).

### Non-goals (out of scope for v1)

- Online giving, sticky donate banners, member portal
- Photo album archives, 밀알포토 galleries, 자료실
- Empty English Ministry blog / EM spectacle pages
- Netflix-style sermon browser / video grid UI
- Sanity, WordPress, or other heavy CMS
- PITR-level ops, multi-role RBAC, audit logs beyond cookie session
- Separate pastor page, mega-menu, carousels
- Mixing content with bostonmilal.org (disability mission)

---

## 3. Users & jobs

| Persona | Jobs to be done |
|---------|------------------|
| **Visitor** (first-time, often phone; EN or KO per browser/preference) | Know when Sunday worship is; get address / parking / kids info; decide whether to visit this Sunday; find YouTube if remote; switch language if needed |
| **Member** | Check schedule / 다음세대 times; read 설교요약 or 소식; share social links |
| **Volunteer editor** | Log in with shared secret; publish 설교요약 (+ optional image); post rare 소식; unpublish mistakes; log out — no CMS training required |

---

## 4. Functional requirements

Requirements are **MUST** unless marked SHOULD / MAY. IDs are stable for PLAN/tests.

### 4.1 Public routes & navigation

**REQ-MILAL-NAV-01** Top nav MUST use short localized labels (EN or KO per active locale; no mega-menu, no carousels). Hamburger on mobile. Label pairs (EN / KO): Worship / 예배·모임; Visit / 새가족; About / 교회소개; Generations / 다음세대; Sermons / 설교; Korean School / 한국학교.

| Nav label (EN / KO) | Suggested path | Scaffold today | Notes |
|---------------------|----------------|----------------|-------|
| (logo / home) | `/` | `/` | Church name as brand link (show KO+EN name per locale / brand rules) |
| Worship / 예배·모임 | `/worship` | *(missing)* | Was Imweb 예배안내 |
| Visit / 새가족 | `/visit` | *(missing)* | Was broken YouTube dump |
| About / 교회소개 | `/about` | `/about` | Pastor folded in |
| Generations / 다음세대 | `/generations` | *(missing)* | One page only |
| Sermons / 설교 | `/sermons` | `/posts` | Canonical `/sermons`; permanent redirects from `/posts` and `/posts/:slug` |
| Korean School / 한국학교 | `/korean-school` | *(missing)* | One page; no albums |

**REQ-MILAL-NAV-02** Admin MUST NOT appear as a **primary** nav item (not in the §4.1 label table; not accent/pill styled). Header MUST include a **discreet chrome control** to `/admin` (unauthenticated visitors land on `/admin/login`): extra-small muted type, after the locale toggle on desktop; same control at the **bottom** of the mobile menu after the locale toggle. `/admin/edit/[id]` MUST NOT have its own nav entry. Rationale: volunteer 관리자 cannot be asked to type a URL.

**REQ-MILAL-NAV-03** Language UX for chrome: Header MUST include an easy **EN ↔ KO** toggle (English-first affordance OK, e.g. `EN | 한국어`). Active locale drives nav labels and all public copy per **§4.4 Internationalization**. See REQ-MILAL-I18N-*.

**REQ-MILAL-NAV-04** The full horizontal navigation MUST begin at the `lg` breakpoint, not `md`, so six bilingual links do not crowd or wrap. Below `lg`, the mobile menu MUST scroll internally within the remaining viewport. Its navigation, locale toggle, and discreet Admin control MUST remain reachable at 200% text zoom and on short phone viewports. The menu button MUST expose visible hover, pressed, focus, and expanded states without heavy motion.

**Contradiction (scaffold vs SPEC):** Current Header links are Home / About / Posts (EN) with no locale toggle or bilingual dictionary. Implementing this SPEC requires routes in the table above, localized labels, and i18n per §4.4. See §12.

---

### 4.2 Page-by-page content contracts

#### Home `/` — REQ-MILAL-HOME-*

**MUST appear (above the fold on a typical phone viewport — REQ-MILAL-HOME-01):**

1. Church name KO + EN
2. 표어 (2026: 벧전 4:10 text above — verify year)
3. 주일 오전 10시 / Sunday 10:00 AM
4. Full address
5. Two CTAs: **예배안내** → `/worship`, **새가족** → `/visit`

**MUST appear (below fold OK):** short sincere intro (1–2 sentences); optional real photo or solid treatment; link path to 설교 / YouTube.

**COMPOSITION:** The first viewport MUST use a deliberate reading order: church identity, restrained motto treatment, one compact Sunday-time/address fact group, then the two required CTAs. Secondary routes below the hero MUST be quieter text links rather than a competing cluster of pill buttons. A modest sanctuary image MAY support the page rhythm after the essential facts; it MUST NOT displace AC-01 content below the fold.

**MUST NOT:** autoplay hero video; heavy animation; donate sticky; stock happy-church photos; empty ministry teasers.

#### 예배·모임 `/worship` — REQ-MILAL-WORSHIP-*

**MUST:** lead with permanent visitor information: Sunday worship time, address, and the recurring schedule, before any changing weekly bulletin or member-serving detail. On larger screens, the schedule MUST use a table with columns **예배/모임 | 시간 | 장소**. On phones it MUST become equivalent labeled stacked records, with the same content and semantics, and MUST NOT require horizontal panning.

**Seed rows (migrate from old 예배안내 — all VERIFY-WITH-CHURCH before launch):**

| 예배/모임 | 시간 | 장소 |
|-----------|------|------|
| 주일예배 | 주일 오전 10:00 | 대예배실 |
| 금요기도회 | 1·3주 금요일 오후 7:30 | 대예배실 |
| 중보기도 | 주일 오전 9:00 | 회의실 |
| 순모임 | 매월 첫째 주일 | 회의실 |
| 어린이 예배 | 주일 오전 10:00 | 유치부실 |
| Youth group (중고등부) | 주일 오전 10:00 | Youth's room |

**MUST ALSO:** address block; link to YouTube for online worship (channel or /streams — not a raw dump of the channel as the only page content).

**COMPOSITION:** When weekly bulletin content exists, present it as a restrained paper-like “This Sunday” / “이번 주일” feature after the permanent visitor facts. Order of worship, serving schedule, news, and prayer content follow as member detail rather than obscuring the recurring schedule.

**MUST NOT:** embed an entire YouTube channel UI as the page body; invent undocumented gatherings.

#### 새가족 `/visit` — REQ-MILAL-VISIT-*

**MUST rewrite** the old page (which was essentially a YouTube click-through). Content contract:

The page MUST lead with an **At a glance / 한눈에 보기** group containing the Sunday time, full address, parking guidance, entrance guidance, and children guidance. The address and map action MUST be adjacent. Parking, entrance, and children details remain VERIFY-WITH-CHURCH facts and MUST use `TbdChip` until confirmed.

| Block | MUST cover |
|-------|------------|
| At a glance | Sunday time, address + map action, parking, entrance, and kids in one scannable group |
| Expect | What a first visit looks like (welcome, service flow at high level — keep short) |
| Parking / entrance | Where to park and which entrance to use (verify copy with church) |
| Kids | Where children go during 주일예배 (pointer to 다음세대 times OK) |
| Contact | How to ask questions (email/phone once confirmed; else 문의는 예배 후 / footer 연락처) |

**COMPOSITION:** End with clear actions to Worship and Generations. Do not present all guidance as undifferentiated equal text sections.

**MUST NOT:** be a YouTube link dump; require account signup; collect forms in v1 (static guidance is enough).

#### 교회소개 `/about` — REQ-MILAL-ABOUT-*

**MUST include:**

1. **표어** (year + verse + Korean motto text)
2. **KAPC / 뉴잉글랜드노회** affiliation line
3. **Pastor short bio** folded in (no separate pastor page): from old 섬기는 사람들 — 권혁진 목사; bullets OK: 총신대 신학과; M.Div. / Th.M. Gordon-Conwell; (전) 레바논 한인 장로교회 담임 — **VERIFY-WITH-CHURCH** before publish
4. Brief church identity (밀알 / sincere Presbyterian congregation in Chelmsford) — 1 short section

**MUST NOT:** separate `/pastor` route; long CV; unrelated disability-mission content; empty 교회학교 mini-tables that duplicate 다음세대.

**COMPOSITION:** The motto and church identity form the page anchor. The pastor portrait and short biography MUST be balanced as one coherent section rather than a detached image followed by a long CV.

#### 다음세대 `/generations` — REQ-MILAL-GEN-*

**MUST:** **one page** with a single schedule of age bands + times (and room if known). It MUST be a table on larger screens and equivalent labeled stacked records on phones, without horizontal panning.

**Seed structure (fill times from worship/kids rows + church confirm):**

| 부서 | 대상 (high level) | 시간 | 장소 |
|------|-------------------|------|------|
| 유치부 | 어린이 | 주일 10:00 | 유치부실 |
| 유년부 | 초등 | *(verify)* | *(verify)* |
| Youth Group | 중고등 | 주일 10:00 | Youth's room |
| 청년부 | 청년 | *(verify)* | *(verify)* |

**MUST NOT:** four separate ministry blog sites; empty EM blog; deep child URLs as primary nav.

**COMPOSITION:** Each age group’s label, audience, time, and place MUST read as one unit. Real children/youth photographs MAY form a cohesive closing pair or gallery after the facts; they MUST NOT interrupt the schedule.

#### 설교 `/sermons` — REQ-MILAL-SERMON-*

**MUST:**

1. An explicit in-page `ButtonLink` action to YouTube channel `@milalkoreanchurch1435`, retained even when a single stream/video is embedded (not a Netflix grid).
2. List of **published** posts with `type = sermon_summary` (설교요약), newest first.
3. Detail route `/sermons/[slug]`; legacy `/posts/[slug]` permanently redirects to its canonical equivalent.

**SHOULD:** also surface published `news` (소식) in a secondary list or filter — if both types share one index, label type clearly in KO.

**MUST NOT:** require browsing hundreds of thumbnails; autoplay multiple videos; scrape YouTube into local video hosting.

**MEDIA:** Author-provided sermon images MUST render in stable reserved media frames with a consistent aspect ratio so image loading or missing images does not cause layout shift. Images MUST remain secondary to title, date/type, and excerpt.

#### 한국학교 `/korean-school` — REQ-MILAL-KS-*

**MUST (one page):**

1. **Goals** — identity / language / culture (condense old 교육 목표; rewrite for clarity, not paste walls of policy).
2. **Sunday class time** — old site: 매주 주일 오전 9:30–10:30; spring/fall semesters — **verify**.
3. **Contact** — address + confirmed email/phone only.

**MUST NOT in v1:** teacher roster by name; album galleries; 교칙 full legalistic dump; separate 소식/앨범 microsites.

**COMPOSITION:** Class time and place MUST be promoted into a compact facts group before the longer goals copy. One real Korean School photo MAY be visually prominent after those facts without becoming a gallery.

#### Footer (global) — REQ-MILAL-FOOTER-*

**MUST show:**

- Church name
- Address: 15 Alpha Road, Chelmsford, MA 01824
- Public email **when confirmed** (omit rather than invent)
- YouTube link `@milalkoreanchurch1435`
- Facebook link `milalchurch`

**MUST NOT:** fake phone; marketing tagline fluff replacing contact facts; bostonmilal.org links.

---

### 4.3 Cross-cutting public behavior

**REQ-MILAL-PUB-01** All public pages MUST be reachable from the localized public nav without orphan Imweb-style hash IDs.

**REQ-MILAL-PUB-02** 404 for unknown routes SHOULD be a simple localized (EN+KO dictionary) message + link home (nice-to-have in PLAN).

**REQ-MILAL-PUB-03** Unpublished posts MUST NOT be visible on public list/detail.

**REQ-MILAL-PUB-04** Responsive presentations MUST preserve the same facts, labels, reading order, and accessible relationships across breakpoints. Schedule-like data MUST NOT depend on horizontal scrolling on a typical phone viewport.


### 4.4 Internationalization (i18n) — REQ-MILAL-I18N-*

**Locked language policy** (replaces earlier KO-primary / EN-essentials-only):

| Rule | Requirement |
|------|-------------|
| Coverage | **Both** English and Korean for **all** public user-facing copy on all v1 public pages (home, worship, visit, about, generations, sermons, korean-school, footer, 404, public post list/detail chrome). |
| Default / fallback | **English** when no preference and browser does not prefer Korean. |
| Browser detection | Initial language follows `Accept-Language` and/or `navigator.languages`: if Korean is preferred → Korean; **otherwise → English**. |
| Manual toggle | Header EN ↔ KO control; English-first toggle affordance is fine. |
| Persistence | Persist preference in **cookie and/or localStorage**; after the user chooses, stored preference **overrides** browser default on later visits. |

**REQ-MILAL-I18N-01** All public user-facing strings for v1 pages MUST be available in **both EN and KO** (not essentials-only). Admin UI MAY remain KO-primary or bilingual (volunteer tooling; not blocking public AC).

**REQ-MILAL-I18N-02** The **default / fallback** locale MUST be **English** when detection yields neither a stored preference nor a Korean browser preference.

**REQ-MILAL-I18N-03** On first visit (no stored preference), the site MUST detect preferred language from the browser (`Accept-Language` on the server and/or `navigator.languages` on the client). If Korean is preferred → serve Korean; otherwise → English.

**REQ-MILAL-I18N-04** The public Header MUST expose an easy **EN ↔ KO** toggle. Toggle UX MAY be English-first (e.g. `EN | 한국어`).

**REQ-MILAL-I18N-05** Choosing a language MUST persist the preference (cookie and/or `localStorage`) and MUST override browser detection on subsequent visits until the user toggles again.

**REQ-MILAL-I18N-06** Route strategy: **same URL paths** for both locales (no required `/en` or `/ko` prefix). Locale is carried by cookie / client state (and `html[lang]`). PLAN may use `next-intl` or a lightweight dictionary; path-prefix `[locale]` is optional and not required for v1.

**REQ-MILAL-I18N-07** `html[lang]` (and page metadata where practical) MUST reflect the active locale (`en` or `ko`).

**REQ-MILAL-I18N-08** English and Korean public copy MUST each read as naturally authored parish communication, not SEO-shaped repetition or literal translation. Refinement MAY improve wording but MUST NOT add claims, amenities, contacts, or ministry facts that the church has not confirmed.

**Out of i18n scope (unchanged):** separate English Ministry blog spectacle; disability-mission site mix; inventing unconfirmed contact facts in either language.

---

## 5. Admin & content model

### 5.1 Auth

**REQ-MILAL-AUTH-01** Admin auth MUST use shared secret `ADMIN_SECRET` (env) verified on login.

**REQ-MILAL-AUTH-02** Successful login MUST set an **httpOnly** cookie session (scaffold: `milal_admin_session`, HMAC-signed, ~7-day max-age, `Secure` in production, `SameSite=Lax`).

**REQ-MILAL-AUTH-03** Protected routes/APIs (`/admin` except login, POST/PUT/DELETE posts, upload) MUST reject unauthenticated requests.

**REQ-MILAL-AUTH-04** Logout MUST clear the session cookie.

**REQ-MILAL-AUTH-05** No multi-user accounts / roles in v1 — one shared volunteer secret is enough. Who holds the secret is an open concern (section 10).

### 5.2 Post types & fields

**REQ-MILAL-POST-01** Posts MUST support types:

| `type` | KO use |
|--------|--------|
| `sermon_summary` | 설교요약 |
| `news` | 소식 |

**REQ-MILAL-POST-02** Fields (target model for PLAN; migrate scaffold as needed):

| Field | Required | Notes |
|-------|----------|--------|
| `id` | yes | UUID |
| `type` | yes | `sermon_summary` or `news` |
| `title` | yes | |
| `slug` | yes | Unique; auto from title if empty |
| `body` | yes | Main content (scaffold `content` rename or alias in PLAN) |
| `imageUrls` | no | Zero or more image URLs (scaffold single `coverImageUrl` MAY map to first entry for v1) |
| `published` | yes | boolean |
| `published_at` | yes when published | ISO timestamp; set on first publish; clear or keep on unpublish per PLAN (document choice) |
| `created_at` / `updated_at` | yes | Audit timestamps |

**REQ-MILAL-POST-03** Public sermon index MUST list `sermon_summary` with `published === true`. News MAY share storage; if shown publicly, only published `news`.

### 5.3 Storage

**REQ-MILAL-STORE-01** v1 MAY keep file-backed posts abstraction (`data/posts.json` via `src/lib/posts.ts`). Callers MUST go through the abstraction (Postgres swap later without UI rewrite).

**REQ-MILAL-STORE-02** Image upload via Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set. When unset, upload MUST fail gracefully and editors MUST still paste image URL(s).

### 5.4 Admin flows

**REQ-MILAL-ADMIN-01** Flows MUST exist:

1. Login — `/admin/login` with secret
2. List — `/admin` all posts (both types), published state visible
3. Create — new post form (type, title, slug, body, images, published)
4. Edit — `/admin/edit/[id]`
5. Publish / unpublish — via checkbox or explicit control on save
6. Logout

**REQ-MILAL-ADMIN-02** Delete MAY remain (scaffold has it); if kept, confirm in UI. Not required for v1 acceptance if publish/unpublish covers mistakes.

---

## 6. Non-functional requirements

| ID | Requirement |
|----|-------------|
| **REQ-MILAL-NFR-01** | **Mobile-first.** Primary design viewport is phone; desktop is enhancement. |
| **REQ-MILAL-NFR-02** | **KO + EN typography legibility.** Body ~16–18px; large headings; Korean and Latin both readable; elders on phones must read without pinch-zoom gymnastics. |
| **REQ-MILAL-NFR-03** | **Performance.** No heavy hero video; avoid large unoptimized carousels; prefer static/SSR pages; images lazy-load when present. |
| **REQ-MILAL-NFR-04** | **a11y basics.** Semantic landmarks, label form controls, visible focus, sufficient contrast on accent-on-ground, alt text for meaningful images. |
| **REQ-MILAL-NFR-05** | **Deploy.** Production on **Vercel** from this GitHub repo; package-manager build must succeed in CI/Vercel. |
| **REQ-MILAL-NFR-06** | Env secrets never committed; `.env.example` documents `ADMIN_SECRET` and optional `BLOB_READ_WRITE_TOKEN`. |
| **REQ-MILAL-NFR-07** | **Text resizing and reflow.** At 200% text zoom, public navigation controls and schedule facts remain reachable and readable without two-dimensional scrolling. |

---

## 7. Visual system

Binding visual + copy system for v1. Code tokens live in `src/app/globals.css`. Do not invent a second palette or a megachurch look. Light theme only. No dark mode.

Read: bilingual parish site for first-time visitors and members (often on a phone, including elders). Quiet hospitality. Not a marketing landing page.

Dials: `DESIGN_VARIANCE: 4` · `MOTION_INTENSITY: 3` · `VISUAL_DENSITY: 4`.

### Palette (locked)

Wheat-amber is the 밀알 mark. One accent. No navy. No second brand color.

| Role | Token | Hex | Notes |
|------|-------|-----|--------|
| Ground | `--background` | `#FAF7F2` | Warm paper |
| Text | `--foreground` | `#1C1917` | Body and headings |
| Muted text | `--muted` | `#57534E` | Secondary copy (AA on ground) |
| **Accent** | `--accent` | `#B45309` | Buttons, current nav, motto rule |
| Accent hover | `--accent-hover` | `#9A3412` | Primary hover |
| Accent soft | `--accent-soft` | `#FEF3E2` | Hero wash, selected chips |
| Borders | `--border` | `#E7E5E4` | Hairlines, tables, image edge |
| Surface | `--surface` | `#FFFFFF` | Header, footer, tables |

Deep navy stays rejected. Soft sage is not in use.

### Type

- **UI / body / headings:** Pretendard (Hangul + Latin). Body 17px, line-height 1.65, measure ≤ 65ch.
- **Motto and scripture only:** Noto Serif KR. Not for nav, buttons, or page titles.
- Headings: Pretendard semibold, tracking tight, sentence case. No all-caps labels.
- Korean and English must both read at this size on a phone without pinch-zoom.
- `html[lang="ko"]` uses `word-break: keep-all`. Do not `truncate` Korean names.

### Shape and motion

| Element | Radius |
|---------|--------|
| Buttons, locale toggle, chips | `9999px` (pill) |
| Photos, table, header | `12px` |
| Inputs (admin) | `8px` |

Motion is hover and `:active` color only (`duration-200`). Do not scale buttons: a 1px border plus `scale` makes left/right look thicker than top/bottom. Keep a 1px border on all sides (primary uses transparent border so size matches secondary). Honor `prefers-reduced-motion`. No scroll theater, no marquees, no hero video.

Focus: `outline-2 outline-offset-2 outline-accent`. Touch targets ≥ 44px.

### Components

**Buttons.** Use `Button` / `ButtonLink`. Never style a text link as a page action.

- **Primary:** filled accent, cream label (`#FAF7F2`). One per cluster.
- **Secondary:** white fill, visible border, foreground label. Hover: accent border + accent text.
- Labels: short, one line (`예배 안내`, `새가족`, `설교 요약`, `유튜브`).
- Footer socials and low-priority in-page destination lists may stay text links. Task actions and primary/secondary CTAs use `Button` / `ButtonLink`; never disguise a text link as a button action.

**Header.** Single row, max 72px. Logo + short name on small screens, full name from `md`. Full nav stays on one line from `lg`; below `lg`, use the mobile menu. The open mobile menu scrolls internally within the available viewport and preserves access to the locale and Admin controls under large text. Current page is `font-semibold text-accent` (`aria-current="page"`). Sermon detail keeps 설교 current. Locale toggle is a pill, not a CTA. Admin is **not** a primary nav item: extra-small muted `관리자` / `Admin` after the locale toggle; same control at the bottom of the mobile menu. No pill, no accent.

**Page header.** Title + one short intro. No eyebrow above the title.

**Photos.** Real church photos only. `rounded-xl`, thin border, no caption overlay, no stock smiles. Paired photos share a 4:3 `cover` crop. Figure ground `#E4DCD0` while loading. Sermon/post media uses a stable reserved aspect-ratio frame so content does not shift during load or when an image is absent. Facts first; modest photos (`max-w-md`) after. Do not sit a full-width photo above a schedule.

**TBD chip.** Unverified displayed facts: filled accent pill `TBD` (`TbdChip`). Not dashed boxes, not a sentence about confirmation. Omit unknown contacts; do not TBD an absence. Use on: 표어, pastor, non-Sunday schedule rows, generations times, Korean School class time, and unconfirmed Visit parking/entrance/kids guidance. Sunday 10:00 AM and the street address stay unmarked. Church confirmation removes the chip and replaces provisional wording with the confirmed fact; design MUST NOT conceal or euphemize an unverified fact.

**Tables and schedule records.** On larger screens, use tables with hairline rows on white and no dashed outer box. Columns stay meeting / time / place. On phones, render the same rows as labeled stacked records with clear grouping and no horizontal panning. Preserve semantic labels for assistive technology. TBD chip remains attached to the unverified value in either presentation.

**Footer.** Name, address, YouTube, Facebook. No invented email or phone. No “we are not listing email yet.”

### Layout

- Public pages: `max-w-5xl` + `px-4`, same left edge as header/footer (`PageShell`).
- Body copy `max-w-[65ch]`.
- Section padding `py-12 md:py-16`.
- Home hero without scrolling on ~390×844: church name (KO + EN), 표어, Sunday 10:00, address, CTAs to `/worship` and `/visit` (AC-01).
- Home hero reading order: identity, motto, compact time/address group, then the two CTAs. Secondary destinations are quieter text links.
- Home after hero: intro + secondary links, then a modest photo integrated into the section rhythm.
- Worship: permanent visitor schedule and address first; weekly bulletin and member detail second.
- Visit: at-a-glance arrival facts first, with map action beside the address; explanatory guidance and closing Worship/Generations actions follow.
- About: motto/identity anchor; pastor portrait and biography compose as one section.
- Generations: grouped age-band facts first; cohesive real-photo close.
- Korean School: compact time/place facts before goals; one real photo may carry visual emphasis.

### Copy voice

Parish bulletin. Not a landing page.

**English:** short sentences, concrete facts, “we” as the congregation. Avoid keyword repetition such as repeatedly restating “Korean church in Chelmsford.” No “aim to”, “journey”, “come as you are”, “no pressure”, “welcome to the family.”

**Korean:** Church notice, not translated English. 합니다체. Do not calque (`look after one another` → `서로 돌아봅니다`). No `추구합니다`, `참고해 주세요`, `가운데 함께`. No `【확인 필요】`. Nav labels stay §4.1.

**Neither language** explains CMS policy or missing contacts. Unverified displayed fact → TBD chip. Unknown contact → omit.

No em dashes or en dashes in UI copy. Hyphen for times (`9:30-10:30`).

### Don't

- Megachurch dark mode as default
- Netflix-style sermon grids
- Sticky give / donate banners
- Heavy animation / autoplay hero video
- Fake English Ministry spectacle
- SaaS logo carousels, rainbow status dots
- Conversion / marketing voice
- Deep navy (or cool blue) as accent
- Dashed prototype chrome, uppercase eyebrows on every section, stock photography

---

## 8. Integrations

| System | Use in v1 |
|--------|-----------|
| **YouTube** `@milalkoreanchurch1435` | Footer; 설교 page channel/stream link; optional single embed — not local video hosting |
| **Facebook** `milalchurch` | Footer link only |
| **Vercel** | Hosting / deploy from GitHub |
| **Vercel Blob** | Optional image uploads when token set |
| **GitHub** | Source of truth for code + this SPEC |

No other third-party CMS, analytics mandate, or email ESP required for v1.

---

## 9. Migration notes

| Source (old Imweb) | Disposition |
|--------------------|-------------|
| Home clutter / deep menus | **Purge** — rebuild per home contract |
| 예배안내 schedule table | **Copy** rows → `/worship` then **verify-with-church** |
| 새가족 안내 (YouTube-only) | **Rewrite** per visit contract — do not port |
| 교회소개 표어 + KAPC | **Copy** → `/about` |
| 섬기는 사람들 pastor blurb | **Copy** short bio into `/about` — verify still current |
| 다음세대 / 유치·유년·Youth / empty EM | **Collapse** to one `/generations` table; **purge** empty blogs |
| 설교 / 찬양 / 주일설교요약 | **Replace** with YouTube link + admin-published 설교요약 |
| 한국학교 소개 | **Condense** goals + Sunday time + contact; **purge** rosters/albums/교칙 walls |
| 밀알포토, 자료실, album trees | **Purge** from v1 IA |
| Footer address + socials | **Copy**; email/phone only when de-obfuscated/confirmed |
| Random Imweb numeric URLs | **Do not** preserve as canonical routes |

---

## 10. Open concerns

From INTENT (still open — do not silently invent answers in build):

| Concern | Notes |
|---------|--------|
| Public email / phone | Confirm for footer and 새가족/한국학교 contact |
| Domain cutover | Timing for bostonmilalchurch.org → this Vercel site |
| `ADMIN_SECRET` owner | Who holds / rotates the volunteer secret |
| Pastor & schedule currency | 권혁진 bio + worship/다음세대/한국학교 times — verify before treating as final |
| Admin locale | Public i18n locked (EN+KO); whether thin `/admin` is KO-only or bilingual is a PLAN judgment (not blocking public AC) |

---

## 11. Acceptance criteria

Testable checklist for v1 done:

- [ ] **AC-01** On a ~390×844 phone viewport, home shows church name, 표어, 주일 10:00, address, and CTAs to 예배안내 + 새가족 **without scrolling**, in the deliberate hierarchy defined in §4.2 and §7.
- [ ] **AC-02** Public nav matches localized labels in §4.1 for the active locale; full nav begins at `lg`; below `lg` the internally scrolling menu keeps all links, EN↔KO toggle, and discreet 관리자/Admin control reachable at 200% text zoom; Admin is not a primary nav item.
- [ ] **AC-03** `/worship` leads with Sunday time, address, and recurring schedule before weekly/member content; schedule shows 예배/모임 · 시간 · 장소 as a table on larger screens and labeled records without horizontal panning on phones; unverified facts use TBD.
- [ ] **AC-04** `/visit` leads with time, address + adjacent map action, parking, entrance, and kids at a glance, then explains the visit and links to Worship/Generations; it is **not** a YouTube-only page.
- [ ] **AC-05** `/about` shows 표어, KAPC line, and pastor short bio (no separate pastor page).
- [ ] **AC-06** `/generations` is a **single** page with one age-band schedule: table on larger screens, grouped labeled records without horizontal panning on phones, and no per-ministry blogs in nav.
- [ ] **AC-07** 설교 page provides an explicit YouTube channel action, lists published 설교요약 posts, and reserves stable media frames for author-provided images.
- [ ] **AC-08** `/korean-school` promotes class time/place as a compact facts group, then shows goals and confirmed contact; no teacher roster/albums.
- [ ] **AC-09** Footer shows address + YouTube + Facebook; email only if confirmed.
- [ ] **AC-10** Volunteer can login with `ADMIN_SECRET`, create 설교요약 with optional image URL/Blob, publish, see it publicly, unpublish, logout.
- [ ] **AC-11** Unpublished posts are not publicly listed or reachable by slug.
- [ ] **AC-12** Production build succeeds on Vercel.
- [ ] **AC-13** UI matches §7 (ground `#FAF7F2`, accent `#B45309`, no navy, no megachurch chrome).
- [ ] **AC-14** No primary-nav links to 자료실, 밀알포토, empty EM blog, or Imweb numeric URLs.
- [ ] **AC-15** All v1 public pages show complete user-facing copy in the active locale (EN and KO both implemented); default/fallback is English; first visit without cookie follows browser Korean preference → KO else EN; after toggle, preference persists and overrides browser default.

---

## 12. Areas of concern / contradictions

| Topic | Issue | Resolution direction |
|-------|--------|----------------------|
| **Scaffold routes vs bilingual nav** | Repo today: `/`, `/about`, `/posts`, `/admin/*` with EN-only Header labels and no locale toggle. SPEC requires `/worship`, `/visit`, `/generations`, `/korean-school`, localized EN/KO labels, 설교 path choice, and full i18n (§4.4). | PLAN must add routes + rewrite Header/Footer with toggle + dictionary/`next-intl`; keep same paths (no `/en`/`/ko` required); optionally keep `/posts` as 설교 with redirect from `/sermons` or vice versa. |
| **Language policy supersession** | Earlier drafts said KO primary UI / EN essentials only / full bilingual out of scope. | **Superseded** by §4.4 REQ-MILAL-I18N-*: full public EN+KO, default EN, browser detection, persisted toggle. |
| **Post model drift** | Scaffold `Post` has `excerpt`/`content`/`coverImageUrl`/`createdAt` — no `type`, no `published_at`, no `imageUrls[]`. | Extend abstraction in PLAN to match §5.2; migrate JSON shape; map `content`→`body` cleanly. |
| **Email obfuscation** | Old site Cloudflare email protection scrapes as placeholder protected text. | Confirm real public email with church; do not guess from obfuscation artifacts. |
| **Schedule / pastor verify** | Seeded from old Imweb pages (2026 표어, 권혁진 bio, 금요 1·3주 7:30, 한국학교 9:30–10:30). May be stale. | Show unverified displayed facts with `TbdChip`; church confirmation replaces provisional wording and removes the chip. Do not conceal uncertainty with styling or draft banners. |
| **설교 path naming** | `/sermons` is the public IA; `/posts` remains a historical scaffold path. | Canonical route is `/sermons`; permanently redirect `/posts` and `/posts/:slug` to their `/sermons` equivalents. |
| **Name collision** | Milal disability mission at bostonmilal.org is not this KAPC church. | Never link or brand-mix; copy must say Korean Church / 한인장로교회. |
| **INTENT vs thin SPEC risk** | Earlier SPEC restated INTENT without page contracts. | This file is the binding product+design source; PLAN/build must cite REQ/AC IDs. |

---

## Document control

| Version | Date (America/New_York) | Notes |
|---------|-------------------------|--------|
| v1.0 | 2026-09-05 | Full requirements + collapsed design derived from INTENT; supersedes thin SPEC restatement |
| v1.1 | 2026-09-05 | Language policy lock: full public EN+KO; default EN; browser detection; header toggle + persistence; REQ-MILAL-I18N-*; NAV-03 / non-goals / AC-15 updated; KO-primary / EN-essentials-only superseded |
| v1.2 | 2026-09-05 | Visual + copy system moved to DESIGN.md; §7 keeps palette locks; public draft banners and meta-omission copy retired |
| v1.3 | 2026-09-06 | NAV-02 / AC-02: discreet 관리자 chrome control required (not a primary nav item); volunteers must not type `/admin` |
| v1.4 | 2026-09-06 | Visual + copy system lives in §7 again (INTENT: design collapsed into SPEC). DESIGN.md is a stub redirect. |
| v1.5 | 2026-09-09 | Approved UX refinement: visitor-first Worship/Visit ordering, responsive schedule records, page-specific compositions, explicit YouTube action, resilient `lg` navigation, natural bilingual copy, stable sermon media, and explicit TBD verification behavior. |
