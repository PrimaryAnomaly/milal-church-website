# DESIGN.md — Boston Milal Korean Church Website

Design source of truth for implementers. These decisions are locked. Do not redesign the product; implement within this frame.

**Context (facts only, not marketing fluff):** Boston Milal Korean Church / 보스톤밀알한인장로교회 · 15 Alpha Road, Chelmsford MA 01824 · KAPC · 2026 motto 벧전 4:10 · YouTube [@milalkoreanchurch1435](https://www.youtube.com/@milalkoreanchurch1435)

---

## Intent

Feel **real and sincere** — not fake, not too flashy. Quiet hospitality.

Design serves **visit information** (when, where, how to come). It is not a performance, brand spectacle, or growth funnel.

---

## Visual system

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

### Language

- **KO primary**
- EN for times, address, and visit essentials

---

## Layout & UX

### Home hero (above the fold — must show without scroll)

Must include, all visible without scrolling on a typical phone viewport:

1. Church name (KO + EN)
2. 표어 (motto)
3. 주일 오전 10시
4. Address
5. Two CTAs: **예배안내** / **새가족**

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

### Footer

Contacts and socials (as needed for v1).

---

## Content IA

### v1 public pages (purged IA)

| Page | Notes |
|------|--------|
| Home | Hero + visit essentials |
| 예배·모임 | Worship / gatherings schedule |
| 새가족 | Newcomer path |
| 교회소개 | Church intro; **pastor folded in** (no separate pastor page) |
| 다음세대 | **One** page |
| 설교 | YouTube embeds + summaries |
| 한국학교 | **One** page |

### Admin / posts (v1)

- **설교요약** (sermon summaries)
- Occasional **소식** (news / notices)

---

## Do / Don't

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

## References

We skimmed design.md tooling posts for **card restraint only** (soft cards, thin borders, calm grids). That influence stops there — do not import SaaS marketing patterns, logo walls, or status-dot aesthetics from those sources.

This file is the locked design source of truth. When in doubt, prefer quieter and clearer over more impressive.
