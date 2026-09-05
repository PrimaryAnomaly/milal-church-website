# PLAN.md — Boston Milal Korean Church Website (v1)

**Status:** ready for build  
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
| Soft sage | **Do not introduce** unless wheat-amber contrast fails a11y in Batch 1 | SPEC open concern; navy stays rejected |
| Create path | Keep create form on **`/admin`** (no separate `/admin/new`) | Scaffold already; satisfies ADMIN-01 |

### Explicitly out of this PLAN (do not implement)

- Domain cutover (`bostonmilalchurch.org` → Vercel)
- Online giving / donate UI
- Photo albums / 밀알포토 / 자료실
- Cloud Agents automation
- Full bilingual toggle, member portal, heavy CMS, Netflix sermon grid
- Inventing public email/phone (omit until church confirms)

---
## 1. Scaffold snapshot (baseline)

| Area | Today | SPEC gap |
|------|-------|----------|
| Routes | `/`, `/about`, `/posts`, `/posts/[slug]`, `/admin/*` | Missing `/worship`, `/visit`, `/generations`, `/korean-school`, `/sermons` |
| Header | EN: Home / About / Posts; brand “Milal Church” | KO nav labels + hamburger; brand 보스톤밀알… |
| Footer | EN copyright + fluff tagline | Name, address, YT, FB; no invented email/phone |
| Tokens | `--background #faf8f5`, `--accent #7c2d12` | Ground `#FAF7F2`, accent `#B45309`, soft/border tokens |
| `layout` | `lang="en"`; EN metadata | `lang="ko"`; KO-primary titles |
| Home | EN placeholder hero; wrong CTAs | Above-fold contract HOME-01 |
| About | EN placeholder + fake address/email | 표어, KAPC, pastor bio |
| Posts | Generic list, no type, no YT | Sermon index + channel link |
| `Post` model | `excerpt`, `content`, `coverImageUrl`, no `type`/`publishedAt` | §5.2 fields |
| Auth/admin | Login, list, create, edit, publish checkbox, delete, logout, Blob | Mostly OK; gap-fix type + body + publishedAt + KO labels |
| Public unpublished | Detail `notFound` if unpublished; list filters | Keep / harden after model change |

---

## 2. REQ coverage map

Every REQ-MILAL-* and AC-* from SPEC is either **covered** by a batch below or **deferred** with reason.

| ID | Batch | Notes |
|----|-------|-------|
| NAV-01 | B1 | KO labels + mobile hamburger |
| NAV-02 | B1 | Admin never in public nav |
| NAV-03 | B1–B3 | KO primary; EN for times/address/visit essentials |
| HOME-* | B3 | Rewrite `src/app/page.tsx` |
| WORSHIP-* | B2–B3 | New `src/app/worship/page.tsx` |
| VISIT-* | B2–B3 | New `src/app/visit/page.tsx` |
| ABOUT-* | B3 | Rewrite `src/app/about/page.tsx` |
| GEN-* | B2–B3 | New `src/app/generations/page.tsx` |
| SERMON-* | B2, B4–B5 | `/sermons` + redirects; model + YT |
| KS-* | B2–B3 | New `src/app/korean-school/page.tsx` |
| FOOTER-* | B1 | Rewrite `Footer.tsx` |
| PUB-01 | B1–B2 | All public pages in KO nav |
| PUB-02 | B5 | Simple KO 404 (SHOULD) |
| PUB-03 | B4–B5 | Unpublished hidden |
| AUTH-01..05 | B4 | Mostly done; verify + KO login copy |
| POST-01..03 | B4 | Extend model + public filters |
| STORE-01..02 | B4 | Keep abstraction; Blob already graceful |
| ADMIN-01..02 | B4 | Gap-fix form fields; keep delete |
| NFR-01..06 | B1, B5 | Tokens, type scale, build, env |
| Visual §7 | B1 | CSS variables + card patterns |
| AC-01..14 | Proof per batch + final checklist |

**Deferred (not build):** domain cutover, email/phone confirmation (copy omits), ADMIN_SECRET ownership process, Cloud Agents.

### 2b. Acceptance criteria → batch

| AC | Batch | Notes |
|----|-------|-------|
| AC-01 | B3 | Home above-fold phone checklist |
| AC-02 | B1-B2 | KO nav |
| AC-03 | B3 | Worship table |
| AC-04 | B3 | Visit rewrite |
| AC-05 | B3 | About + pastor |
| AC-06 | B3 | Generations one page |
| AC-07 | B4-B5 | YT + published summaries |
| AC-08 | B3 | Korean school |
| AC-09 | B1 | Footer |
| AC-10 | B4 | Admin publish flow |
| AC-11 | B4-B5 | Unpublished hidden |
| AC-12 | Every batch | `npm run build` / Vercel |
| AC-13 | B1+B5 | Visual tokens |
| AC-14 | B1-B2 | No purged IA in nav |

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
| `src/app/not-found.tsx` | KO 404 + home link |
| `src/components/MobileNav.tsx` (or fold into Header) | Hamburger client component |
| `src/lib/church.ts` (optional) | Shared constants: address, 표어, YT, FB, schedule seed rows |

### Rewrite / extend

| File | Change |
|------|--------|
| `src/app/globals.css` | Lock palette tokens §7 |
| `src/app/layout.tsx` | `lang="ko"`, metadata, tokens usage |
| `src/components/Header.tsx` | KO nav + brand + hamburger |
| `src/components/Footer.tsx` | Contact facts + socials |
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

### Batch 1 — Visual tokens + KO chrome

**Goal:** Site shell matches SPEC section 7 and NAV/FOOTER without full page copy yet.

