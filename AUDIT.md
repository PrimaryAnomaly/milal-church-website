# AUDIT.md — SPEC + PLAN review (v1)

**Status:** complete (docs audit only; no UI implementation)  
**Audited artifacts:** [INTENT.md](./INTENT.md) → [SPEC.md](./SPEC.md) → [PLAN.md](./PLAN.md)  
**PLAN SHA (at audit):** `4f3b3c42646a75779adafe5a717acfd3f0bc9d07`  
**Date (America/New_York):** 2026-09-05  
**Scope:** Completeness, contradictions, scaffold gaps, acceptance mapping, over/under-scope. No page UI beyond this markdown.

---

## 1. Executive summary

| Area | Verdict |
|------|---------|
| SPEC vs INTENT | **Pass** — SPEC expands INTENT into binding REQ/AC/design; open questions preserved |
| PLAN vs SPEC | **Pass (partial notes)** — Every REQ-MILAL covered or deferred; AC mapping was thin (fixed in follow-up if applied) |
| Scaffold readiness | **Partial** — Admin/auth/Blob solid; public IA/visuals/model must be rebuilt per PLAN batches 1-5 |
| Over-scope | **Pass** — Domain cutover, giving, albums, Cloud Agents explicitly out |
| Under-scope | **Partial** — Serverless posts durability and church-verify process called out but not solved (correct for v1) |

**Top 5 findings** are in section 8.

---

## 2. SPEC completeness vs INTENT

### Aligned (pass)

| INTENT theme | SPEC coverage |
|--------------|---------------|
| Phone visitor finds Sunday time + address | Goals + HOME-01 + AC-01 |
| Purged IA (worship, visit, about, generations, sermons, korean-school) | NAV-01 table + section 4.2 contracts |
| Thin volunteer admin for sermon summary + images | AUTH/POST/ADMIN + AC-10 |
| Vercel deploy | NFR-05 + AC-12 |
| Warm minimal wheat-amber, not megachurch | Section 7 + AC-13 |
| Distinct from bostonmilal.org | Meta facts + non-goals + contradictions |
| Out of scope: bilingual, giving, albums, EM blog, Netflix grid | Non-goals + migration purge table |
| Open: email/phone, domain, ADMIN_SECRET owner, EN depth, sage | Section 10 |

### Gaps / unverified church facts (partial — intentional)

| Item | Status |
|------|--------|
| Public email | Unconfirmed — SPEC correctly forbids inventing |
| Main church phone | Unconfirmed — Korean school numbers flagged verify |
| 2026 motto currency | VERIFY-WITH-CHURCH |
| Pastor roster (권혁진 bio) | VERIFY-WITH-CHURCH |
| Worship / generations / korean-school times | Seeded from Imweb; verify before cutover |
| Domain cutover timing | Open; out of build |

### Contradictions INTENT↔SPEC

| Topic | Assessment |
|-------|------------|
| Design stage | INTENT says design collapsed into SPEC; DESIGN.md stub — **resolved** |
| Accent sage vs amber | INTENT open; SPEC locks wheat-amber, sage optional companion — **resolved enough for PLAN** |
| Earlier thin SPEC risk | SPEC section 12 acknowledges; current SPEC is full — **pass** |

**SPEC vs INTENT verdict: Pass** with accepted open concerns (facts to verify with church, not invent in SPEC).

---

## 3. PLAN completeness vs SPEC (REQ-MILAL coverage)

| SPEC ID family | PLAN coverage | Status |
|----------------|---------------|--------|
| NAV-01..03 | Batch 1 | Covered |
| HOME-* | Batch 3 | Covered |
| WORSHIP-* | Batches 2-3 | Covered |
| VISIT-* | Batches 2-3 | Covered |
| ABOUT-* | Batch 3 | Covered |
| GEN-* | Batches 2-3 | Covered |
| SERMON-* | Batches 2,4-5; canonical `/sermons` | Covered |
| KS-* | Batches 2-3 | Covered |
| FOOTER-* | Batch 1 | Covered |
| PUB-01..03 | B1-B2, B4-B5; 404 SHOULD in B5 | Covered |
| AUTH-01..05 | Batch 4 gap-fix; scaffold mostly done | Covered |
| POST-01..03 | Batch 4 model + filters | Covered |
| STORE-01..02 | Keep abstraction; Blob graceful | Covered |
| ADMIN-01..02 | Batch 4; delete MAY keep | Covered |
| NFR-01..06 | B1 tokens/type; B5 polish; build proof | Covered |
| Visual section 7 | Batch 1 | Covered |
| AC-01..14 | Proof sections + per-batch AC touched | Covered (mapping strengthened) |
| Open concerns / cutover / giving / albums / Cloud Agents | Explicitly out of PLAN | Deferred with reason |

