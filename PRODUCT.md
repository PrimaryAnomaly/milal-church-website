# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is a first-time visitor using a phone, in English or Korean, who needs enough practical information to decide whether and how to attend Sunday worship.

Secondary audiences are congregation members checking current worship, ministry, sermon, and church information, and volunteer editors publishing sermon summaries or occasional church news through the shared-secret admin.

## Product Purpose

The product is the public website for Boston Milal Korean Church (보스톤밀알한인장로교회), a KAPC congregation at 15 Alpha Road in Chelmsford, Massachusetts. It helps a visitor find the Sunday worship time, address, arrival guidance, children and youth information, and online worship without hunting through legacy brochure pages.

Success means the public information is trustworthy, readable on a phone, complete in English and Korean, and easy for a small volunteer team to maintain. The site must build and deploy reliably on Vercel, and a volunteer must be able to publish or withdraw sermon summaries without exposing unpublished content.

## Positioning

This is a practical bilingual parish website for one Korean Presbyterian congregation. Its value comes from direct local facts, current worship information, real church materials, and a deliberately small information architecture. It is not a generic church-growth landing page, an English Ministry media property, or the Boston-area disability mission at bostonmilal.org.

## Operating Context

- A first-time visitor commonly arrives from a phone shortly before deciding whether to attend on Sunday. Time, address, parking, entrance, and children information are the highest-priority facts.
- Members use the Worship page as a lightweight weekly bulletin for the order of worship, serving assignments, church news, prayer items, and recurring gatherings.
- Remote visitors reach current worship through the church YouTube channel.
- Public content is shown on the same URL paths in English and Korean. Browser preference selects the first locale; the visitor's persisted toggle choice takes precedence afterward.
- A church volunteer uses `/admin` with a shared secret to create, edit, publish, unpublish, and delete sermon summaries or news. This is intentionally a small volunteer workflow rather than a multi-user CMS.
- The canonical public sermon path is `/sermons`; legacy `/posts` paths redirect permanently.

## Capabilities and Constraints

- Public routes are limited to `/`, `/worship`, `/visit`, `/about`, `/generations`, `/sermons`, `/sermons/[slug]`, and `/korean-school`.
- Every public user-facing string is available in English and Korean. English is the fallback locale; Korean is selected on a first visit when preferred by the browser.
- The locale is carried by the `milal_locale` cookie on the same URL paths. There are no `/en` or `/ko` route prefixes.
- Public sermon lists and details expose only published posts. Supported post types are `sermon_summary` and `news`.
- Posts are accessed through `src/lib/posts.ts`. The current file-backed store is not durable on Vercel serverless; a future durable store must stay behind this abstraction.
- Admin authentication uses one `ADMIN_SECRET` and an HMAC-backed, httpOnly session cookie. Multi-user accounts and role-based access are out of scope.
- `BLOB_READ_WRITE_TOKEN` is optional. Upload failure must be recoverable by pasting an image URL.
- Unknown public email and phone details are omitted. Unverified displayed church facts remain explicitly marked until the church confirms them.
- Online giving, a member portal, photo archives, 자료실, separate ministry blogs, a heavy CMS, and domain cutover are outside the current product scope.
- Open decisions: confirmed public email and phone, production-domain cutover timing, the owner and rotation process for `ADMIN_SECRET`, and confirmation of pastor, ministry-room, schedule, and Korean School facts.

## Brand Commitments

- The public name is Boston Milal Korean Church / 보스톤밀알한인장로교회.
- Never mix the church with bostonmilal.org or link to that disability-mission brand.
- Public writing uses a sincere parish-bulletin voice in each language: short, concrete, hospitable, and free of marketing claims or translated-sounding filler.
- Use the congregation's real logo and church photographs. Do not substitute stock congregation imagery or fabricate ministry evidence.
- Preserve the church's grain-of-wheat meaning, KAPC affiliation, and confirmed local identity without expanding unverified claims.

## Evidence on Hand

- Approved purpose, audience, constraints, and open questions: `INTENT.md`.
- Binding product requirements, church facts, page contracts, and acceptance criteria: `SPEC.md`.
- Locked implementation decisions and proof plan: `PLAN.md`.
- Church facts and provisional schedule data: `src/lib/church.ts` and `src/lib/bulletin.ts`.
- Complete public copy: `src/i18n/messages/en.json` and `src/i18n/messages/ko.json`.
- Real logo and church photography: `public/images/`.
- Published-post abstraction and current store: `src/lib/posts.ts` and `data/posts.json`.
- Live production deployment: `https://milal-church.vercel.app`.
- No confirmed public email, main church phone, testimonials, attendance figures, or other claims are available; future work must not fabricate them.

## Product Principles

1. Put verified visitor facts before institutional detail.
2. Make English and Korean equally complete and naturally authored.
3. Prefer a small, current parish site over a broad but empty brochure.
4. Keep volunteer publishing simple while protecting unpublished content and secrets.
5. Show uncertainty honestly and remove provisional markers only after church confirmation.

## Accessibility & Inclusion

The site is mobile-first and must remain usable by older congregants and visitors without pinch zoom. Public information must reflow without two-dimensional scrolling, controls must remain reachable at 200% text zoom, touch targets must be at least 44px, keyboard focus must be visible, and meaningful images and controls need accessible names. Korean text must avoid mid-word truncation and use appropriate line breaking. The active document language must follow the selected locale.
