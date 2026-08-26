---
target: whole site (11 pages) — src/pages/index.astro as primary target
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-26T14-38-26Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | aria-current nav + category labels orient well; duplicate "한눈에 보기" heading muddies "where am I" |
| 2 | Match System / Real World | 4 | 문제→판단→구현→결과 structure mirrors real engineering reasoning |
| 3 | User Control and Freedom | 2 | No TOC/section-jump on long pages despite being a stated requirement; no back-to-top |
| 4 | Consistency and Standards | 3 | Strong component reuse, undercut by the duplicate-heading pattern on 6/7 detail pages |
| 5 | Error Prevention | 4 | External links flagged with ↗ + rel="noopener" before click |
| 6 | Recognition Rather Than Recall | 4 | Persistent nav, labeled prev/next, category tag above every title |
| 7 | Flexibility and Efficiency | n/a | Read-mode portfolio surface — not applicable |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained and on-brief; missing bullets + duplicate contact block add noise |
| 9 | Error Recovery | 1 | No custom 404 — falls through to Astro's dark default 404, total identity break |
| 10 | Help and Documentation | n/a | Not applicable to this surface |
| **Total** | | **24/32** | **Good (75%)** |

## Design Specificity Verdict

**LLM assessment**: This reads as authored for a frontend engineer's technical portfolio, not a generic template. The information architecture is the strongest evidence — every case study follows 한눈에 보기 → 담당 범위 → 문제 상황 → 판단과 제약 → 구현 → 결과 → 회고, a genuine engineering case-study shape, not a generic About/Skills layout. The three diagram components are bespoke to their content. Metrics rendered as large `tabular-nums` typography (not stat cards) is a specific, deliberate choice matching the brief. Where it slips toward generic: zero color accent anywhere (fully grayscale), and every heading gets identical visual weight regardless of whether it's a problem statement or a result — there's no shape to the narrative arc, only words.

**Deterministic scan**: The Impeccable static detector (`detect.mjs`) returned **0 findings** across all 23 `.astro` files in `src/pages`, `src/components`, `src/layouts`. This is a real clean pass on the static rule set, but its URL/render-mode (which would catch computed-style/overlap issues) was unavailable — Puppeteer isn't installed in this environment — so it only reflects static markup/regex rules, not a full-render pass. No false positives to report since there were no findings.

**Visual overlays**: Not applicable — no native browser tool with overlay-injection support was available this session. Playwright CLI screenshots were used as the substitute evidence source for both assessments (noted explicitly, per the degraded-run rule below).

⚠️ **Partial degradation note**: Assessment B's mechanical scan ran in **static-analysis mode only** (Puppeteer unavailable for the render-based URL scan). Browser evidence for both assessments came from Playwright CLI screenshots rather than a native overlay-injection tool. Both assessments otherwise ran as fully isolated, independent sub-agents (dual-agent, not single-context) — only the tool substitution is degraded, not the isolation.

## Overall Impression

The homepage nails the brief's first-impression goal: calm, credible, metrics in large type, no personal-brand posturing — genuinely rare in this genre. The cracks show once you go past the surface into the actual case-study content: a CSS bug strips bullet markers from most prose lists site-wide, there's no 404 page, and a template mismatch duplicates the "한눈에 보기" heading on 6 of 7 detail pages. None of these are visible on a 10-second skim of the homepage, which is exactly why they survived code review — they only show up once you actually read a full case study or hit a bad link. The single biggest opportunity: fix the missing list bullets and add a 404 page, and the score jumps meaningfully with about an hour of work.

## What's Working

1. **Metric typography** (`Metric.astro`/`MetricGroup.astro`) — large `tabular-nums` figures, label below in muted small text. This is the brief's "성과 수치는 카드보다 타이포그래피로 강조" requirement executed exactly right, and it's the first thing visitors see after the hero.
2. **`DeviceDetectionFlow` diagram** — vertically-chained steps culminating in a dark-inverted terminal node. Uses inversion, not a new hue, to mark the conclusion; stays legible at 390px; complements rather than duplicates the adjacent prose.
3. **Restraint against every explicit anti-pattern** — zero gradients, zero rounded-card treatment, zero scroll animation anywhere in `global.css`, external-link `↗` affordance before click. The brief's "피해야 할 디자인" list is fully respected.

## Priority Issues