**Locked decisions match SPEC preferences:** `/sermons` canonical + `/posts` redirects; camelCase TS fields; publishedAt kept on unpublish; imageUrls[0] from cover.

**PLAN vs SPEC verdict: Pass.**

---

## 4. Scaffold gaps PLAN must close

| Gap | Severity | PLAN batch |
|-----|----------|------------|
| Missing routes `/worship` `/visit` `/generations` `/korean-school` `/sermons` | High | B2 |
| EN Header/Footer; fluff tagline; no address/socials | High | B1 |
| Wrong palette (`#7c2d12` accent, slightly off ground) | High | B1 |
| `lang=en`; EN placeholder home/about (fake address/email) | High | B1+B3 |
| Post model lacks `type`, `body`, `imageUrls`, `publishedAt` | High | B4 |
| No YouTube entry on sermon index | High | B5 |
| No mobile nav hamburger | Medium | B1 |
| No KO 404 page | Low (SHOULD) | B5 |
| Admin form lacks type field / body rename | Medium | B4 |
| Session age not validated server-side beyond cookie maxAge | Low | B4 optional |
| File-backed store on Vercel ephemeral | Medium (ops) | Documented; not blocking v1 |

Auth login/logout, httpOnly cookie, protected POST/PUT/DELETE/upload, unpublished detail `notFound`, Blob graceful fail — **already meet most AUTH/STORE/ADMIN**.

---

## 5. Acceptance mapping

| AC | SPEC intent | PLAN batch | Notes |
|----|-------------|------------|-------|
| AC-01 | Home above-fold phone | B3 | Explicit phone checklist |
| AC-02 | KO nav | B1-B2 | |
| AC-03 | Worship table | B3 | |
| AC-04 | Visit rewrite | B3 | |
| AC-05 | About+pastor | B3 | |
| AC-06 | Generations one page | B3 | |
| AC-07 | Sermons YT + list | B4-B5 | |
| AC-08 | Korean school | B3 | |
| AC-09 | Footer facts | B1 | |
| AC-10 | Admin publish flow | B4 | |
| AC-11 | Unpublished hidden | B4-B5 | Scaffold already partial |
| AC-12 | Vercel/build | Every batch `npm run build` | |
| AC-13 | Visual tokens | B1+B5 | |
| AC-14 | No purged IA in nav | B1-B2 | |

**Finding (addressed if follow-up applied):** Initial PLAN cited AC per batch but lacked a single AC matrix; audit recommends keeping the matrix above in PLAN section 2 or new section 2b.

---

## 6. Over-scope / under-scope

### Over-scope check — Pass

PLAN correctly excludes: domain cutover, giving, albums/자료실, Cloud Agents, full bilingual, heavy CMS, Netflix grid, inventing contact email/phone.

### Under-scope check — Partial (acceptable)

| Item | Note |
|------|------|
| Postgres migration | Deferred via STORE-01 abstraction — OK for v1 |
| Church verification workflow | Markers only; no RACI beyond open concerns — OK |
| Middleware for `/admin` | Page-level checks exist; middleware optional not required by SPEC |
| Analytics / SEO beyond metadata | Not in SPEC — OK omitted |
| EN visit essentials depth | PLAN says EN for times/address; visit parking copy may need EN snippets — judgment call in B3 |

---

## 7. Pass/fail/partial by major SPEC section

| SPEC section | Verdict | Notes |
|--------------|---------|-------|
| 1 Meta / church facts | **Pass** | Verify flags present |
| 2 Goals and non-goals | **Pass** | Matches INTENT |
| 3 Users and jobs | **Pass** | |
| 4.1 Nav | **Pass** | PLAN picks `/sermons` |
| 4.2 Page contracts | **Pass** | PLAN Batch 3 |
| 4.3 Public behavior | **Pass** | 404 SHOULD scheduled |
| 5 Admin and model | **Pass** | Gap-fix planned; scaffold strong |
| 6 NFR | **Pass** | Mobile-first proof called out |
| 7 Visual | **Pass** | Tokens locked in PLAN B1 |
| 8 Integrations | **Pass** | YT/FB/Vercel/Blob |
| 9 Migration | **Pass** | Purge/copy/rewrite map |
| 10 Open concerns | **Pass** | Not silently closed |
| 11 Acceptance | **Pass** | Mapped to batches |
| 12 Contradictions | **Pass** | PLAN resolves path + model drift |

---

## 8. Top 5 findings

