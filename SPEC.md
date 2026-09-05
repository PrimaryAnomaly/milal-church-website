# SPEC.md — Boston Milal Korean Church Website (v1)

**Status:** accepted — engineering plans against this file  
**Artifact chain:** [INTENT.md](./INTENT.md) → **SPEC.md** (this file) → [PLAN.md](./PLAN.md) → build with proof  
**Design:** collapsed here (no separate DESIGN stage). [DESIGN.md](./DESIGN.md) is a stub redirect only.

Implement within this frame. Do not invent IA, CMS, or visual direction outside this SPEC.

---

## 1. Meta

| Field | Value |
|-------|--------|
| Product | Public church website + thin volunteer admin for posts |
| Repo | https://github.com/PrimaryAnomaly/milal-church-website |
| Stack (scaffolded) | Next.js App Router, TypeScript, Tailwind, Vercel |
| Primary language | Korean (KO); EN for times, address, visit essentials only |
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

- Full bilingual parity / language toggle for every page
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
| **Visitor** (first-time, often phone, KO primary) | Know when Sunday worship is; get address / parking / kids info; decide whether to visit this Sunday; find YouTube if remote |
| **Member** | Check schedule / 다음세대 times; read 설교요약 or 소식; share social links |
| **Volunteer editor** | Log in with shared secret; publish 설교요약 (+ optional image); post rare 소식; unpublish mistakes; log out — no CMS training required |

---

## 4. Functional requirements

Requirements are **MUST** unless marked SHOULD / MAY. IDs are stable for PLAN/tests.

### 4.1 Public routes & navigation

**REQ-MILAL-NAV-01** Top nav MUST use short KO labels only (no mega-menu, no carousels). Hamburger on mobile.

| KO nav label | Suggested path | Scaffold today | Notes |
|--------------|----------------|----------------|-------|
| (로고 / 홈) | `/` | `/` | Church name as brand link |
| 예배·모임 | `/worship` | *(missing)* | Was Imweb 예배안내 |
| 새가족 | `/visit` | *(missing)* | Was broken YouTube dump |
| 교회소개 | `/about` | `/about` | Pastor folded in |
| 다음세대 | `/generations` | *(missing)* | One page only |
| 설교 | `/sermons` **or** `/posts` | `/posts` | Pick one in PLAN; redirect the other if needed |
| 한국학교 | `/korean-school` | *(missing)* | One page; no albums |

**REQ-MILAL-NAV-02** Admin routes MUST NOT appear in public nav: `/admin/login`, `/admin`, `/admin/edit/[id]` (and any create path PLAN defines).

**REQ-MILAL-NAV-03** Language: KO is primary UI copy. EN MUST appear for worship time, address, and visit essentials (e.g. "Sunday 10:00 AM", street address). Full EN pages are out of scope.

**Contradiction (scaffold vs SPEC):** Current Header links are Home / About / Posts (EN). Implementing this SPEC requires replacing nav labels/routes to the table above. See §12.

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

**MUST NOT:** autoplay hero video; heavy animation; donate sticky; stock happy-church photos; empty ministry teasers.

#### 예배·모임 `/worship` — REQ-MILAL-WORSHIP-*

**MUST:** a schedule table with columns **예배/모임 | 시간 | 장소**.

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

**MUST NOT:** embed an entire YouTube channel UI as the page body; invent undocumented gatherings.

#### 새가족 `/visit` — REQ-MILAL-VISIT-*

**MUST rewrite** the old page (which was essentially a YouTube click-through). Content contract:

| Block | MUST cover |
|-------|------------|
| Expect | What a first visit looks like (welcome, service flow at high level — keep short) |
| Parking | Where to park / arrive (verify copy with church) |
| Kids | Where children go during 주일예배 (pointer to 다음세대 times OK) |
| Contact | How to ask questions (email/phone once confirmed; else 문의는 예배 후 / footer 연락처) |

**MUST NOT:** be a YouTube link dump; require account signup; collect forms in v1 (static guidance is enough).

#### 교회소개 `/about` — REQ-MILAL-ABOUT-*

**MUST include:**

1. **표어** (year + verse + Korean motto text)
2. **KAPC / 뉴잉글랜드노회** affiliation line
3. **Pastor short bio** folded in (no separate pastor page): from old 섬기는 사람들 — 권혁진 목사; bullets OK: 총신대 신학과; M.Div. / Th.M. Gordon-Conwell; (전) 레바논 한인 장로교회 담임 — **VERIFY-WITH-CHURCH** before publish
4. Brief church identity (밀알 / sincere Presbyterian congregation in Chelmsford) — 1 short section