**[P1] Markdown bullet lists render with no visible markers in prose content**
- **Why it matters**: Confirmed on every detail page checked (teammapa, admin-renewal, device-detection, dongle, youth-card, copet, bincha). Dense sections — 담당 범위, 문제 상황, 구현, 회고 — are authored as `- ` lists but render as unmarked consecutive lines, reading like broken formatting rather than a scannable list. This directly works against the brief's core readability goal, in exactly the sections meant to be scanned fastest.
- **Fix**: `Prose.astro`/`ArticleBody.astro` never restores `list-style` after Tailwind's preflight reset (contrast with `LabeledList.astro`, which correctly sets `list-disc`). Add `[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5` to `ArticleBody.astro`.
- **Suggested command**: `$impeccable typeset` (or a direct one-line CSS fix — this doesn't need the full command)

**[P1] No custom 404 page**
- **Why it matters**: `src/pages/` has no `404.astro`. A stale or mistyped link (very plausible for a portfolio shared via resume/LinkedIn) falls through to Astro's dark, logo-branded default 404 — a jarring off-brand dead end with no link back to the site, at exactly the moment a visitor needs reassurance.
- **Fix**: Add a minimal `src/pages/404.astro` using `Layout.astro`, one line of text, a link back to `/`.
- **Suggested command**: `$impeccable harden`

**[P2] Duplicate "한눈에 보기" heading on 6 of 7 detail pages**
- **Why it matters**: The structured Overview section (`DetailSection id="overview" title="한눈에 보기"`) is immediately followed by a markdown `## 한눈에 보기` heading a few hundred pixels later inside the same page's prose — confirmed in admin-renewal, device-detection, dongle, youth-card, copet, bincha. Two identically-labeled h2 sections confuse visual scanning and screen-reader heading navigation, undercutting the brief's "강한 제목 계층" goal.
- **Fix**: Rename the markdown section (e.g. "배경") or retitle the structured Overview block to something distinct (e.g. "요약").
- **Suggested command**: `$impeccable clarify`

**[P2] Sparse listing pages read as broken, especially on mobile**
- **Why it matters**: Independently confirmed by both assessments. `/experience` (one entry) leaves ~600px of dead whitespace before the footer on a 390×844 mobile viewport — nearly a full screen of nothing on a page reachable directly from primary nav. `/case-studies` (2 entries) shows the same pattern more mildly on desktop. As shipped today this reads as an incomplete or broken page on first visit, not a to-be-filled-in template.
- **Fix**: Cap max content width lower for sparse listings, or add a short intro paragraph above the list so the page doesn't visually "run out."
- **Suggested command**: `$impeccable layout`

**[P2] No table of contents / section-jump on long pages, despite being a stated requirement**
- **Why it matters**: `site-requirements.md` explicitly lists "모바일 목차 또는 섹션 이동" as a required feature. No page checked — including `dongle`, the longest at ~7300px on mobile with 15+ headings across three "문제 해결" sub-narratives — has any TOC, sticky nav, or back-to-top. This makes the single best demonstration of the candidate's problem-solving the hardest page to navigate, especially on mobile.
- **Fix**: Add a lightweight sticky/collapsible section jump-list on detail pages past some heading-count threshold.
- **Suggested command**: `$impeccable onboard` (navigation-affordance framing) or `$impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer — here, a recruiter/hiring manager unfamiliar with the candidate)**: Landing on `dongle` via a shared link, Jordan has no way to gauge how long the page is or jump to the "결과" section they actually care about — no TOC, just a long undifferentiated scroll. If Jordan reaches the page through a stale resume link instead, they land on Astro's dark default 404 with the Astro logo and no path back into the site — a dead end that looks like the whole site is broken, not just one link.

**Sam (Accessibility-Dependent, screen reader/keyboard)**: Two consecutive h2s both announced as "한눈에 보기" on the same page breaks the mental map screen-reader heading navigation is supposed to provide — Sam can't tell from the heading list alone which one is the real overview. (The missing bullet markers are a *visual* scanability issue, not a semantic one — the underlying `<ul><li>` markup appears intact, so this doesn't block Sam specifically, but it does block sighted skimmers, which is the more common failure mode here.) No 404 page also means a broken link leaves Sam with no reachable landmark to tab back into site nav.

**Casey (Distracted Mobile User)**: On `/experience`, Casey's thumb-scroll ends after one short entry, then keeps scrolling through ~600px of nothing before the footer appears — reads as the page failed to load, a strong abandon signal on a slow connection. On `dongle`'s long page, no section-jump means Casey — interrupted mid-read, as this persona always is — has no way to resume near where they left off without hunting.

## Minor Observations

- Global palette is 100% grayscale (`#fafaf9`/`#1c1917`/`#57534e`/`#e7e5e4`) with no accent hue anywhere, including hover/current-nav states. Disciplined and on-brief, but means there's no way to visually distinguish "neutral information" from "notable outcome" other than size/weight.
- Homepage's own "기술과 연락처" section ends with an email/GitHub/resume row, immediately followed by the global footer repeating the identical three links under "Contact" — reads as accidental duplication (only happens on the homepage).
- `AdminRenewalProcess` diagram re-narrates its four steps heading-for-heading in the "구현" prose directly below with no new framing — doesn't earn a distinct role next to text it duplicates, unlike `DeviceDetectionFlow`.
- Footer link labels are inconsistent in verbosity: `SiteFooter.astro` uses "GitHub 프로필" while `index.astro`'s inline contact block uses plain "GitHub" for the identical link.
- `youth-card`'s `blockquote` caveat about policy-date scope is a nice, correctly-scoped use of the one differentiated prose element — more of this kind of inline annotation would help break up dense sections.
- Detector's URL/render-scan mode (Puppeteer-based) was unavailable this session — a future run with Puppeteer installed would add computed-style/overlap coverage the static scan can't provide.

## Questions to Consider

- The missing list bullets have been live since Wave3(E)/Wave4(F) merged — would a quick visual pass per merged unit (not just build/typecheck) have caught this earlier?
- Is the zero-accent-color constraint permanent, or would one restrained accent color (e.g. on metric values only) still read as "문서형" while adding a touch of warmth?
- Should the TOC/section-jump requirement from site-requirements.md be scoped to only the longest pages (dongle), or applied uniformly for consistency?
