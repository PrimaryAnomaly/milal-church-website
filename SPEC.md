# SPEC.md — Boston Milal Korean Church Website (v1)

Product + design specification. Design is collapsed into this file (no separate DESIGN stage). Implement within this frame; do not redesign.

**Artifact chain:** [INTENT.md](./INTENT.md) → **SPEC.md** (this file) → PLAN → build with proof.

**Context (facts only):** Boston Milal Korean Church / 보스톤밀알한인장로교회 · 15 Alpha Road, Chelmsford MA 01824 · KAPC · 2026 motto 벧전 4:10 · YouTube [@milalkoreanchurch1435](https://www.youtube.com/@milalkoreanchurch1435)

---

## Requirements

### Problem

Old site bostonmilalchurch.org is a cluttered Imweb-style brochure: random deep URLs, empty ministry blogs, thin/broken pages (새가족 dumps YouTube), hard for first-time visitors (phone) to find worship time and address. Church needs a clean public site on Vercel with occasional volunteer posts/images — not a fake flashy megachurch site.

### Proposed outcome

Public Next.js site (repo already scaffolded) that feels **real and sincere**. Quiet hospitality. Design serves **visit information** (when, where, how to come) — not a performance, brand spectacle, or growth funnel.

### Affected users and systems

- First-time visitors (KO primary, some EN)
- Congregation members
- Church volunteers editing posts
- GitHub `PrimaryAnomaly/milal-church-website`
- Vercel deploy; optional Vercel Blob

### Constraints

- Code is not the bottleneck — commit artifacts (INTENT → SPEC → PLAN → build with proof).
- No Sanity/WordPress/heavy CMS; no megachurch dark/flashy UI; no stock-photo theater.
- Distinct from bostonmilal.org disability mission — do not mix.
- Cloud Agents may be unavailable (Cursor Pro); box/Grok Build OK.
- Korean Presbyterian (KAPC) context; Chelmsford address 15 Alpha Road.

### Out of scope (v1)

Full bilingual parity, online giving, member portal, photo album archives, 자료실, empty EM blog, Netflix sermon browser, PITR-level ops.

---

## Information architecture

### v1 public pages (purged IA)

| Page | Notes |
|------|--------|
| Home | Name, 표어, Sunday 10am, address, key CTAs (hero + visit essentials) |
| 예배·모임 | Worship / gatherings schedule |
| 새가족 | Newcomer path |
| 교회소개 | Church intro; **pastor folded in** (no separate pastor page) |
| 다음세대 | **One** page |
| 설교 | YouTube embeds + admin summaries |
| 한국학교 | **One** page |
| Footer | Contacts and socials (as needed for v1) |

### Admin / posts (v1)

- Thin `/admin` for **설교요약** (sermon summaries)
- Occasional **소식** (news / notices) — text + images via Blob

### Navigation

Short top nav only:

- Home
- 예배·모임
- 새가족
- 교회소개
- 다음세대
- 설교
- 한국학교

Hamburger on mobile. **No** mega-menu. **No** carousels.

### Language

- **KO primary**
- EN for times, address, and visit essentials

---

## Visual system

*(Collapsed from former DESIGN.md — locked.)*

### Style

- **Warm minimal / light / mobile-first**
- Generous whitespace
- Soft rounded cards with thin pale borders for posts and schedule blocks (restraint of refero-style card grids — **not** SaaS logo directories or rainbow status dots)

### Palette (locked)

| Role | Value | Notes |
|------|--------|--------|
| Ground | `#FAF7F2` | Off-white / warm paper |
| Text | `#1C1917` | Near-black / charcoal |
| Muted text | warm gray (e.g. `#78716C`) | Secondary copy, captions |
| **Accent (primary)** | `#B45309` | Muted wheat-amber — links, buttons, one restrained accent only |
| Accent soft / bg | very light warm wash (e.g. `#FEF3E2`) | Soft highlight behind accent UI |
| Borders | pale warm gray (e.g. `#E7E5E4`) | Thin card and divider edges |

**Accent decision:** Saeyoung rejected deep navy. Muted wheat-amber was chosen for **밀알** (grain) and warm hospitality — earthy, not neon gold. Soft sage may be used as an alternate accent if wheat-amber needs a companion calm tone; do not reintroduce navy.

### Typography

- Large, clear headings
- Body ~16–18px
- Korean + Latin both legible (elders on phones)
- No tiny metadata as primary UI

### Imagery

- Prefer real church photos when available
- Until then: solid / simple treatments
- **No** stock smiles or generic stock “happy church” photography

### References

Design.md tooling posts were skimmed for **card restraint only** (soft cards, thin borders, calm grids). That influence stops there — do not import SaaS marketing patterns, logo walls, or status-dot aesthetics from those sources.

When in doubt, prefer quieter and clearer over more impressive.

---

## UX rules

### Home hero (above the fold — must show without scroll)

Must include, all visible without scrolling on a typical phone viewport:

1. Church name (KO + EN)
2. 표어 (motto)
3. 주일 오전 10시
4. Address
5. Two CTAs: **예배안내** / **새가족**

### Do

- Quiet hospitality; warm minimal light UI
- Mobile-first; large readable type for KO + EN
- Soft rounded cards, thin pale borders, generous whitespace
- Real photos or simple solids
- Keep nav short; hero visit info above the fold
- Muted wheat-amber (`#B45309`) as the single primary accent

### Don't

- Megachurch dark mode as default
- Netflix-style sermon grids
- Sticky give / donate banners
- Heavy animation
- Fake “English Ministry” spectacle
- SaaS logo carousels, rainbow status dots, or flashy marketing chrome
- Tiny metadata as the main interface
- Stock smile photography
- Deep navy (or any cool blue) as accent — rejected

---

## Open concerns

| Concern | Notes |
|---------|--------|
| **Email / phone confirm** | Confirm public email and phone for footer/contacts |
| **Domain cutover** | Timing for bostonmilalchurch.org → this Vercel site |
| **ADMIN_SECRET owner** | Who holds / rotates the admin secret |
| **EN depth** | Whether EN toggle is needed beyond times, address, and visit essentials (full bilingual parity is out of scope for v1) |
| Sage vs amber | Soft sage as companion calm tone only if wheat-amber needs it in UI; navy remains rejected |

---

## Acceptance

Success for v1 means:

1. Visitor finds Sunday worship time + address without hunting (hero above the fold on phone).
2. Public pages match the purged IA above (no empty ministry blogs / deep Imweb leftovers as primary nav).
3. Admin can publish a sermon summary + image (Blob or pasted URL).
4. Site builds and deploys on Vercel.
5. UI looks sincere per this SPEC: warm minimal, wheat-amber accent, no megachurch chrome.
