# Intent: Milal church website (v1.1)
Author: Saeyoung Kim (via CoS). Status: accepted / UX refinement approved for build against SPEC.md. Updated: 2026-09-09.

## Problem
Old site bostonmilalchurch.org is cluttered Imweb-style brochure: random deep URLs, empty ministry blogs, thin/broken pages (새가족 dumps YouTube), hard for first-time visitors (phone) to find worship time and address. Church needs a clean public site on Vercel with occasional volunteer posts/images — not a fake flashy megachurch site.

## Proposed outcome
Public Next.js site (repo already scaffolded) that feels real, sincere, and easy to use on a phone. Purged IA: Home (name, 표어, Sunday 10am, address, key CTAs), 예배·모임, 새가족, 교회소개 (pastor folded in), one 다음세대 page, 설교 (YouTube + admin summaries), one 한국학교 page, footer contacts/socials. The refined experience puts permanent visitor facts before weekly/member detail, gives Visit an immediate time/address/parking/entrance/kids summary, and presents schedules as stacked labeled records on phones while retaining tables on larger screens. Each supporting page receives a composition appropriate to its content without changing the IA or warm parish-bulletin visual world. **All public user-facing copy in both English and Korean**; default language English; initial locale follows browser preference (KO if preferred, else EN); header EN↔KO toggle with persisted preference. Thin /admin for 설교요약 and occasional 소식 (text+images via Blob). SPEC.md is the product+visual source of truth (warm minimal, wheat-amber accent, not navy; design collapsed into SPEC).

## Affected users and systems
First-time visitors (EN+KO bilingual; browser-aware initial locale, EN default/fallback), congregation members, church volunteers editing posts; GitHub PrimaryAnomaly/milal-church-website; Vercel deploy; optional Vercel Blob.

## Constraints
- Code is not the bottleneck — commit artifacts (INTENT → SPEC → PLAN → build with proof).
- No Sanity/WordPress/heavy CMS; no megachurch dark/flashy UI; no stock-photo theater.
- Distinct from bostonmilal.org disability mission — do not mix.
- Cloud Agents may be unavailable (Cursor Pro); box/Grok Build OK.
- Brainstorming is not a go for product scope beyond this intent; SPEC.md locks product IA + visuals.
- Korean Presbyterian (KAPC) context; Chelmsford address 15 Alpha Road.
- **Language (locked):** all public user-facing copy in **both EN and KO**; **default English**; initial language from browser (`Accept-Language` / `navigator.languages`) — Korean if preferred, otherwise English; easy header toggle EN↔KO that persists (cookie/localStorage) and overrides browser default after the user chooses. English-first toggle affordance is fine.

## Success looks like
Visitor finds Sunday time + address without hunting; Visit answers practical arrival questions at a glance; schedules remain readable without horizontal panning or unreachable controls at large text sizes; pages match the purged IA while having purposeful, content-specific compositions; English and Korean read naturally in a parish voice; admin can publish a sermon summary + image; site builds and deploys on Vercel; looks sincere per SPEC.md.

## Out of scope (v1)
Online giving, member portal, photo album archives, 자료실, empty English Ministry blog spectacle, Netflix sermon browser, PITR-level ops, mixing disability-mission (bostonmilal.org) content. (Full public EN+KO copy is **in scope** — see language constraint.)

## Open questions
Confirm public email/phone; domain cutover timing; who holds ADMIN_SECRET; confirm pastor, ministry-room, schedule, and Korean School facts before removing their TBD labels. (Language policy and wheat-amber palette are locked; neither is an open question.)

## Artifact chain (this repo)
**INTENT → SPEC → [PLAN](./PLAN.md)** (design collapsed into SPEC; not a separate DESIGN stage/file).

INTENT.md (this file) → [SPEC.md](./SPEC.md) (full requirements + design: REQ-MILAL-*, page contracts, admin model, AC checklist; visual system collapsed in) → [PLAN.md](./PLAN.md) (batches, file map, risks, proof) → build with proof; [AUDIT.md](./AUDIT.md) reviews SPEC+PLAN. Former DESIGN.md is a stub redirect only.
