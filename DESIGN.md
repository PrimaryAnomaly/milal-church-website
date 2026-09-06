# DESIGN.md — Boston Milal Korean Church

**Status:** binding visual + copy system for v1  
**Product rules:** [SPEC.md](./SPEC.md) (IA, REQ/AC, church facts)  
**Code:** Tailwind 4 tokens in `src/app/globals.css`

Design read: bilingual parish website for first-time visitors and members (often on a phone, including elders). Quiet hospitality. Not a marketing landing page, not a megachurch brochure.

Dials: `DESIGN_VARIANCE: 4` · `MOTION_INTENSITY: 3` · `VISUAL_DENSITY: 4`  
Light theme only. No dark mode. SPEC forbids megachurch dark as default.

---

## 1. What we retired

- Dashed “draft / confirm with church” boxes and tags on public pages
- Public meta about what is unconfirmed, omitted, or not uploaded yet
- Uppercase tracked eyebrows on every page (`WELCOME`, `ABOUT`, …)
- Text links used as primary actions (`설교 요약`, `유튜브에서 보기`)
- Identical bordered cards wrapping every block
- Conversion copy (“come as you are”, “no pressure”, benefit bridges, FOMO)

Unconfirmed facts (motto year, pastor, times) still appear as normal copy. Do not narrate the editorial process.

---

## 2. Palette (locked)

Wheat-amber is the 밀알 mark, not a generic cream-and-brass template.

| Token | Hex | Use |
|-------|-----|-----|
| `--background` | `#FAF7F2` | Page ground |
| `--foreground` | `#1C1917` | Body and headings |
| `--muted` | `#57534E` | Secondary text (WCAG AA on ground) |
| `--accent` | `#B45309` | Primary buttons, current nav, motto rule |
| `--accent-hover` | `#9A3412` | Primary hover |
| `--accent-soft` | `#FEF3E2` | Hero wash, selected chips |
| `--border` | `#E7E5E4` | Hairlines, table rules, image edge |
| `--surface` | `#FFFFFF` | Header, footer, table surface |

One accent on the whole site. No navy. No second brand color.

---

## 3. Type

- **UI / body / headings:** Pretendard (Hangul + Latin). Body 17px, line-height 1.65, measure ≤ 65ch.
- **Motto and scripture only:** Noto Serif KR. Not for nav, buttons, or page titles.
- Headings: Pretendard semibold, tracking tight, sentence case. No all-caps labels.
- Korean and English must both read at this size on a phone without pinch-zoom.
- `html[lang="ko"]` uses `word-break: keep-all` so lines wrap at spacing units, not mid-word. Do not `truncate` Korean names.

---

## 4. Shape and motion

| Element | Radius |
|---------|--------|
| Buttons, locale toggle, chips | `9999px` (pill) |
| Photos, table, header | `12px` |
| Inputs (admin) | `8px` |

Motion is hover and `:active` only (`duration-200`, `active:scale-[0.98]`). Honor `prefers-reduced-motion`. No scroll theater, no marquees, no hero video.

Focus: `outline-2 outline-offset-2 outline-accent` on interactive controls. Touch targets ≥ 44px.

---

## 5. Components

### Buttons

Use `Button` / `ButtonLink` (`src/components/Button.tsx`). Never style a text link as a page action.

- **Primary:** filled accent, cream label (`#FAF7F2`). One per cluster.
- **Secondary:** white fill, visible border, foreground label. Hover: accent border + accent text.
- Labels: short, one line. Korean examples: `예배 안내`, `새가족`, `설교 요약`, `유튜브`.
- Footer socials may stay text links. In-page actions may not.

### Header

Single row, max 72px. Logo + short name on small screens, full name from `md`. Nav on one line from `md`. Current page is `font-semibold text-accent` (`aria-current="page"`). Sermon detail keeps 설교 current. No admin links. Locale toggle is a pill, not a button-looking CTA.

### Page header

Title + one short intro. No eyebrow above the title.

### Photos

Real church photos only. `rounded-xl`, thin border, no caption overlay, no stock smiles. Paired photos share a 4:3 crop (`cover`) so heights match; no white letterboxing. Figure ground is warm `#E4DCD0` while the image loads. Hero visit facts stay above the fold on a phone; photos sit below that block.

### TBD chip

Unverified displayed facts get an obvious filled accent pill labeled `TBD` (`src/components/TbdChip.tsx`). Not dashed boxes, not a sentence about confirmation. Omit unknown contacts entirely; do not TBD an absence.

Use on: 표어, pastor, non-Sunday schedule rows, generations times, Korean School class time. Sunday 10:00 AM and the street address stay unmarked.

### Tables (worship, generations)

Hairline rows on white. No dashed outer box. Columns stay SPEC: meeting / time / place. TBD chip on unverified rows.

### Footer

Name, address, YouTube, Facebook. No invented email or phone. No “we are not listing email yet.”

---

## 6. Layout

- Public pages (home and inner): `max-w-5xl` with `px-4`, same left edge as the header/footer (`PageShell`). Hero is left aligned, not a poster-centered manifesto.
- Body copy still uses `max-w-[65ch]` so lines do not stretch with the shell.
- Section padding `py-12 md:py-16`. Nav height ≤ 72px.
- Home hero must keep, without scrolling on ~390×844: church name (KO + EN), 표어, Sunday 10:00, address, CTAs to `/worship` and `/visit` (AC-01).

Layout families (do not repeat the same one on adjacent home sections): hero facts, then intro + actions, then a modest photo (`max-w-md`). Photos follow the facts they illustrate; they must not sit full-width above a schedule or time.

---

## 7. Copy voice

Parish bulletin. Not a landing page.

**English:** short sentences, concrete facts, “we” as the congregation. No “aim to”, “journey”, “come as you are”, “no pressure”, “welcome to the family.”

**Korean:** Write it as a church notice, not as translated English. 합니다체. Short facts. Do not calque English lines (`look after one another` → `서로 돌아봅니다`, `come as you are`, thesis-statement couplets). No `추구합니다`, `참고해 주세요`, `가운데 함께`. No `【확인 필요】`. Nav labels stay SPEC (`예배·모임`, `새가족`, …).

**Neither language** explains CMS policy or missing contact fields. If a displayed fact is unverified, mark it with a TBD chip. If a contact is unknown, omit it.

No em dashes (`—`) or en dashes (`–`) in UI copy. Hyphen for times (`9:30-10:30`).

---

## 8. Do / don’t

**Do:** quiet type, real photos, obvious buttons, phone-first, one wheat-amber accent.

**Don’t:** dashed prototype chrome, megachurch dark, Netflix sermon grids, donate stickers, stock photography, navy, SaaS card grids, uppercase eyebrows on every section, conversion psychology.