**MUST NOT:** separate `/pastor` route; long CV; unrelated disability-mission content; empty 교회학교 mini-tables that duplicate 다음세대.

#### 다음세대 `/generations` — REQ-MILAL-GEN-*

**MUST:** **one page** with a single table of age bands + times (and room if known).

**Seed structure (fill times from worship/kids rows + church confirm):**

| 부서 | 대상 (high level) | 시간 | 장소 |
|------|-------------------|------|------|
| 유치부 | 어린이 | 주일 10:00 | 유치부실 |
| 유년부 | 초등 | *(verify)* | *(verify)* |
| Youth Group | 중고등 | 주일 10:00 | Youth's room |
| 청년부 | 청년 | *(verify)* | *(verify)* |

**MUST NOT:** four separate ministry blog sites; empty EM blog; deep child URLs as primary nav.

#### 설교 `/sermons` or `/posts` — REQ-MILAL-SERMON-*

**MUST:**

1. Clear link / embed entry to YouTube channel `@milalkoreanchurch1435` (channel page or latest stream — not a Netflix grid).
2. List of **published** posts with `type = sermon_summary` (설교요약), newest first.
3. Detail route for a single post (existing `/posts/[slug]` MAY be reused).

**SHOULD:** also surface published `news` (소식) in a secondary list or filter — if both types share one index, label type clearly in KO.

**MUST NOT:** require browsing hundreds of thumbnails; autoplay multiple videos; scrape YouTube into local video hosting.

#### 한국학교 `/korean-school` — REQ-MILAL-KS-*

**MUST (one page):**

1. **Goals** — identity / language / culture (condense old 교육 목표; rewrite for clarity, not paste walls of policy).
2. **Sunday class time** — old site: 매주 주일 오전 9:30–10:30; spring/fall semesters — **verify**.
3. **Contact** — address + confirmed email/phone only.

**MUST NOT in v1:** teacher roster by name; album galleries; 교칙 full legalistic dump; separate 소식/앨범 microsites.

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

**REQ-MILAL-PUB-01** All public pages MUST be reachable from the KO nav without orphan Imweb-style hash IDs.

**REQ-MILAL-PUB-02** 404 for unknown routes SHOULD be a simple KO message + link home (nice-to-have in PLAN).

**REQ-MILAL-PUB-03** Unpublished posts MUST NOT be visible on public list/detail.

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
| **REQ-MILAL-NFR-02** | **KO typography legibility.** Body ~16–18px; large headings; elders on phones must read without pinch-zoom gymnastics. |
| **REQ-MILAL-NFR-03** | **Performance.** No heavy hero video; avoid large unoptimized carousels; prefer static/SSR pages; images lazy-load when present. |
| **REQ-MILAL-NFR-04** | **a11y basics.** Semantic landmarks, label form controls, visible focus, sufficient contrast on accent-on-ground, alt text for meaningful images. |
| **REQ-MILAL-NFR-05** | **Deploy.** Production on **Vercel** from this GitHub repo; package-manager build must succeed in CI/Vercel. |
| **REQ-MILAL-NFR-06** | Env secrets never committed; `.env.example` documents `ADMIN_SECRET` and optional `BLOB_READ_WRITE_TOKEN`. |

---

## 7. Visual system

*(Locked — former DESIGN.md collapsed here. Do not redesign.)*

### Style

- Warm minimal / light / mobile-first
- Generous whitespace
- Soft rounded cards with thin pale borders for posts and schedule blocks
- Restraint of calm card grids — **not** SaaS logo directories or rainbow status dots

### Palette (locked)

| Role | Value | Notes |
|------|--------|--------|
| Ground | `#FAF7F2` | Off-white / warm paper |
| Text | `#1C1917` | Near-black / charcoal |
| Muted text | warm gray (e.g. `#78716C`) | Secondary copy, captions |
| **Accent (primary)** | `#B45309` | Muted wheat-amber — links, buttons, one restrained accent only |
| Accent soft / bg | very light warm wash (e.g. `#FEF3E2`) | Soft highlight behind accent UI |
| Borders | pale warm gray (e.g. `#E7E5E4`) | Thin card and divider edges |

**Accent decision:** Deep navy rejected. Muted wheat-amber chosen for 밀알 (grain) and warm hospitality — earthy, not neon gold. Soft sage MAY be a companion calm tone if wheat-amber needs relief; **do not reintroduce navy**.

### Typography

- Large, clear headings
- Body ~16–18px
- Korean + Latin both legible
- No tiny metadata as primary UI

### Imagery

- Prefer real church photos when available
- Until then: solid / simple treatments
- **No** stock smiles or generic happy-church photography