**Files:** `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, optional `MobileNav.tsx`

**Work:**

1. Set CSS variables: ground `#FAF7F2`, text `#1C1917`, muted `#78716C`, accent `#B45309`, accent-soft `#FEF3E2`, border `#E7E5E4`.
2. `html lang="ko"`; metadata title default 보스톤밀알한인장로교회 / Boston Milal Korean Church.
3. Header brand KO; nav: 예배·모임 `/worship`, 새가족 `/visit`, 교회소개 `/about`, 다음세대 `/generations`, 설교 `/sermons`, 한국학교 `/korean-school`.
4. Mobile nav toggle; no mega-menu; **no** admin links.
5. Footer: church name, address `15 Alpha Road, Chelmsford, MA 01824`, YouTube `@milalkoreanchurch1435`, Facebook `milalchurch`; **omit** email/phone.
6. Prefer Batch 2 pages in same PR if nav would 404; else stub minimal pages.

**Risks:** Mobile nav a11y; accent contrast on ground.

**Proof:**

- [ ] `npm run build`
- [ ] Phone viewport (~390x844): KO labels visible; admin not in nav
- [ ] Accent wheat-amber (not navy / not `#7c2d12`)
- [ ] Footer shows address + YT + FB only

**AC touched:** AC-02, AC-09, AC-13 (partial)

---

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

**Goal:** Public copy matches SPEC section 4.2. Mark unverified facts clearly.

**Shared constants (recommended `src/lib/church.ts`):** names KO/EN, address, 표어 2026, affiliation, pastor bullets, YouTube/FB URLs, worship/generations/korean-school seed data.

**Per page:**

| Route | MUST deliver |
|-------|----------------|
| `/` | Above-fold: KO+EN name, 표어, Sunday 10:00 AM (KO+EN), full address, CTAs to `/worship` + `/visit`. Below: 1-2 sentence intro; link to sermons/YT. No autoplay, donate sticky, or stock photos. |
| `/worship` | Table columns meeting/time/place (seed rows); address; YT link for online — not channel dump as body |
| `/visit` | Expect / Parking / Kids / Contact; contact = 문의는 예배 후 until email confirmed |
| `/about` | 표어; KAPC line; pastor short bio (권혁진 — VERIFY); brief identity; no `/pastor` |
| `/generations` | One table age-band/time/place; verify blanks explicit |
| `/korean-school` | Goals condensed; Sunday class time; address; no roster/albums |

**Copy hygiene:** Mark VERIFY-WITH-CHURCH rows (교회 확인 필요); do not invent phone/email.

**Risks:** Stale Imweb facts — visible verify markers until church signs off (cutover out of PLAN).

**Proof:**
- [ ] `npm run build`
- [ ] Phone home without scrolling: name, 표어, Sunday 10:00, address, both CTAs (AC-01)
- [ ] Spot-check AC-03..08
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
1. `/sermons`: clear YouTube channel link/embed entry (single, not Netflix grid); list sermon summaries newest first; optional news block.
2. Detail: imageUrls; back link to sermons.
3. `not-found.tsx`: KO message + home link.
4. Typography: body ~16-18px; large headings; soft cards / thin borders.
5. Grep leftover EN fluff, fake hello@milal.church, placeholder address.
6. Update README routes to match IA.

**Proof:**
- [ ] `npm run build` (AC-12 local proxy for Vercel)
- [ ] Full AC-01..14 checklist ticked or blocked only on church-verify
- [ ] Phone checklist: home above-fold; nav; worship table; sermons YT + list
- [ ] Focus visible on nav control; form labels present

**AC touched:** AC-07, AC-12, AC-13, AC-14, PUB-02

---

## 5. Risks register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Unverified schedule/pastor/motto year | Wrong public facts | VERIFY markers; church confirm before cutover (out of PLAN) |
| Vercel file-backed posts.json not durable | Lost posts on cold instances | Document; Postgres later via abstraction; thin v1 OK per SPEC |
| `/posts` bookmarks | 404 if redirect missed | Permanent redirects in next.config.ts |
| Mobile nav unusable | Visitors bounce | Ensure links in DOM; labeled control |
| Accent contrast | a11y fail | Test B45309 on ground; white text on accent buttons |
| Scope creep (albums, giving, EN toggle) | Delay | Out-of-plan list; refuse in PR review |
| Mixing bostonmilal.org | Brand harm | Copy review; no links |

---

## 6. Proof standards (every batch)

1. `npm run build` must succeed before merge to main.
2. Phone viewport checklist (~390x844):
   - [ ] Home above-fold after B3
   - [ ] KO mobile nav; no admin
   - [ ] Worship table readable
   - [ ] Footer address + socials
   - [ ] Sermons YT + list after B4-5
3. Cite REQ-MILAL-* / AC-* in PR description.
4. Desktop-only checks do not satisfy NFR-01.

---

## 7. Suggested PR sequence

1. docs: add PLAN.md (this file) + artifact chain links
2. feat: wheat-amber tokens + KO header/footer (Batch 1)
3. feat: public routes + /sermons canonical redirects (Batch 2)
4. feat: page content contracts (Batch 3)
5. feat: post types publishedAt + admin form (Batch 4)
6. feat: sermons UI, 404, acceptance polish (Batch 5)

Batches 1-2 may combine if small; do not merge UI rewrite without build proof.

---

## Document control

| Version | Date (America/New_York) | Notes |
|---------|-------------------------|--------|
| v1.0 | 2026-09-05 | Initial PLAN from SPEC v1.0; canonical /sermons; batches 1-5 |
