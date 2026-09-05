# Intent: Milal church website (v1)
Author: Saeyoung Kim (via CoS). Status: accepted / ready for design+build against DESIGN.md

## Problem
Old site bostonmilalchurch.org is cluttered Imweb-style brochure: random deep URLs, empty ministry blogs, thin/broken pages (새가족 dumps YouTube), hard for first-time visitors (phone) to find worship time and address. Church needs a clean public site on Vercel with occasional volunteer posts/images — not a fake flashy megachurch site.

## Proposed outcome
Public Next.js site (repo already scaffolded) that feels real and sincere. Purged IA: Home (name, 표어, Sunday 10am, address, key CTAs), 예배·모임, 새가족, 교회소개 (pastor folded in), one 다음세대 page, 설교 (YouTube + admin summaries), one 한국학교 page, footer contacts/socials. Thin /admin for 설교요약 and occasional 소식 (text+images via Blob). DESIGN.md is the visual source of truth (warm minimal, wheat-amber accent, not navy).

## Affected users and systems
First-time visitors (KO primary, some EN), congregation members, church volunteers editing posts; GitHub PrimaryAnomaly/milal-church-website; Vercel deploy; optional Vercel Blob.

## Constraints
- Code is not the bottleneck — commit artifacts (INTENT → DESIGN → plan → build with proof).
- No Sanity/WordPress/heavy CMS; no megachurch dark/flashy UI; no stock-photo theater.
- Distinct from bostonmilal.org disability mission — do not mix.
- Cloud Agents may be unavailable (Cursor Pro); box/Grok Build OK.
- Brainstorming is not a go for product scope beyond this intent; DESIGN.md already locked for visuals.
- Korean Presbyterian (KAPC) context; Chelmsford address 15 Alpha Road.

## Success looks like
Visitor finds Sunday time + address without hunting; pages match purged IA; admin can publish a sermon summary + image; site builds and deploys on Vercel; looks sincere per DESIGN.md.

## Out of scope (v1)
Full bilingual parity, online giving, member portal, photo album archives, 자료실, empty EM blog, Netflix sermon browser, PITR-level ops.

## Open questions
Confirm public email/phone; domain cutover timing; who holds ADMIN_SECRET; sage vs amber final accent if wheat-amber rejected in UI; whether EN toggle is needed beyond essentials.

## Artifact chain (this repo)
INTENT.md (this file) → DESIGN.md (locked) → implementation plan before large UI rebuild → proof (build + visual check).
