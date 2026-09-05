# Intent: Milal church website (v1)
Author: Saeyoung Kim (via CoS). Status: accepted / ready for plan+build against SPEC.md

## Problem
Old site bostonmilalchurch.org is cluttered Imweb-style brochure: random deep URLs, empty ministry blogs, thin/broken pages (새가족 dumps YouTube), hard for first-time visitors (phone) to find worship time and address. Church needs a clean public site on Vercel with occasional volunteer posts/images — not a fake flashy megachurch site.

## Proposed outcome
Public Next.js site (repo already scaffolded) that feels real and sincere. Purged IA: Home (name, 표어, Sunday 10am, address, key CTAs), 예배·모임, 새가족, 교회소개 (pastor folded in), one 다음세대 page, 설교 (YouTube + admin summaries), one 한국학교 page, footer contacts/socials. Thin /admin for 설교요약 and occasional 소식 (text+images via Blob). SPEC.md is the product+visual source of truth (warm minimal, wheat-amber accent, not navy; design collapsed into SPEC).

## Affected users and systems
First-time visitors (KO primary, some EN), congregation members, church volunteers editing posts; GitHub PrimaryAnomaly/milal-church-website; Vercel deploy; optional Vercel Blob.

## Constraints
- Code is not the bottleneck — commit artifacts (INTENT → SPEC → PLAN → build with proof).
- No Sanity/WordPress/heavy CMS; no megachurch dark/flashy UI; no stock-photo theater.
- Distinct from bostonmilal.org disability mission — do not mix.
- Cloud Agents may be unavailable (Cursor Pro); box/Grok Build OK.
- Brainstorming is not a go for product scope beyond this intent; SPEC.md locks product IA + visuals.
- Korean Presbyterian (KAPC) context; Chelmsford address 15 Alpha Road.

## Success looks like
Visitor finds Sunday time + address without hunting; pages match purged IA; admin can publish a sermon summary + image; site builds and deploys on Vercel; looks sincere per SPEC.md.

## Out of scope (v1)
Full bilingual parity, online giving, member portal, photo album archives, 자료실, empty EM blog, Netflix sermon browser, PITR-level ops.

## Open questions
Confirm public email/phone; domain cutover timing; who holds ADMIN_SECRET; sage vs amber final accent if wheat-amber rejected in UI; whether EN toggle is needed beyond essentials.

## Artifact chain (this repo)
**INTENT → SPEC → [PLAN](./PLAN.md)** (design collapsed into SPEC; not a separate DESIGN stage/file).

INTENT.md (this file) → [SPEC.md](./SPEC.md) (full requirements + design: REQ-MILAL-*, page contracts, admin model, AC checklist; visual system collapsed in) → [PLAN.md](./PLAN.md) (batches, file map, risks, proof) → build with proof. Former DESIGN.md is a stub redirect only.