1. **Canonical path decision is correct and sticky:** PLAN locks `/sermons` + redirects — resolves SPEC section 12 naming contradiction.
2. **Largest build risk is content truth, not code:** Schedule, pastor, motto, contacts remain VERIFY-WITH-CHURCH; PLAN markers help but launch must wait on church confirm before domain cutover (out of PLAN).
3. **Post model drift is the main engineering gap:** Scaffold `content`/`coverImageUrl`/no `type`/`publishedAt` — Batch 4 is on critical path for AC-07/10/11.
4. **Vercel + file-backed `posts.json` durability** is a known scaffold limit; PLAN documents it but editors may lose posts if they expect durable writes without Blob/Postgres — call out in README during B4/B5.
5. **Public chrome is wholly wrong today (EN + wrong accent + missing routes)** — Batches 1-3 are correctly ordered before admin polish; do not ship partial EN placeholder about with fake email.

---

## 9. Recommended fixes

### Small clear fixes (apply in follow-up commit)

1. Add explicit **AC-01..14 → batch** matrix to PLAN (section 2b) — acceptance mapping completeness.
2. Ensure INTENT/SPEC artifact chains link `[PLAN.md](./PLAN.md)` — **done in PLAN commit**.
3. Optional: README note that durable posts may need Postgres later (can wait for B4).

### Judgment calls (leave open — do not silently edit SPEC)

| Call | Recommendation |
|------|----------------|
| Server-side session TTL check | Optional hardening in B4; cookie maxAge already SPEC-aligned |
| Keep `excerpt` field | PLAN keep optional — OK |
| Soft sage companion | Only if contrast fails — OK |
| Visit parking EN copy amount | Author in B3 within NAV-03 essentials |
| Middleware vs page auth | Keep page/API checks; middleware not required |
| Whether verify banners are user-visible | Prefer subtle footnote for public; louder in admin — product taste |

### Do not change

- SPEC visual lock (wheat-amber)
- Non-goals (giving, albums, Cloud Agents)
- Email/phone omission until confirmed

---

## 10. Artifact SHAs and URLs

| Artifact | SHA | URL |
|----------|-----|-----|
| PLAN.md | `4f3b3c42646a75779adafe5a717acfd3f0bc9d07` | https://github.com/PrimaryAnomaly/milal-church-website/blob/main/PLAN.md |
| AUDIT.md | `fcdfa00d941c438d57b59c89ba47fb8fb8e48a77` | https://github.com/PrimaryAnomaly/milal-church-website/blob/main/AUDIT.md |
| SPEC.md | see main history | https://github.com/PrimaryAnomaly/milal-church-website/blob/main/SPEC.md |
| INTENT.md | see main history | https://github.com/PrimaryAnomaly/milal-church-website/blob/main/INTENT.md |

---



---

## 11. Addendum — Language policy lock (2026-09-05 ET)

**Supersedes** prior INTENT/SPEC/PLAN/AUDIT assumptions that the public UI is **KO-primary** with **EN for essentials only**, and that **full bilingual / language toggle** was out of scope.

**Locked policy (authoritative in INTENT + SPEC v1.1 + PLAN v1.1):**

1. All public user-facing copy in **both English and Korean** (not essentials-only).
2. **Default language: English.**
3. Initial language follows the browser (`Accept-Language` / `navigator.languages`): Korean if preferred, otherwise English.
4. Easy Header **EN ↔ KO** toggle; preference persists (cookie/`localStorage`) and overrides browser default after the user chooses.
5. English-first toggle affordance is fine.

**SPEC:** §4.4 REQ-MILAL-I18N-01..07; NAV-03 rewritten; non-goals/open-concerns cleaned; **AC-15** added.

**PLAN:** Batch **Bi18n**; route strategy = **same URL paths + locale cookie** (not `/en`/`/ko` or required `[locale]` segment); Header LocaleToggle; AC-15 mapping.

**Prior audit notes superseded:** any pass/fail text treating KO-primary nav, EN-essentials-only, or “full bilingual out of scope” as correct — including section 2 INTENT alignment row on bilingual out-of-scope, section 6 under-scope “EN visit essentials,” and related judgment calls. Those findings are **historical**; implement against the locked i18n REQs instead.

**Still out of scope:** separate English Ministry blog spectacle; disability-mission (bostonmilal.org) mix.

## Document control

| Version | Date (America/New_York) | Notes |
|---------|-------------------------|--------|
| v1.0 | 2026-09-05 | Initial audit after PLAN v1.0 on main |
| v1.1 | 2026-09-05 | Addendum: language policy lock; KO-primary / EN-essentials findings superseded |