### UX do / don't

**Do**

- Quiet hospitality; warm minimal light UI
- Mobile-first; large readable type for KO + EN essentials
- Soft rounded cards, thin pale borders, generous whitespace
- Keep nav short; hero visit info above the fold
- Single primary accent `#B45309`

**Don't**

- Megachurch dark mode as default
- Netflix-style sermon grids
- Sticky give / donate banners
- Heavy animation / autoplay hero video
- Fake English Ministry spectacle
- SaaS logo carousels, rainbow status dots, flashy marketing chrome
- Tiny metadata as the main interface
- Stock smile photography
- Deep navy (or cool blue) as accent

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
| EN depth | Toggle beyond times/address/visit essentials? (Full bilingual = out of scope) |
| Sage vs amber | Soft sage companion only if wheat-amber needs UI relief; navy stays rejected |
| Pastor & schedule currency | 권혁진 bio + worship/다음세대/한국학교 times — verify before treating as final |

---

## 11. Acceptance criteria

Testable checklist for v1 done:

- [ ] **AC-01** On a phone-width viewport, home shows church name, 표어, 주일 10:00, address, and CTAs to 예배안내 + 새가족 **without scrolling**.
- [ ] **AC-02** Public nav matches KO labels in §4.1; no mega-menu; admin links absent from public nav.
- [ ] **AC-03** `/worship` shows schedule table with 예배/모임 · 시간 · 장소 (verified or clearly marked draft).
- [ ] **AC-04** `/visit` explains expect / parking / kids / contact — **not** a YouTube-only page.
- [ ] **AC-05** `/about` shows 표어, KAPC line, and pastor short bio (no separate pastor page).
- [ ] **AC-06** `/generations` is a **single** page with age-band table (no per-ministry blogs in nav).
- [ ] **AC-07** 설교 page links YouTube channel and lists published 설교요약 posts.
- [ ] **AC-08** `/korean-school` shows goals, Sunday class time, contact — no teacher roster/albums.
- [ ] **AC-09** Footer shows address + YouTube + Facebook; email only if confirmed.
- [ ] **AC-10** Volunteer can login with `ADMIN_SECRET`, create 설교요약 with optional image URL/Blob, publish, see it publicly, unpublish, logout.
- [ ] **AC-11** Unpublished posts are not publicly listed or reachable by slug.
- [ ] **AC-12** Production build succeeds on Vercel.
- [ ] **AC-13** UI matches §7 (ground `#FAF7F2`, accent `#B45309`, no navy, no megachurch chrome).
- [ ] **AC-14** No primary-nav links to 자료실, 밀알포토, empty EM blog, or Imweb numeric URLs.

---

## 12. Areas of concern / contradictions

| Topic | Issue | Resolution direction |
|-------|--------|----------------------|
| **Scaffold routes vs KO nav** | Repo today: `/`, `/about`, `/posts`, `/admin/*` with EN Header labels. SPEC requires `/worship`, `/visit`, `/generations`, `/korean-school`, KO labels, 설교 path choice. | PLAN must add routes + rewrite Header/Footer; optionally keep `/posts` as 설교 with redirect from `/sermons` or vice versa. |
| **Post model drift** | Scaffold `Post` has `excerpt`/`content`/`coverImageUrl`/`createdAt` — no `type`, no `published_at`, no `imageUrls[]`. | Extend abstraction in PLAN to match §5.2; migrate JSON shape; map `content`→`body` cleanly. |
| **Email obfuscation** | Old site Cloudflare email protection scrapes as placeholder protected text. | Confirm real public email with church; do not guess from obfuscation artifacts. |
| **Schedule / pastor verify** | Seeded from old Imweb pages (2026 표어, 권혁진 bio, 금요 1·3주 7:30, 한국학교 9:30–10:30). May be stale. | Ship with verify flags; replace with church-confirmed copy before domain cutover. |
| **설교 path naming** | `/sermons` (domain language) vs `/posts` (scaffold). | Pick one canonical in PLAN; redirect the other. |
| **Name collision** | Milal disability mission at bostonmilal.org is not this KAPC church. | Never link or brand-mix; copy must say Korean Church / 한인장로교회. |
| **INTENT vs thin SPEC risk** | Earlier SPEC restated INTENT without page contracts. | This file is the binding product+design source; PLAN/build must cite REQ/AC IDs. |

---

## Document control

| Version | Date (America/New_York) | Notes |
|---------|-------------------------|--------|
| v1.0 | 2026-09-05 | Full requirements + collapsed design derived from INTENT; supersedes thin SPEC restatement |
