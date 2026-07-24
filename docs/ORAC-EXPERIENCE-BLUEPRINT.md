# ORAC Website Experience Blueprint

**Status: this is the binding creative and implementation specification for the ORAC Holding redesign.** It supersedes [ORAC-REDESIGN-SPEC.md](ORAC-REDESIGN-SPEC.md) specifically on homepage sequencing (see "What this corrects" below) and should be read as the authority on the homepage opening and the overall experience going forward. It is grounded in the actual repository as of this writing — [ORAC-CURRENT-AUDIT.md](ORAC-CURRENT-AUDIT.md), the confirmed facts in [ORAC-DECISIONS.md](ORAC-DECISIONS.md), and direct inspection of the live code, not assumptions from either document alone. No source or repository files were modified to produce this document; see the closing note.

## What this corrects, and what it keeps

The existing redesign spec is already partially built. `Frame.jsx`, `HomeHero.jsx`, and `CompanyPortfolio.jsx` all contain code comments citing it directly, and its 7-stage homepage progression (Origin → Expansion → Exploration → Connection → Credibility → Leadership → Continuation) is a reasonable narrative shape. But it made one decision this blueprint reverses: it treated "Origin" (stage 1, wordmark alone) and "Expansion" (stage 2, three ventures appear) as two **sequential, scroll-gated** stages. Confirmed directly in the live code — `HomeHero.jsx`'s entire render is the wordmark, an eyebrow, one tagline line, and two generic buttons ("Explore Businesses," "Start a Conversation") inside `Frame variant="identity"`; the three ventures only exist in the next section down, `CompanyPortfolio.jsx`, reachable only after a scroll or an anchor jump. That fails the non-negotiable requirement this blueprint is built around: **all three businesses visible and equally represented in the first viewport, with zero scroll, on desktop and mobile alike.**

The correction is narrow and specific: stages 1 and 2 collapse into **one on-load composition** that resolves in under two seconds, so "Origin" and "Expansion" both happen inside the first viewport instead of being separated by a scroll. Everything else the existing spec got right is kept:

- The **Frame device** itself (`Frame.jsx`, `orac-frame`/`orac-frame-${variant}`/`orac-frame-${tone}`) — extended with one new variant, not replaced.
- The **per-venture accent tokens** (`--accent-international`, `--accent-eventus`, `--accent-luxe`) and their existing wiring through `Navbar.jsx`'s `data-venture` attribute.
- The **`VentureChapter.jsx` consolidation** — the three near-identical preview sections the audit flagged as a literal duplication have already been merged into one prop-driven component; this blueprint keeps that decision and repositions where it's used (see Page Architecture).
- The **"leadership belongs later" decision** — already implemented in `Leadership.jsx`, whose own code comment confirms this; unchanged here.
- The **Luxe page's largely-preserved Vault XIII / House Editions / Maison Series sequence** — still the least-changed venture page in this plan, because it already fits the brief.

Nothing below reintroduces a fourth venture. ORAC has exactly three: ORAC International, ORAC Eventus × Velorawed, ORAC Luxe × The House of Azrin. "ORAC Evolution" does not exist, is not planned, and is not referenced anywhere in this document except in this sentence, confirming it is excluded.

---

## 1. Final Homepage Storyboard

First frame to footer. Sections marked `[NEW]` are introduced or substantially rebuilt by this blueprint; sections marked `[KEPT]` are structurally unchanged from the current implementation (copy/position may shift per Page Architecture, but the component and its job do not).

### Opening composition `[NEW]` — replaces `HomeHero.jsx`'s current body

- **Purpose:** establish, in one unscrolled view, that ORAC is one origin containing exactly three equally-weighted, directly-enterable worlds.
- **Visible content:** ORAC wordmark + one eyebrow line + one short tagline line, a thin forking rule, and three venture apertures (International, Eventus, Luxe) each showing a tinted real photograph, the venture name, and its eyebrow label. No leadership, no card grid, no generic "Explore Businesses" button.
- **Composition:** a single vertical stack — wordmark zone on top, connective rule beneath it forking into three, then the three venture apertures in one row (desktop) that recomposes to a stacked column (mobile). See First Viewport Specification for exact proportions.
- **Imagery:** each venture aperture uses one real, already-existing photograph (International: a real product/trade image from `src/assets/images/international/catalog/`; Eventus: `bridal-entry.webp` or `wedding-couple.webp`; Luxe: `fashion-atelier.webp` or a Maison Series look), each given a subtle duotone-toward-accent grade — not a full color-block recolor.
- **Typography:** `Cormorant Garamond` for the wordmark's remaining letterforms and each venture's name; `Jost` small-caps for eyebrows, exactly as today's `.eyebrow` pattern.
- **User action:** click/tap anywhere in a venture's aperture to navigate directly to its route (`/international`, `/eventus`, `/luxury-export`) — the aperture itself is the CTA, reusing the existing whole-card-link pattern already in `CompanyPortfolio.jsx`'s `venture-frame-link`.
- **Entry transition:** the Convergence and Separation Sequence (§3) — plays once per session on first arrival at `/`.
- **Exit transition:** none needed within the page; this composition simply is the top of the normal document flow, so scrolling past it uses the standard scroll behavior, no pinning.
- **Mobile adaptation:** full recomposition, not a shrink — see First Viewport Specification and the verified 360×640 arithmetic below.

### About ORAC `[REDESIGN]` — evolves `HoldingIntro.jsx`

- **Purpose:** state, briefly, what ORAC Holding is as a parent — credibility and context, not a second venture-introduction moment.
- **Visible content:** the existing three paragraphs of "About ORAC Holding" copy (unchanged text — real, already-approved content, per Decisions item on preserving correct existing content), no leadership content (already relocated — see below).
- **Composition:** a single centered text column, `--max-narrow` width, no image, no card grid — deliberately quiet after the opening's density.
- **Imagery:** none.
- **Typography:** standard body hierarchy — eyebrow, `<h2>`, body paragraphs.
- **User action:** none required; a read-only credibility beat.
- **Entry/exit transition:** the existing `Reveal` fade-and-rise, unchanged — this is exactly the kind of section where the standard reveal is correct, not a place for a bespoke motion.
- **Mobile adaptation:** unchanged proportionally; already a single column at every breakpoint today.

### ORAC International chapter `[KEPT, repositioned]` — `VentureChapter tone="international"`

- **Purpose:** the first full "world" chapter — global trade, precision, movement.
- **Visible content:** eyebrow "ORAC International," title "Export and import trading across chosen categories," body copy, three bullet points (agricultural commodities; natural fibres and industrial minerals; automotive accessories), one CTA ("Visit International"), one large image.
- **Composition:** the existing `editorial-layout` split — copy on one side, `ImagePanel` on the other (not reversed, per `Home.jsx`'s current `VentureChapter` call).
- **Imagery:** `internationalImages.hero` — real product/trade photography, already wired.
- **Typography:** existing `VentureChapter`/`SectionHeader` hierarchy, unchanged.
- **User action:** click "Visit International" or the image panel link to go to `/international`.
- **Entry transition:** standard `Reveal`/`ImageReveal` stagger, unchanged.
- **Exit transition:** none — flows directly into Global Reach.
- **Mobile adaptation:** existing single-column stack via `.editorial-layout { grid-template-columns: 1fr }` at ≤820px — already correct, no change needed.

### Global Reach — Connection `[KEPT, repositioned]` — `GlobalReach variant="home"`

- **Purpose:** the "Connection" beat — a quiet, deliberate visual statement that the three worlds share one operating origin (India) and one shared reach, without repeating a venture pitch.
- **Visible content:** heading "OUR GLOBAL REACH," the existing world map (`react-simple-maps`, India + 30 highlighted countries), and the three stat tiles: **30** Focused countries, **5** Regional corridors, **India** Based operation (exact numbers confirmed live in `reachData.js` — do not alter without a data change).
- **Composition:** centered heading/text above a full-width map panel with the stat tiles overlaid, exactly as it renders today.
- **Imagery:** the SVG world map (topojson-driven), no photography.
- **Typography:** existing `global-reach-heading` hierarchy.
- **User action:** hover/tap a highlighted country for its tooltip (existing behavior, unchanged).
- **Entry/exit transition:** existing reveal, unchanged.
- **Mobile adaptation:** existing recomposition already correct — stat tiles go to a single column, map wrap gets tighter padding (confirmed in `11-responsive.css`).

### ORAC Eventus × Velorawed chapter `[KEPT, repositioned]` — `VentureChapter tone="eventus" reverse`

- **Purpose:** the second world chapter — memory, emotion, cinematic moments.
- **Visible content:** eyebrow "ORAC Eventus," title "Building celebrations that are felt, not just seen," three bullet points (planning/decor/execution; photography and cinematography through VELORAWED; clear timelines and pricing), CTA "Visit Eventus," one large image.
- **Composition:** the same `editorial-layout`, reversed (image on the left, copy on the right) — the one deliberate variation `Home.jsx` already applies via the `reverse` prop, giving Eventus a distinct rhythm from International without a different component.
- **Imagery:** `eventusImages.hero` — real event photography (explicitly marked placeholder-quality per the folder's own `README.md`; flagged again in Asset Production Plan).
- **Typography:** unchanged.
- **User action:** "Visit Eventus" → `/eventus`.
- **Entry/exit transition:** unchanged.
- **Mobile adaptation:** unchanged — already single-column at ≤820px, and `reverse`'s column-order flip is already neutralized on mobile (`.editorial-layout.reverse > :first-child { order: 0 }` at ≤1100px, confirmed in `11-responsive.css`).

### ORAC Luxe × The House of Azrin chapter `[KEPT, repositioned]` — `VentureChapter tone="luxe"`

- **Purpose:** the third world chapter — fabric, craft, refinement.
- **Visible content:** eyebrow "ORAC Luxe," title "Fashion shaped around cloth, craft, and restraint," three bullet points (ready-to-wear and fabric materials; white-label and B2B foundations; in-house atelier and handmade crochet), CTA "Explore Luxe," one large image.
- **Composition:** same `editorial-layout`, not reversed.
- **Imagery:** `luxeImages.hero`.
- **Typography:** unchanged.
- **User action:** "Visit ORAC Luxe" → `/luxury-export`.
- **Entry/exit transition:** unchanged.
- **Mobile adaptation:** unchanged, same pattern as International.

### Why ORAC — Credibility `[KEPT]` — `WhyOrac.jsx`

- **Purpose:** the "Credibility" beat — trust signals, positioned as support material after the three worlds have been shown, not before.
- **Visible content:** the existing five reason-panel cards (Clear structure, Professional execution, Quality discipline, Long-term intent, Partner-led growth) — unchanged copy.
- **Composition:** existing `.reason-panel-list` grid, lighter visual treatment than the venture chapters (no imagery), so it reads as support material, not a fourth chapter.
- **Imagery:** none.
- **Typography:** unchanged.
- **User action:** none required.
- **Entry/exit transition:** existing staggered `Reveal`, unchanged — appropriate here, this is exactly the kind of repeated-card content the standard reveal was designed for.
- **Mobile adaptation:** existing 2-column-then-1-column collapse, unchanged.

### Leadership `[KEPT]` — `Leadership.jsx`

- **Purpose:** the "Leadership" beat — named people, positioned deliberately late per the confirmed decision.
- **Visible content:** the existing four leadership tiles (name, role, focus) from `companyData.js` — unchanged, real names.
- **Composition:** existing `.leadership-grid`, unchanged.
- **Imagery:** none — no founder photography exists in the codebase today (confirmed in the audit); this blueprint does not require any (see Asset Production Plan).
- **Typography:** unchanged.
- **User action:** none required.
- **Entry/exit transition:** existing staggered `Reveal`, unchanged.
- **Mobile adaptation:** existing 2-column-then-1-column collapse, unchanged.

### Continuation `[KEPT]` — `ContactCTA.jsx`

- **Purpose:** the "Continuation" beat — a single, calm closing invitation.
- **Visible content:** existing heading/text ("Explore the right ORAC venture or start a conversation"), one CTA to `/contact`.
- **Composition:** existing centered `.contact-cta-inner`, dark section treatment (`--ink` background), unchanged.
- **Imagery:** none.
- **Typography:** unchanged.
- **User action:** click through to `/contact`.
- **Entry/exit transition:** existing reveal, unchanged. This is the last section before `Footer`.
- **Mobile adaptation:** already single-column, unchanged.

---

## 2. First Viewport Specification

All three ventures appear immediately and equally — not "at least one," not gated behind any scroll, interaction, or timer beyond the on-load sequence in §3, which itself never delays the content from being present in the DOM.

### Desktop (1440px and 1024px — same shape, different scale)

A single vertical stack, no side-by-side split, inside `.home-hero`'s existing full-bleed cream/white radial-gradient background:

1. **Wordmark zone (top, ~30-34% of viewport height):** the ORAC wordmark (`orac-orange.svg`), centered. Beneath it: one eyebrow line ("ORAC Holding") and one shortened tagline line (existing `.hero-subtext` treatment, cut to a single sentence — the current two-line stack in `HomeHero.jsx` is reduced by one line since vertical space is now shared with the ventures, not owned entirely by the wordmark).
2. **Forking rule (~10%):** one gold hairline descends from the wordmark and splits into three at the point it meets the venture row — an extension of the existing `.hero-brand-rule` gradient line, built as a single inline SVG `<path>` with three branches (not three separate DOM elements), so it reads as one continuous piece of connective geometry.
3. **Three venture apertures (bottom, ~55-60%):** one row, `grid-template-columns: repeat(3, minmax(0, 1fr))` — identical column logic to today's `.venture-frame-grid`, equal width, equal height, no size hierarchy between them. Each aperture is `Frame variant="venture-compact" tone="international|eventus|luxe"`, and is simultaneously the venture's introduction and its CTA — the whole frame is the tap target (`aria-label="Explore ${company.name}"`, matching the existing pattern). Each shows: a tall accent-tinted crop of one real photograph, the venture's shortName in `Cormorant Garamond` low in the frame, and its eyebrow label in that venture's accent color (`.orac-frame-international .venture-frame-label .eyebrow` etc., already styled today). No paragraph copy, no separate "Explore" text link inside the frame — the frame itself is unambiguous as an entry point.

**ORAC wordmark placement:** centered, top of the composition — the permanent parent anchor, consistent with `Navbar.jsx`'s own always-present top-left wordmark link.
**Three-world placement:** equal-width row directly beneath the wordmark and its forking rule — read order matches `companyData.js`'s existing array order (International, Eventus, Luxe), left to right.
**Labels:** venture eyebrow ("Global Trade" / "Event Planning" / "Fashion & Textiles") + shortName ("International" / "Eventus" / "Luxe") per aperture — no purpose paragraph here (that copy lives in each venture's dedicated chapter further down the page, and in the mobile nav menu already).
**Imagery/forms:** one real photograph per venture aperture, accent-tinted (see Design System, Text-safe gold usage and Colours).
**Primary navigation:** `Navbar.jsx`, unchanged — fixed header, "Companies" dropdown, mobile menu. Sits above this composition, not part of it.
**Calls to action:** the three venture apertures are the CTAs. No shared "Explore Businesses" button. "Start a Conversation" contact intent relocates to the nav (already reachable) and to the existing `/contact` route and closing `ContactCTA` section — nothing is lost, it no longer competes for primary visual weight in the one view whose entire job is "three ventures, now."
**What moves:** during the entry sequence only (§3) — the three converging forces, the ring, the fork draw-in, the three apertures' settle-in. After the sequence resolves, nothing in this viewport moves on its own; hover/focus states are the only further motion (see Motion System).
**What remains stable:** the wordmark's final position, the fork's final geometry, and each venture aperture's final position and size — once resolved, this composition does not shift, reflow, or auto-advance.
**What loads first:** the wordmark SVG and the shared gold ring path (already the first-decoded asset, `fetchpriority="high"` — same attribute already present in `HomeHero.jsx` today). Venture aperture photographs are `priority` on this one instance (see Performance Strategy) since they are now above-the-fold content, unlike their current use further down the page.
**What returning visitors see:** the resolved end-state directly — see §3 for the exact session-based rule.

### Mobile — verified against the required breakpoints, with an explicit 360×640 check

**393px / 390px (the required iPhone-class width):** same three-zone structure as desktop, recomposed to a vertical stack — wordmark zone shrinks proportionally (already fluid via existing `clamp()` rules), the fork becomes a single vertical line with three short ticks rather than a wide horizontal fork, and the three venture apertures become three equal-height horizontal bands stacked vertically, each full-width, image as a full-bleed background with the existing `venture-frame-scrim` treatment and the label overlaid on top of the scrim (not below it in a separate text row — this is the specific mechanism that makes the vertical budget close, detailed below).

**360×640 (the smallest required case — verified arithmetically, not asserted):**

This is the tightest case, so the numbers are shown explicitly rather than assumed:

| Zone | Height budget | Basis |
|---|---|---|
| Usable viewport (`100svh` minus mobile browser chrome) | ~576px | Conservative small-Android estimate; `svh` already accounts for toolbar reflow, but budgeting below the full 640px CSS height is the safe assumption rather than claiming all 640px is free |
| Minus fixed nav | −56px | `--nav-height: 56px`, the real token in `variables.css`, consumed by `Navbar.jsx` as a fixed-position header on every route |
| **= Available for hero content, zero scroll** | **520px** | |
| Wordmark zone | ~120px | Logo mark at reduced scale (~56px tall) + one eyebrow line (~14px) + tight gaps — the tagline line is dropped entirely at this exact width (kept at 390px+, cut only here), which is the one explicit content reduction this spec requires at the smallest supported size |
| Forking rule | ~24px | Reduced to a short vertical tick, not the wider desktop fork |
| Three venture bands (total) | ~376px | Full-width stacked bands |
| — per band | **~125px** | 376px ÷ 3 |
| **Total** | **520px** | Closes exactly against the 520px budget |

**This only closes because each band's label (eyebrow + shortName) overlays the photograph and scrim, rather than sitting beneath it in a separate row the way `.venture-frame-link`'s current desktop-card pattern does today** (`grid-template-rows: minmax(260px, 1fr) auto` in `04-sections.css`, or its existing mobile override of a fixed `220px`/`210px` media row plus a separate `auto` text row — confirmed in `11-responsive.css`; that existing pattern, left unmodified, would require roughly 630px+ for three cards alone, already exceeding this entire budget before the wordmark or fork are even counted). The mobile band treatment is therefore a genuinely new compact layout, `Frame variant="venture-compact"` at its narrowest breakpoint, not a shrunk version of the existing `.venture-frame-link` card — consistent with the "recompose, don't shrink" mandate.

125px per band is workable: a legible eyebrow line (~12-13px) plus a `Cormorant Garamond` shortName line (~18-20px) plus label padding fits comfortably within a 125px-tall image band with the scrim doing the contrast work, matching the existing `venture-frame-scrim` gradient treatment already proven at larger sizes.

**If real-device testing during implementation shows this doesn't hold** (e.g., a taller persistent address bar than budgeted, or a device with on-screen navigation buttons consuming more than the estimated chrome), the fallback order is: (1) drop the eyebrow line from small mobile viewport bands and keep only the venture name, (2) reduce the fork to a bare rule with no visible branch geometry, (3) as a last resort, reduce band count visually to two-plus-partial with horizontal scroll snap for the third — but this last option weakens the "all three equally visible with zero scroll" requirement and should only be used if (1) and (2) together still don't close the budget on a real tested device, and must be flagged back to the user before shipping if it becomes necessary.

**393px (iPhone) is comfortably above this 360px case** — its `100svh` budget is larger and its width allows slightly more breathing room in the same three-zone structure — so no additional design is needed there beyond what's specified for 390px above; the 360×640 arithmetic is the binding constraint.

**What returning visitors see on mobile:** identical rule to desktop — see §3.

---

## 3. Convergence and Separation Sequence

Runs on mount, not on scroll — nothing here is gated behind scroll position, so it cannot become scroll-hijacking. Total duration target: **~1.6-1.9s desktop, comfortably under 1.5s mobile** (mobile has strictly less spatial motion to execute, not compressed-but-equal motion), both well under the 2-3s ceiling and never blocking navigation or content presence (all DOM content exists immediately; only its visual entrance is staged).

### Initial state

On first paint: a single small gold ring — the literal shared "O" glyph path already common to all four ORAC SVG logos (`orac-orange.svg`, `orac-international.svg`, `orac-eventus.svg`, `orac-luxe.svg` all share the same ring geometry as their first path) — sits centered where the wordmark will resolve. The remaining wordmark letterforms, the fork, and the three venture apertures are present in the DOM (for accessibility and no-JS/slow-JS resilience) but at `opacity: 0`.

### How the three forces appear and converge (0-500ms)

Three forms animate inward from off-frame toward the ring, each coded to its venture's real nature, each in that venture's accent token color:

- **International** (`--accent-international`): a thin, precise line/vector travels in from the left edge on a slightly curved path (SVG `stroke-dasharray`/`stroke-dashoffset` line-draw, or a `transform: translateX + rotate` combination), with a slight overshoot-and-settle easing — mechanical and directional, echoing the same route-line language already present in `GlobalReach`.
- **Eventus** (`--accent-eventus`): a soft radial glow drifts in from the right edge and pulses once on approach — `filter: blur()` plus an opacity ramp, no hard edges, warm and breathing rather than moving on a fixed vector.
- **Luxe** (`--accent-luxe`): a folded plane rises from the bottom edge with a slight rotation-settle, as if cloth falling into place — a `clip-path: polygon()` fold crease with a gradient sampled from two or three real tones in the actual Vault XIII palette photograph (`vault-xiii-palette.jpg`), not invented colors.

Staggered entry (0 / 60 / 120ms) so the eye registers three distinct arrivals, not one blob; all three reach the ring by ~450-500ms.

### How ORAC is formed/revealed

On arrival, each force's color briefly tints the ring's edge (a `box-shadow`/`filter: drop-shadow` pulse in the venture's accent, ~150ms) before settling to solid gold — three distinct forces becoming one, expressed as a color handoff on a fixed shape rather than a literal shape-morph (which would invite cross-browser jank for no added narrative clarity). Immediately after (500-750ms), the remaining wordmark letterforms fade/scale in around the now-gold ring (`opacity 0→1`, `scale(0.97→1)`, existing `--ease-smooth` curve), and the eyebrow + tagline reveal beneath it using the existing `Reveal` stagger. This is the "Origin" beat.

### How they separate, and how each world becomes selectable (750-1650ms)

At 750ms, the fork begins drawing from the wordmark downward, splitting into three branches at the vertical midpoint before the venture row (SVG `stroke-dasharray` line-draw, ~250-300ms). At 1050ms, each of the three venture apertures animates in from a slightly offset, slightly scaled starting state (`opacity 0→1`, `translateY(18px)→0`, `scale(0.98)→1`), staggered ~100ms per index in the existing `companies` array order (International, Eventus, Luxe), each landing by ~1650ms with its accent-tinted photo crossfading in under its scrim at the same moment its frame border/shadow settles. Once landed, each aperture is immediately focusable and clickable — "selectable" is not a separate state, it's the resting state.

### Duration and control

~1.65-1.9s total desktop, timer/mount-driven throughout (no scroll listener, no pinned section, no step requiring user input to advance) — this is a stronger guarantee against scroll-hijacking than a scroll-triggered version would be, since nothing about it depends on scroll position at all.

### Skip behavior

No explicit "skip" button is needed or recommended — the sequence is short enough (under 2s) that a skip control would add UI clutter for a marginal time save, and the three apertures are already interactive (clickable/focusable) from the moment they begin appearing, not only once the sequence fully completes, so an impatient visitor can act immediately without waiting.

### Session-based repeat behavior

Play the full sequence **once per browser session**, using a `sessionStorage` flag (e.g. `orac-opening-seen`) — a pattern not present anywhere in the codebase today, introduced cleanly with no conflicting prior art. On mount, check the flag:

- **Not set** (first visit to `/` this session): play the full sequence above, then set the flag.
- **Set** (any later visit to `/` within the same session — back/forward nav, clicking the nav wordmark from a venture page, a refresh): skip straight to the resolved end-state, with only the existing lightweight `Reveal` stagger on the three apertures, not the full ring/convergence choreography.

This is deliberately session-scoped, not `localStorage`-scoped (once-ever) and not repeated on every load: a returning visitor who clicks the ORAC wordmark from `/international` back to `/` mid-session (trivially easy — the wordmark is always a link to `/` in `Navbar.jsx`) should not sit through the full sequence again, but a genuinely new visit later should see the signature moment fresh.

### Reduced-motion alternative

Not a shorter version of the animation — the complete, resolved end-state rendered on the very first frame, with zero transition. The component checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches` at mount (a new but standard check, consistent with the codebase's existing defensive style, e.g. `useReveal`'s `"IntersectionObserver" in window` guard) and, if true, renders the ring already gold, the wordmark already full, the fork already drawn, and all three apertures already in place — immediately. The existing global `@media (prefers-reduced-motion: reduce)` block in `11-responsive.css` (which already forces `transition-duration`/`animation-duration` to near-zero and forces `.reveal`/`.image-reveal`/`.safe-image` to their resolved state) is extended to cover the new ring/force/fork classes, so no transition flash is possible even if the JS check is somehow bypassed.

### Mobile alternative

Per the "recompose, don't shrink" mandate: skip the three-direction convergence entirely (there is no meaningful travel distance to simulate at this scale, and doing so anyway reads as visual noise, not motion). Instead: the ring appears already-converged (a quick 150-200ms scale/fade-in only), the three accent-color pulse handoff still plays (cheap and legible even small), the wordmark resolves, the fork becomes a short vertical tick, and the three bands reveal as a simple sequential fade/slide-up stack (`translateY` only, no scale). Total mobile duration: well under 1.5s, since there is strictly less spatial motion to execute.

---

## 4. Three Business Worlds

### ORAC International

- **Emotional tone:** confident, precise, operational — reliability under scale.
- **Visual language:** real product/trade photography (spices, textiles, minerals, automotive parts — all real, already in `src/assets/images/international/`), a restrained precise crop (not a decorative collage), the existing world-map route-line language extended subtly as a secondary motif.
- **Layout behaviour:** the existing `editorial-layout` split (copy/image), not reversed — a steady, ledger-like rhythm appropriate to trade content.
- **Image treatment:** tight, subject-aware crops; the audit already flags several catalogue images as used at raw aspect ratio in places — this blueprint's Performance Strategy requires standardizing ratios here specifically.
- **Motion behaviour:** the standard content reveal (Motion System §M7), plus the opening's own precise-line force (§3) — no separate bespoke animation for this venture beyond what the opening already establishes.
- **Material/atmospheric language:** photography is the material — no invented textures; the map's route-line accent is the one abstract extension, already present.
- **Interaction style:** direct, functional links (existing carousel, existing map tooltip) — no added flourish.
- **Consistent with ORAC:** the Frame device at every entry point, the shared nav, gold as the shared accent, the same typography system.
- **Unique to International:** `--accent-international` (#2c4a63) as its second signal, tighter label tracking for product tags/origins (already supported by `spec`/`origin` fields in `internationalData.js`), the route-line motif.

### ORAC Eventus × Velorawed

- **Emotional tone:** warm, human, felt rather than seen — the existing homepage copy's own phrase ("Building celebrations that are felt, not just seen") is the right register to hold onto.
- **Visual language:** real event/wedding photography plus VELORAWED cinematography imagery — currently placeholder-quality per the folder's own README (flagged again in Asset Production Plan; this blueprint does not invent new imagery to solve that, it names the gap).
- **Layout behaviour:** the same `editorial-layout`, reversed — the one deliberate rhythm variation already in `Home.jsx`, kept.
- **Image treatment:** softer crops than International's precision, allowing more breathing room around subjects — human moments, not catalogued products.
- **Motion behaviour:** slightly warmer/slower pacing than International within the same shared system (e.g., a marginally longer reveal delay), never a second motion language — plus the opening's soft-glow force (§3).
- **Material/atmospheric language:** light and warmth, expressed through the glow motif and warmer-toned photography, not through invented textures.
- **Interaction style:** the existing gallery/editorial patterns (`EditorialGallery.jsx`), unchanged.
- **Consistent with ORAC:** same as International.
- **Unique to Eventus:** `--accent-eventus` (#8a3b34), the reversed layout rhythm, the VELORAWED sub-brand's own existing distinct section (`EventusVelorawedSection.jsx`, kept as-is on its own page).

### ORAC Luxe × The House of Azrin

- **Emotional tone:** quiet refinement, material intelligence — the venture that already fits the brief best today.
- **Visual language:** the existing Vault XIII palette imagery, House Editions, and Maison Series photography — all real, all already in place.
- **Layout behaviour:** the same `editorial-layout`, not reversed, on the homepage chapter; the dedicated `/luxury-export` page's own already-distinct Vault XIII → House Editions → What Is Azrin → Maison Series → Catalogue → Values sequence is preserved with minimal change (see Page Architecture).
- **Image treatment:** the Maison Series look photography already has precise, subject-aware crops (per the audit) — International's imagery should be brought to this same discipline over time, not the reverse.
- **Motion behaviour:** the opening's folded-plane force (§3), sampled from the real palette image; otherwise the standard reveal system.
- **Material/atmospheric language:** fabric and texture are the material — the venture's own existing swatches and photography already deliver this without any invented 3D or procedural texture.
- **Interaction style:** the existing `InteractiveImage` pointer-tilt component on Maison category pages, unchanged (a legitimate, already-built stand-in for "movable" product presentation that does not require a 3D library — see 3D Constraints discussion under Asset Production Plan and Performance Strategy).
- **Consistent with ORAC:** same as the other two.
- **Unique to Luxe:** `--accent-luxe` (#2f5240), the folded-plane opening motif, the already-distinct page sequence.

---

## 5. Page Architecture

### Homepage — final section order

`OriginSequence` (new, replaces `HomeHero`'s current body) → `HoldingIntro` (About only) → `VentureChapter`(international) → `GlobalReach variant="home"` → `VentureChapter`(eventus, reversed) → `VentureChapter`(luxe) → `WhyOrac` → `Leadership` → `ContactCTA`.

### Every current homepage section, marked and reasoned

| Section (current file) | Disposition | Reason |
|---|---|---|
| `HomeHero.jsx` | **Redesign** | Its current body (wordmark alone, two generic buttons) is exactly the "conventional opening" the brief asks to move past, and it structurally fails the first-viewport requirement. Rebuilt around `OriginSequence` (§2, §3), reusing `Frame`, `Reveal`, and the existing wordmark asset. |
| `HoldingIntro.jsx` | **Keep (content only)** | The remaining "About ORAC Holding" paragraphs are real, correct, already-approved copy with no venture-representation job to do — no reason to touch beyond confirming leadership has been fully split out (already done, per `Leadership.jsx`'s own code comment). |
| `CompanyPortfolio.jsx` | **Remove (absorbed)** | Its entire job — "show the three ventures as enterable apertures" — is now done inside `OriginSequence`, in the first viewport, where it belongs. Keeping both would mean showing the same three ventures twice in immediate succession with no new information the second time, which is redundant, not reinforcing. Its `Frame variant="venture"` pattern and `ventureTones` mapping are directly reused inside `OriginSequence`'s compact variant, so no logic is lost, only its standalone section wrapper. |
| `VentureChapter.jsx` (×3 calls) | **Keep, repositioned** | Already a good consolidation of what were three duplicate files; kept as the "Exploration" chapters, now positioned after the opening (which already introduced the three ventures) rather than being the *first* place they appear. |
| `GlobalReach variant="home"` | **Keep, repositioned** | Already the one section that visually ties the three ventures to a shared origin and reach — exactly the "Connection" job. No change to its content or position relative to the venture chapters. |
| `WhyOrac.jsx` | **Keep** | Already correctly positioned as support/credibility material after the ventures, not before. No change. |
| `Leadership.jsx` | **Keep** | Already correctly relocated per the confirmed decision; this blueprint does not move it further. |
| `ContactCTA.jsx` | **Keep** | Correct as the final beat; no change. |

### Venture page section order — no change to any of the three

`OracInternational.jsx`, `OracEventus.jsx`, and `LuxuryExport.jsx` keep their current, already-distinct section sequences unchanged in order (see Current Audit §6 and the exploration confirming each page's real structure). The only addition to each is the Frame device at page-open (already true for the homepage-linked `Hero.jsx` treatment; see Design System for exactly how `Hero.jsx` and `Frame` relate). No venture sub-page section is removed, combined, or reordered by this blueprint — each already satisfies its brief requirements reasonably well, and the correction this document makes is scoped to the homepage's first viewport, not the venture pages' internal structure.

---

## 6. Design System

**Typography hierarchy:** unchanged two-family system — `Cormorant Garamond` (display: wordmark, venture names, section-level statements, `<h1>`/`<h2>`) and `Jost` (body: paragraphs, nav, buttons, eyebrows). Eyebrow (`--gold`, small-caps, tracked) → display heading → body → metadata/labels (existing `<small>` pattern). No new font is justified by anything in this blueprint.

**Spacing system:** the existing fluid `clamp()` scale, unchanged — `--space-xs` through `--space-3xl`.

**Grid:** no new grid framework; the opening's three-venture row/column reuses the existing `grid-template-columns: repeat(3, minmax(0, 1fr))` pattern already in `.venture-frame-grid`.

**Containers:** `--max: 1180px`, `--max-narrow: 840px`, unchanged.

**Colours:** unchanged base — `--gold #b8975a`, `--ink #1a1814`, `--cream #faf8f4`, `--white`. The three venture accents already exist and are reused, not reinvented: `--accent-international #2c4a63` / `-light #7ea3c2`, `--accent-eventus #8a3b34` / `-light #c98177`, `--accent-luxe #2f5240` / `-light #7fac93`. One correction flagged for the implementation phase, not introduced here: `GlobalReach.jsx`'s map currently hardcodes hex values (`#151347`, `#B42318`, etc.) inline rather than referencing `--navy` or the accent tokens, duplicating the same colors a second time in `08-global-reach.css` — this should be reconciled to a single source during the design-system-corrections phase (Implementation Phases, Phase 3), not left as a second silent color source.

**Text-safe gold usage — corrected: `--gold` is not text-safe on light backgrounds, and a second token is required.** Checked directly: `--gold` (`#b8975a`) against `--cream` (`#faf8f4`) measures roughly **2.4:1**, and against `--white` roughly **2.5:1** — both well below the WCAG AA minimum of 4.5:1 for normal-size text. `--gold` is already used as the color of `.eyebrow` text on light-background sections (`.home-hero .eyebrow`, `.product-hero-dark .eyebrow`, `.contact-heading .eyebrow` in `03-hero.css`) — this is a real, current contrast failure on running text, not a hypothetical risk.

**Requirement:** introduce a new token, `--gold-text` (a darker gold — a starting value around `#7a5c28` measures roughly **6.3:1** against `--cream` and **6.6:1** against `--white`, comfortably clearing 4.5:1; the exact hex must be re-verified with a contrast-checking tool at implementation time, not assumed correct from this document alone, since perceptual gold-ness and contrast math need to be balanced together). `--gold-text` is used for all **small/normal-size text on cream or white backgrounds** — eyebrows, small-caps labels, metadata — anywhere gold currently colors running text on a light surface. `--gold` itself is preserved unchanged for decorative, non-text, or large-scale uses where 4.5:1 does not apply: rules, borders, hover-state fills, focus-ring shadows, large-scale accents, and any text on the existing dark surfaces (`--ink`, `product-hero-dark`'s own dark treatment context, `ContactCTA`/`quote-block`) where `--gold`'s existing contrast against dark backgrounds is not the failure being corrected here. Gold remains the *shared ORAC* signal (eyebrows, rules, hover states, focus rings) and must never become a venture's *only* differentiator — each venture's accent token is the "which world" signal, gold (in whichever of its two tokens is contrast-appropriate to the surface) is the "this is ORAC" signal. This is the existing rule from the prior spec, kept, with the text-contrast correction layered on top of it, not replacing it.

**Implementation criteria (binding, not advisory):** every text usage of gold on a cream or white background must measure a minimum **4.5:1** contrast ratio for normal-size text (WCAG AA), verified with an actual contrast-checking tool against the real rendered colors, for every such usage introduced or touched by this blueprint — the opening's eyebrow labels, the venture aperture eyebrow/label text, and any existing `.eyebrow` usage on a light surface that this redesign's work touches. This criterion is added explicitly to Phase 3's and Phase 9's completion criteria (Implementation Phases).

**Borders:** `--rule` (existing gold-tinted rgba token) for hairlines; the opening's forking connective line reuses this token, not a new one.

**Radius:** `--radius-sm/md/lg/xl`, unchanged; the new `venture-compact` frame variant uses `--radius-lg`, matching `orac-frame-venture`'s existing radius rather than inventing a new size.

**Image aspect ratios:** standardize on a small set — one full-bleed hero ratio (existing `16/5.35` on `product-hero-image`), one venture-chapter ratio (existing `ImagePanel` default), one compact-aperture ratio for the opening (desktop: `3/4` portrait-leaning per apertures side-by-side; mobile: a wide short band ratio, effectively defined by the ~125px-tall band width at full viewport width). Reduces the layout-shift risk flagged in the audit for ad hoc ratios across `ImagePanel` usages, and is the aspect-ratio set `SafeImage`'s corrected fixed-container/placeholder behaviour (Performance Strategy) reserves space against.

**Button hierarchy:** unchanged — `Button.jsx`'s three variants (`primary`, `secondary`, `ghost`). The opening composition intentionally uses **zero** standalone buttons (the apertures themselves are the CTAs); buttons remain the right pattern everywhere else on the page (venture chapter CTAs, contact CTA).

**Focus states — corrected, not preserved as-is:** the existing focus CSS is not an already-solid baseline to match; it has two confirmed, concrete failures that this blueprint requires fixing, not inheriting.

1. **Primary and secondary/ghost buttons have an insufficiently visible focus indicator.** `.button:focus-visible` (`01-base.css`) does apply a `box-shadow` ring, but it's a flat `rgba(184, 151, 90, 0.14)`/`rgba(184, 151, 90, 0.5)` gold-tinted shadow applied identically regardless of the button's own background — on `.button` (primary, `background: var(--ink)`) the low-opacity ring reads faintly against a dark field; on `.button-secondary`/`.button-ghost` (transparent background, gold-light text) the same low-opacity gold ring has little separation from the button's own already-gold-toned styling. Neither currently guarantees a clearly visible, sufficiently-contrasted focus indicator. **Requirement:** define one consistent focus-ring treatment (an outline or box-shadow with a fixed, sufficient contrast against both light and dark surrounding surfaces — not the same low-opacity value reused unmodified for both) and apply it distinctly to `.button` (primary) and `.button-secondary`/`.button-ghost`, verified visually at each surface the buttons actually appear on (cream/white hero backgrounds, the dark `ContactCTA`/`quote-block` background), not assumed correct because a `:focus-visible` selector already exists in the stylesheet.
2. **`GlobalReach.jsx` creates 30 individual invisible keyboard tab stops.** Confirmed directly in the component: every `Geography` element receives `tabIndex={isHighlighted ? 0 : -1}`, and `highlightedCountries` (`reachData.js`) has 30 entries — so a keyboard user tabbing through the page must step through all 30 highlighted countries individually before reaching the next focusable element after the map. The only focus styling those countries receive (`08-global-reach.css`, `.global-country.is-highlighted:focus` / `.global-country.is-india:focus`) is a `fill`/`filter` color shift identical to the existing `:hover` state — indistinguishable from a mouse-hover, not a real focus indicator, and easy to miss at small SVG-path scale. **Requirement:** redesign this interaction so the map does not force 30 sequential invisible tab stops onto every keyboard user. Do not simply add a visible ring to all 30 stops (that fixes visibility but not the sequential-tab-stop burden). Preferred direction: make the map's individual countries `tabIndex={-1}` (out of the normal tab sequence) and instead expose the highlighted-country list through one already-tab-reachable control — e.g., a single focusable element that reveals a list of the 30 country names as a normal, one-tab-stop-away list or disclosure, with the map itself remaining a visual/pointer-hover feature — so keyboard users get equivalent information (which countries are covered) without 30 sequential stops. Exact mechanism is an implementation-phase decision (Phase 9), not fixed further here, but the "30 invisible tab stops" failure itself must not survive into the redesign unaddressed.

Both fixes extend to the opening's new interactive apertures too — the compact `Frame variant="venture-compact"` apertures must use the same corrected, clearly-visible focus treatment from day one, not the pre-fix baseline.

**Dark-section treatment:** unchanged existing pattern — `product-hero-dark`/`product-hero-light` on venture heroes, `--ink` background on `ContactCTA`/`quote-block`. The opening composition itself stays on the existing light cream/white gradient background, unchanged from `.home-hero`'s current treatment.

---

## 7. Motion System

Ten behaviours, restrained and distinct — not one fade-and-rise repeated everywhere. Each extends the existing `Reveal`/`useReveal`/`ImageReveal` primitives where possible rather than introducing a second reveal system.

### M1 — Hero convergence
- **Purpose:** state "three forces become one" on first arrival.
- **Trigger:** mount of `/`, gated by the session flag (§3).
- **Duration:** ~500ms (forces converge) + ~250ms (wordmark resolves).
- **Easing:** `--ease-smooth` (existing cubic-bezier), with a slight overshoot on the International line only.
- **Elements affected:** the ring, three force shapes, wordmark letterforms.
- **Allowed:** only the homepage opening, only once per session.
- **Forbidden:** anywhere else on the site; never replayed mid-session on repeat visits.
- **Reduced motion:** entirely skipped — resolved state renders instantly (§3).
- **Mobile:** simplified per §3's mobile alternative — no directional travel, color-pulse handoff only.

### M2 — Three-world separation
- **Purpose:** state "ORAC separates into three enterable worlds."
- **Trigger:** immediately follows M1, same mount/session gate.
- **Duration:** ~300ms (fork draw) + ~600ms (three apertures stagger-settle, ~100ms offset each).
- **Easing:** `--ease-smooth`.
- **Elements affected:** the fork SVG path, the three venture apertures.
- **Allowed:** homepage opening only.
- **Forbidden:** elsewhere.
- **Reduced motion:** skipped, resolved instantly.
- **Mobile:** fork simplifies to a vertical tick; apertures use simple `translateY` fade, no scale.

### M3 — World-entry transition
- **Purpose:** signal "you are now entering a distinct world" when navigating from `/` (or elsewhere) into a venture route.
- **Trigger:** route change to `/international`, `/eventus`, or `/luxury-export`.
- **Duration:** 200-260ms.
- **Easing:** `--ease-smooth`.
- **Elements affected:** the outgoing/incoming page cross-fade (extends the existing `RouteFade` component in `App.jsx`, already built and already respecting reduced motion via the global CSS rule).
- **Allowed:** every route transition, site-wide.
- **Forbidden:** never skipped except under reduced motion.
- **Reduced motion:** instant swap, no fade.
- **Mobile:** identical — this transition is cheap enough to need no mobile-specific variant.

### M4 — Typography reveal
- **Purpose:** give headings and eyebrows a small, consistent entrance distinct from photographic content.
- **Trigger:** `IntersectionObserver` via `useReveal`, as today.
- **Duration:** ~560ms (existing `.reveal` transition duration, unchanged).
- **Easing:** `--ease-smooth`.
- **Elements affected:** `<h1>`/`<h2>`/eyebrows/body text wrapped in `Reveal`.
- **Allowed:** every section, exactly as today.
- **Forbidden:** n/a — this is the site's baseline reveal and stays the baseline.
- **Reduced motion:** instant, `opacity: 1; transform: none` (existing rule).
- **Mobile:** unchanged.

### M5 — Image and panel transitions
- **Purpose:** give photography its own, slightly slower entrance than text, reinforcing that imagery carries the "world" feeling.
- **Trigger:** `IntersectionObserver` via `ImageReveal` (existing, already tuned to a slightly wider `rootMargin`/lower `threshold` than `Reveal`).
- **Duration:** existing `ImageReveal` timing, unchanged.
- **Easing:** `--ease-smooth`.
- **Elements affected:** `ImagePanel`/`SafeImage` instances.
- **Allowed:** every section using `ImagePanel`, as today.
- **Forbidden:** n/a.
- **Reduced motion:** instant (existing `.image-reveal`/`.safe-image` rule).
- **Mobile:** unchanged.

### M6 — Atmospheric depth movement
- **Purpose:** a restrained, optional sense of depth on the opening's force shapes only (the glow's soft blur, the folded plane's shadow) — not parallax scrolling anywhere on the page.
- **Trigger:** part of M1, same mount gate.
- **Duration:** part of M1's 500ms window.
- **Easing:** `--ease-smooth`.
- **Elements affected:** the Eventus glow's blur/opacity ramp, the Luxe fold's drop-shadow.
- **Allowed:** the opening sequence only.
- **Forbidden:** no scroll-linked parallax anywhere on the site — the brief explicitly warns against purposeless parallax, and this blueprint introduces none.
- **Reduced motion:** skipped entirely.
- **Mobile:** the blur/shadow may render statically (no ramp) if profiling shows any jank risk on low-end devices — this is the one place mobile may drop a sub-effect rather than simplify it, since it's a supporting detail, not the primary motion.

### M7 — Standard subtle content reveal
- **Purpose:** the site's default, low-key entrance for repeated content (cards, reason panels, leadership tiles, service blocks).
- **Trigger:** `IntersectionObserver` via `Reveal`, staggered by index (`delay={index * 70-90}`, matching existing per-section values).
- **Duration:** existing `.reveal` timing.
- **Easing:** `--ease-smooth`.
- **Elements affected:** `WhyOrac`'s reason panels, `Leadership`'s tiles, venture sub-page service/edition/product grids.
- **Allowed:** everywhere repeated card-like content appears — this is intentionally the "boring," most-repeated pattern on the site, and should stay that way; it is correct precisely because it does not compete with M1/M2's uniqueness.
- **Forbidden:** should not be used for the opening's hero content (that's M1/M2's job) or for the three-world separation itself.
- **Reduced motion:** instant (existing rule).
- **Mobile:** unchanged.

### M8 — Route transitions
- Same as M3 — listed separately here only because the brief's ten-item list names it distinctly; mechanically it is the same `RouteFade` behavior described in M3, not a second system.

### M9 — Returning-visitor behaviour
- **Purpose:** ensure a returning-this-session visitor is never made to wait through the full M1/M2 sequence again.
- **Trigger:** the `sessionStorage` flag check described in §3.
- **Duration:** effectively 0ms for M1 (skipped), a light M7-style stagger (~70-90ms/index) for the three apertures only.
- **Easing:** `--ease-smooth`.
- **Elements affected:** the opening composition only.
- **Allowed:** any `/` visit after the first one in a session.
- **Forbidden:** never re-triggers M1's convergence mid-session.
- **Reduced motion:** identical to first-visit reduced-motion behavior — instant resolved state either way.
- **Mobile:** identical rule.

### M10 — Reduced-motion behaviour
- **Purpose:** guarantee every animation above has a complete, non-degraded, instant alternative.
- **Trigger:** `prefers-reduced-motion: reduce`, checked both via the existing global CSS block (`11-responsive.css`) and, for the opening specifically, via an explicit `matchMedia` JS check at mount (since M1/M2 need to skip *logic*, not just shorten a CSS transition).
- **Duration:** 0ms — every element renders in its final state on first paint.
- **Easing:** n/a.
- **Elements affected:** everything above.
- **Allowed/forbidden:** this rule overrides all others; nothing in this system may ignore it.
- **Mobile:** identical rule, no exception.

---

## 8. Asset Production Plan

No paid assets, no new AI-generated imagery where real ORAC content already exists. Only: existing ORAC assets, original SVG, procedural CSS, and (only for the abstract opening motifs, where no real photograph could substitute) simple code-generated shapes.

| Section | Assets used | Source |
|---|---|---|
| Opening — wordmark/ring | `orac-orange.svg` | `src/assets/logos/` — existing, no change |
| Opening — International force | none (procedural line/vector, `--accent-international`) | Original SVG/CSS |
| Opening — Eventus force | none (procedural glow, `--accent-eventus`) | Original CSS (`filter: blur`) |
| Opening — Luxe force | color values only, sampled from `vault-xiii-palette.jpg` | `src/assets/images/luxe/` — existing real photograph, colors sampled not the image itself |
| Opening — three venture apertures | one real photo each: International from `src/assets/images/international/catalog/`, Eventus from `bridal-entry.webp` or `wedding-couple.webp` (`src/assets/images/eventus/`), Luxe from `fashion-atelier.webp` or a Maison Series look (`src/assets/images/luxe/`, `src/assets/images/maison/looks/`) | existing files, already in the repository |
| International chapter | `internationalImages.hero` (already wired) | existing |
| Global Reach | topojson world map (`public/geographies/countries-110m.json`), no photography | existing |
| Eventus chapter | `eventusImages.hero` (already wired) — **flagged:** this folder's own `README.md` explicitly marks its contents as placeholder ("Replace these image slots with final ORAC Eventus assets"); this blueprint uses them as-is because no final imagery has been supplied, and does not fabricate a substitute | existing, with an open content gap noted, not silently fixed |
| Luxe chapter, Vault XIII, House Editions, Maison Series | existing real photography throughout — already the most complete asset set on the site | existing |
| Leadership | none — no founder/leadership photography exists anywhere in the codebase; this blueprint does not require any (text-only tiles remain correct) | n/a |
| Venture page heroes | existing `internationalImages.hero`/`eventusImages.hero`/`luxeImages.hero`, unchanged | existing |
| ORAC/venture logos throughout | `orac-orange.svg`, `orac-international.svg`, `orac-eventus.svg`, `orac-luxe.svg`, `house-of-azrin.png`, `velorawed-gold.svg` | `src/assets/logos/` — existing, no new logo work needed |

**On the two fully-built but unused components** (`BusinessCard.jsx`, `BusinessDock.jsx`): neither is revived for the opening. `BusinessCard`'s markup (number badge, full logo, separate body with a one-liner paragraph and "Explore" text link, `min-height: 520px`) is sized for a spacious, scrolled-to grid — exactly the model this blueprint moves away from for the first viewport — and compressing it to fit the opening's compact slot would mean stripping most of its own content until it's `BusinessCard` in name only. `BusinessDock`'s content (a `shortName` + `label` text pair, no imagery) is precisely the wrong bar for "each has a distinct visual world" — it was built as a lightweight link list, not a world-introduction. Both remain unused by this blueprint; whether either has a legitimate job elsewhere (e.g., a persistent quick-nav, or a future all-businesses view) is a separate decision, out of scope here, and should not be resolved by force-fitting either into the opening.

**On 3D:** no React Three Fiber or Three.js is used in this blueprint's initial implementation, and none is installed at the start of the project. The opening's forces (a line, a glow, a folded plane) are flat, camera-facing 2D shapes throughout — nothing requires rotation to reveal a hidden face, perspective foreshortening, or a real render loop. The Luxe fold is a `clip-path` crease suggestion, not a physics-simulated drape. This is a 2D compositional problem, not a spatial one, and CSS/SVG is the approved, expected way to deliver it. This is not, however, a permanent prohibition decided sight-unseen: Phase 7 (Implementation Phases) is the explicit, later checkpoint where the *built and running* CSS/SVG result is actually judged against the intended depth/cinematography — 3D is neither pre-approved nor ruled out before that review happens. `InteractiveImage.jsx`'s existing pointer-tilt effect on Maison category pages (already built without any 3D library) remains the site's one "dimensional-feeling" interaction today and needs no change regardless of Phase 7's outcome.

---

## 9. Performance Strategy

Moved earlier in the implementation sequence than the original spec had it (see Implementation Phases, Phase 2), since the opening now carries above-the-fold image weight it didn't before.

- **WebP/AVIF conversion:** the audit's flagged 280-560KB JPGs (International catalogue photography, `maison-collage.jpg`, `coir-fiber.jpg`, etc.) are re-exported as WebP (matching the format already used for most of the `international/` and `eventus/` folders) before or during the opening's build-out, not after — these are exactly the kind of assets now promoted to above-the-fold use in the opening's venture apertures.
- **Responsive image sizes:** add `srcset`/`sizes` to `SafeImage` for the three opening apertures specifically, since they render at a much smaller display size on mobile (a ~125px-tall band) than desktop (a full aperture) — serving the same full-resolution source to both is wasteful precisely where it now matters most (first paint).
- **Lazy-loading strategy:** unchanged everywhere except the opening — the three venture apertures and the wordmark are the only above-the-fold images on the homepage and should be `priority`/eager; everything below (venture chapters, gallery images) keeps `SafeImage`'s existing lazy default.
- **Placeholder strategy — corrected, not merely preserved:** `SafeImage`'s existing `onError` fallback-to-labelled-placeholder pattern (confirmed zero broken images at every tested breakpoint today) is preserved **for actual loading errors only** — that part is not being changed. But `SafeImage` today has no answer for the *normal, successful* loading window: it currently renders `<img className="safe-image">` at `opacity: 0` (via the existing `.safe-image { opacity: 0 }` / `.safe-image.is-loaded { opacity: 1 }` rule in `01-base.css`) with no fixed-aspect-ratio container reserving its space and no interim visual — so a lazy-loaded or slow-decoding image currently presents as a blank gap (zero reserved height where no aspect-ratio wrapper exists, or an empty colored box where one does) until `onLoad` fires, not a graceful loading state. That gap is corrected here, and the work moves into Phase 2 (Cleanup and performance foundation) rather than staying deferred:
  - **Fixed aspect-ratio container:** every `SafeImage` usage is wrapped (or wraps itself) in a container with a defined `aspect-ratio` matching the image slot it fills (per the aspect-ratio set defined above), so layout space is reserved before the image decodes — eliminating layout shift, not just visual blankness.
  - **Dominant-colour, skeleton, or low-resolution preview while loading:** the container shows a dominant-color fill (sampled per-image at build/data time, or a fixed neutral tone consistent with the surrounding section) or a simple skeleton treatment during the load window — never a bare blank/empty box.
  - **Controlled opacity transition on decode:** the existing `opacity: 0 → 1` / `is-loaded` mechanism is kept as the mechanism for the final crossfade once the real image decodes — this part of today's implementation is correct and is extended, not replaced.
  - **Labelled fallback only for genuine errors:** the existing `safe-image-fallback` labelled-placeholder box remains reserved for `onError` (missing/broken asset) exactly as today — it must not be reused as the *loading* placeholder; loading and erroring are now two visually distinct states, where today they are not clearly differentiated from a blank result.
- **Above-the-fold preload rules:** add a `<link rel="preload">` for the wordmark SVG and the three venture aperture images specifically (a genuine change from today, where only the wordmark had `fetchpriority="high"` and the venture images were below-the-fold and not preloaded).
- **Mobile fallbacks:** none of the opening's motion requires a heavier asset on mobile than desktop — if anything, mobile's simplified sequence (§3) needs less, not more.
- **Optional 3D loading:** not applicable — no 3D is used anywhere in this blueprint (see Asset Production Plan), so there is no 3D bundle to lazy-load or gate.
- **Route-level loading:** unchanged — no loading screen is introduced (the brief explicitly warns against one added "only for appearance," and nothing in this blueprint needs one).
- **Font strategy:** unchanged — two Google Fonts (`Cormorant Garamond`, `Jost`), no new family added.
- **Performance budgets:** re-verify `npm run build`'s `dist/` size at the end of every implementation phase (already a fast, cheap check per the audit); target a meaningful reduction from the audit's ~19MB baseline once the JPG-to-WebP conversion lands, and confirm the JS bundle (currently 132.85KB gzip, no new dependency added by this blueprint) does not meaningfully regress.

---

## 10. Responsive Experience

- **Large desktop (1440px+):** full expression — the three-zone opening at its most generous proportions, three-column venture chapters where applicable, full-width Global Reach map.
- **Laptop (1024px):** identical structure to 1440px, tighter spacing — the opening's three apertures still comfortably fit one row at this width (three items, not four, per the existing spec's own correct observation that three fits where four wouldn't).
- **Tablet (768px boundary):** the existing nav mobile-menu switch already happens here (confirmed in `Navbar.jsx`); the opening's three-venture row becomes a vertical stack at or before this width (matching the existing `.venture-frame-grid` single-column switch at ≤820px), and venture chapter compositions become single-column, both already-correct existing behaviors.
- **393px mobile:** see First Viewport Specification's mobile section — full recomposition, tagline kept at one line, apertures become full-width bands.
- **360px mobile:** see the explicit verified arithmetic in First Viewport Specification — this is the binding tightest case; the tagline is dropped entirely at this width, and label content overlays the scrim rather than sitting in a separate row, which is the specific mechanism that makes the zero-scroll requirement close.

Mobile throughout is a genuine recomposition — new proportions, a new compact frame variant, a different label placement (overlay vs. stacked) — not a shrunk copy of the desktop layout, consistent with the confirmed decision and the brief's explicit rule.

---

## 11. Final Implementation Phases

### Phase 1 — Content and factual corrections
- **Goal:** resolve the open naming/wording questions before any visual work touches copy, so later phases don't have to redo text.
- **Likely files:** `companyData.js` (reconcile "industrial fibres" vs. "natural fibres" wording inconsistency between `purpose` and `summary`/`Home.jsx` text — confirm correct wording with the user, do not silently pick one), a decision on "ORAC Holding" vs. "ORAC Holdings" (per Decisions item 1 — do not change without explicit confirmation), a decision on "Businesses"/"Companies"/"ventures" terminology (Decisions item 3).
- **Must not change:** any factual claim not explicitly confirmed by the user; do not invent a resolution to a pending decision.
- **Completion criteria:** every pending decision in `ORAC-DECISIONS.md` relevant to copy is either confirmed or explicitly deferred with the user's knowledge.
- **Testing:** none beyond a copy review; no visual change yet.
- **Model/reasoning:** a lighter-weight pass is sufficient — this is fact-checking and user confirmation, not design work. Sonnet at standard effort.

### Phase 2 — Cleanup and performance foundation
- **Goal:** resolve every confirmed dead-weight and asset-hygiene finding from the audit in one pass, and get the asset/placeholder pipeline (WebP conversion, `srcset`, `SafeImage`'s corrected loading behaviour) in place before the opening adds above-the-fold image weight — this phase is now the single place all of the audit's "known, verified, safe-to-clean" findings are resolved, not just the image-compression piece.
- **Scope, verified directly against the current repository (not restated from memory) — six items:**
  1. **Remove unused components and their orphaned CSS, after reconfirming zero references.** Directly re-verified for this update: `src/components/common/BusinessCard.jsx` and `src/components/common/BusinessDock.jsx` have zero import references anywhere in `src` outside their own files — confirmed unused. (Note: this is two confirmed-unused components, not four as a prior instruction assumed; `BusinessSwitcher.jsx` and `InteractiveImage.jsx` were also checked in the same pass and are both actively used — in `Navbar.jsx` and `MaisonCategory.jsx` respectively — and must not be removed. If a fuller sweep at implementation time finds two further genuinely unused components beyond these two, remove those as well under the same "reconfirm zero references first" rule; do not assume a specific count without re-checking against the codebase as it exists at that time.) Removing `BusinessCard`/`BusinessDock` also removes their now-orphaned CSS in `03-hero.css`/`04-sections.css` and the two related breakpoint overrides in `11-responsive.css`.
  2. **Remove the unused `prop-types` dependency.** Confirmed: `prop-types` is listed in `package.json` and has zero usage (`PropTypes`/`prop-types` does not appear anywhere in `src`) — remove from `package.json` and reinstall to update the lockfile.
  3. **Remove confirmed orphaned International images.** Directly re-verified for this update: `src/assets/images/international/` contains **33** flat-level `.webp` files (one directory level up from `catalog/`) with zero references anywhere in `src` — `internationalImages.js` sources exclusively from `catalog/*.jpg` via `import.meta.glob`, never these flat files. (Note: this is 33 by direct re-count, not 32 as a prior instruction assumed — re-verify the exact file list at implementation time before deleting, since a one-file discrepancy is worth resolving with a fresh `find`/`ls` pass rather than trusting either number blindly.) Delete only after confirming, at implementation time, that no in-progress uncommitted work depends on them.
  4. **Resolve duplicate product-image sources.** Confirmed: several of the orphaned flat `.webp` files and the wired `catalog/*.jpg` files depict the same real subjects under different filenames/formats — e.g. `cardamom.webp`/`cardamom.jpg`, `cashews.webp`/`cashew-nuts.jpg`, `coir-fibre.webp`/`coir-fiber.jpg`, `coriander-seeds.webp`/`coriander-seeds-powder.jpg`, `cumin-seeds.webp`/`cumin-seeds-powder.jpg`, `kidney-beans.webp`/`kidney-beans.jpg`, `onions.webp`/`onions.jpg`, `red-chilli-powder.webp`/`red-chilli-powder.jpg`, `sesame-seeds.webp`/`sesame-seeds.jpg`, `soybean.webp`/`soya-beans.jpg`, `tamarind.webp`/`tamarind.jpg`, `turmeric-powder.webp`/`turmeric-powder.jpg` — the same product photographed twice into two separate, disconnected asset folders, only one of which is live. Resolving this is the same action as item 3 (removing the orphaned side) plus confirming the remaining `catalog/` source is the correct one to keep for each overlapping subject, not a separate migration.
  5. **Optimise the active JPG assets.** The audit's originally-flagged 280-560KB JPGs — `maison-collage.jpg`, `coir-fiber.jpg`, `used-beverage-cans-scrap.jpg`, `millets.jpg`, `red-chilli-powder.jpg`, `turmeric-powder.jpg`, and the further ~18 product JPGs in the same size range — re-exported as WebP (matching the format already used for most of the `international/` and `eventus/` folders), since these are exactly the assets now promoted to above-the-fold use in the opening's venture apertures.
  6. **Add responsive image support and proper loading placeholders.** `srcset`/`sizes` support added to `SafeImage`, plus the full corrected placeholder behaviour specified in Performance Strategy above (fixed aspect-ratio container, dominant-colour/skeleton preview, controlled opacity transition on decode, labelled fallback reserved for genuine errors only) — this is not a smaller version of that requirement, it is the same requirement, scheduled into this phase rather than left implicit.
- **Likely files:** `package.json`/lockfile (`prop-types` removal), `src/components/common/BusinessCard.jsx`, `src/components/common/BusinessDock.jsx` (deleted), `src/styles/partials/03-hero.css`, `04-sections.css`, `11-responsive.css` (orphaned CSS removal), `src/assets/images/international/*.webp` (the 33 flat-level files, deleted after re-confirmation), `src/assets/images/international/catalog/*.jpg` (re-exported to WebP), `src/components/common/SafeImage.jsx` (aspect-ratio container, placeholder, `srcset`/`sizes`).
- **Must not change:** any visual layout beyond what the placeholder/aspect-ratio work itself introduces by design; `BusinessSwitcher.jsx`, `InteractiveImage.jsx`, or any other component confirmed still in use; any `catalog/` asset that is the correct surviving source for a duplicated subject.
- **Completion criteria:** `dist/` size meaningfully reduced from the ~19MB baseline; `npm run build`/`npm run lint` clean; zero visible quality loss on spot-check; `prop-types` absent from `package.json`; zero orphaned CSS remaining for the removed components (verified by search, not assumed); `SafeImage` renders a reserved-space, non-blank loading state for every image on a throttled-network manual check.
- **Testing:** before/after `dist/` size comparison, visual spot-check for compression artifacts, a full-repo reference search confirming zero remaining imports of anything deleted, a throttled-network (e.g. devtools "Slow 3G") manual check that no image ever presents as a blank gap while loading.
- **Model/reasoning:** Sonnet, standard effort — mechanical, well-defined work, but re-verify every count (unused components, orphaned images) against the live repository at implementation time rather than trusting either this document's numbers or any prior instruction's numbers without a fresh check, since a small discrepancy was already found once during this correction pass.

### Phase 3 — Design-system corrections
- **Goal:** add any new tokens the opening needs (the compact frame variant's sizing, if it needs a value not already in `variables.css`), introduce the corrected `--gold-text` token (Design System, Text-safe gold usage), and reconcile `GlobalReach.jsx`'s duplicated hardcoded map colors into a single token source — without touching any page's *layout* yet, though `--gold-text` swapping into existing light-background `.eyebrow` usages is an explicit, in-scope exception to "no rendered-output change" (see completion criteria).
- **Likely files:** `src/styles/variables.css` (new `--gold-text` token), `src/styles/partials/03-hero.css` (swap `.home-hero .eyebrow`, `.product-hero-dark .eyebrow`, `.contact-heading .eyebrow` and any other light-surface `.eyebrow` rule from `--gold` to `--gold-text`), `src/components/common/GlobalReach.jsx`, `src/styles/partials/08-global-reach.css`.
- **Must not change:** every existing token's current value (tokens are added/reconciled, not altered in place); every existing page's layout/structure; any use of `--gold` on a dark surface or as a non-text/decorative element, which is out of scope for this correction.
- **Completion criteria:** `npm run build` succeeds; visual diff of all 6 routes at all 4 breakpoints shows zero *layout* change; **every text usage of gold on a `--cream` or `--white` background measures a minimum 4.5:1 contrast ratio, checked with an actual contrast-checking tool against the real rendered colors** (this is the binding criterion from Design System's Text-safe gold usage correction, not a generic "pass a contrast check" placeholder); the reconciled `GlobalReach` map colors pass the same AA bar before use.
- **Testing:** build + lint + before/after screenshot comparison (confirming only the intended gold-to-gold-text swaps changed, nothing else) + a contrast-checker run against every touched `.eyebrow`/label usage.
- **Model/reasoning:** Sonnet, standard effort.

### Phase 4 — Static homepage implementation
- **Goal:** build the opening's static (no-animation) end-state — `OriginSequence` component, the compact frame variant, the three apertures, the fork geometry — rendering correctly at rest, before any motion is added.
- **Likely files:** `src/sections/HomeHero.jsx` (or a new `src/sections/OriginSequence.jsx` it renders), `src/components/common/Frame.jsx` (new `venture-compact` variant), `src/styles/partials/03-hero.css`, `src/pages/Home.jsx` (remove `CompanyPortfolio` import/render per Page Architecture).
- **Must not change:** `companyData.js` content; the routes each aperture links to; any section below the opening.
- **Completion criteria:** the verified 360×640 arithmetic (First Viewport Specification) holds on a real or emulated device at that exact size — all three ventures visible, zero scroll; no horizontal overflow at any of the four required breakpoints.
- **Testing:** build, lint, browser check at 1440/1024/768/390, plus an explicit 360×640 check (not just 390-width).
- **Model/reasoning:** this is the single most visually consequential phase in the plan — Opus at high reasoning effort, given the layout-arithmetic precision required and the risk of silently regressing the first-viewport requirement.

### Phase 5 — Static business-world refinement
- **Goal:** apply each venture's distinct visual language (Design System §4/§6) to `VentureChapter` instances and confirm the venture sub-pages' Frame-at-open treatment, without touching any sub-page's deeper sequence.
- **Likely files:** `src/sections/VentureChapter.jsx`, `src/pages/OracInternational.jsx`, `src/pages/OracEventus.jsx`, `src/pages/LuxuryExport.jsx` (top-of-page only).
- **Must not change:** the entire Vault XIII/House Editions/Maison Series sequence on Luxe; the product carousel/process timeline functionality on International/Eventus.
- **Completion criteria:** each venture reads as visually distinct per §4 while sharing the frame/typography/motion system; zero change below each page's hero.
- **Testing:** build, lint, browser check at all 4 breakpoints, diff confirmation nothing below each hero changed.
- **Model/reasoning:** Sonnet at high effort — mostly additive/cosmetic on already-solid pages, but touches three separate route files.

### Phase 6 — Motion-system implementation
- **Goal:** add the actual M1-M10 motion behaviours (§7) on top of the static structure from Phases 4-5 — the convergence, the separation, the session flag, the reduced-motion check.
- **Likely files:** the new `OriginSequence` component (add animation logic), a new small hook (e.g. `useOnce.js`, alongside the existing `useReveal.js`), `src/App.jsx` (`RouteFade`, if any tuning is needed), `src/styles/partials/03-hero.css` and `11-responsive.css` (transition/keyframe rules, extending the existing `prefers-reduced-motion` block).
- **Must not change:** the static layout from Phase 4 — motion should not require new markup beyond small wrapper elements.
- **Completion criteria:** full sequence plays once per session and matches the described timing; reduced-motion renders the complete end-state instantly with no flash; mobile sequence is genuinely simplified, not just faster.
- **Testing:** manual timing check (stopwatch/devtools performance panel) against the ~1.6-1.9s desktop / <1.5s mobile targets; reduced-motion emulation check in devtools; session-storage behavior check (first load vs. repeat navigation).
- **Model/reasoning:** Opus at high reasoning effort — motion sequencing bugs are easy to introduce and easy to miss without careful frame-by-frame verification.

### Phase 7 — 3D evaluation gate (not pre-approved, not permanently ruled out)
- **Goal:** this phase is neither "skip" nor "build" — it is a decision point that only happens *after* Phase 6's CSS/SVG motion sequence is complete and has been reviewed in the browser. CSS and SVG remain the approved first implementation (Asset Production Plan, §8) and no 3D dependency is installed at the start of this phase or at any point before it. The question this phase answers is: does the completed, running CSS/SVG convergence/separation sequence already deliver sufficient depth and cinematography on its own merits, viewed as built rather than as designed?
- **Procedure:**
  1. Review the Phase 6 implementation live in the browser, across desktop and mobile, against the blueprint's own intent for the opening (§1-§3): does it read as cinematic, does the depth/material distinction between the three forces land, does it feel authored rather than flat.
  2. If it demonstrably meets that bar — the default expectation, given the 3D evaluation in Asset Production Plan §8 found no part of this specific concept structurally requires 3D — this phase closes with no 3D work performed and no dependency added.
  3. Only if the reviewed result demonstrably falls short of the intended depth/cinematography **in a way CSS/SVG adjustments cannot reasonably close** may one lightweight 3D proof of concept be considered for the specific element that falls short — not a wholesale re-implementation of the opening, not a speculative exploration of what 3D could add in the abstract. Any such proof of concept must specify, before any dependency is installed: which single element it targets, what mobile behavior it falls back to, what its reduced-motion behavior is, and what its static (JS-disabled or load-failure) fallback is — a 3D PoC with no mobile/reduced-motion/static fallback plan does not meet this phase's bar for consideration.
  4. Either outcome (close with no 3D, or scope one bounded PoC) must be reported back to the user before proceeding — this phase's outcome is a decision to surface, not one to make silently in either direction.
- **Likely files:** none if closed at step 2; if a PoC is scoped at step 3, files depend entirely on which element is targeted and cannot be predicted here.
- **Must not change:** no 3D dependency is added to `package.json` before this phase's review step has actually happened; CSS/SVG remains the shipped implementation unless step 3's bar is genuinely met.
- **Completion criteria:** a documented outcome (close, or a scoped PoC brief) exists; if closed, confirmed no 3D library appears in `package.json`; if a PoC is scoped, it includes explicit mobile, reduced-motion, and static fallback definitions before any code is written.
- **Testing:** browser review of the Phase 6 result (the actual "testing" this phase performs is evaluative, not automated) plus, if a PoC proceeds, whatever testing that bounded PoC's own scope requires.
- **Model/reasoning:** Opus at high reasoning effort for the evaluation itself — judging "does this already deliver enough" against the original creative intent is a qualitative call, not mechanical verification.

### Phase 8 — Mobile refinement
- **Goal:** dedicated pass re-verifying the 360×640 and 390px arithmetic on real or closely-emulated devices, and fixing anything the earlier phases' assumptions got wrong at these exact sizes.
- **Likely files:** `src/styles/partials/11-responsive.css`, the opening component's mobile-specific classes.
- **Must not change:** desktop/tablet behavior already verified in Phases 4-6.
- **Completion criteria:** all three ventures visible with zero scroll at 360×640 and at 393px on a real device (not just emulation) — if the arithmetic in §2 didn't hold in practice, apply the fallback order specified there and flag it to the user.
- **Testing:** real-device testing if available; devtools device emulation at minimum, explicitly including 360×640, not only the standard 390-wide presets.
- **Model/reasoning:** Sonnet at high effort — precise, verification-heavy work, not exploratory design.

### Phase 9 — Accessibility and SEO
- **Goal:** confirm keyboard/focus/contrast on every new interactive element (the three apertures, any new nav accents), **fix the two confirmed pre-existing focus-accessibility failures this blueprint identified (Design System, Focus states correction) rather than assuming existing focus behaviour is already correct**, and confirm the reduced-motion path is a fully accessible substitute, not a lesser one.
- **Likely files:** the opening component, `src/styles/partials/01-base.css` (the shared `:focus-visible`/`.button:focus-visible` rule — needs a corrected, sufficiently visible treatment distinct for primary vs. secondary/ghost buttons), `src/components/common/GlobalReach.jsx` and `src/styles/partials/08-global-reach.css` (the 30-tab-stop redesign), `src/App.jsx` (`pageTitles` — also close the existing gap where `/luxury-export/:categorySlug` falls through to the generic title).
- **Must not change:** existing keyboard/focus behavior that is genuinely already correct and not part of the two confirmed failures (e.g. the skip-link focus treatment, the desktop-nav/mobile-menu focus-visible rules) — this phase fixes the two named failures, it does not imply every other existing focus behaviour also needs rework.
- **Completion criteria:** every new interactive element is reachable and clearly focused via Tab; **`.button`/`.button-secondary`/`.button-ghost` each have a corrected, clearly visible focus indicator verified on every surface they actually appear on (light hero backgrounds and the dark `ContactCTA`/`quote-block` background) — not the pre-existing low-opacity shared ring left unmodified**; **`GlobalReach.jsx`'s world map no longer forces 30 sequential invisible/indistinguishable tab stops on keyboard users — verified by an actual Tab-key walkthrough counting stops before and after, not by inspecting the CSS alone**; contrast-checked accent colors and the new `--gold-text` usages pass WCAG AA (4.5:1 for normal text) against both `--cream` and `--ink` as appropriate to where each is used; reduced-motion users get complete content, not a degraded experience; Maison category pages get real per-category document titles.
- **Testing:** keyboard walkthrough (Tab/Escape/Arrow) — including an explicit count of Tab presses required to pass the Global Reach section before and after the fix — automated contrast check, reduced-motion emulation.
- **Model/reasoning:** Sonnet at high effort — meticulous checklist work.

### Phase 10 — Final QA
- **Goal:** full regression pass across all 6 routes at all 4 breakpoints (plus the explicit 360×640 case), matching this blueprint's acceptance criteria end to end.
- **Likely files:** none expected — fixes only, scoped to whatever this pass surfaces.
- **Must not change:** nothing new introduced here.
- **Completion criteria:** zero horizontal overflow, zero broken images, zero console errors at all required breakpoints across all routes; `npm run build`/`npm run lint` both clean; the first-viewport requirement holds at every required size, verified, not asserted.
- **Testing:** the same programmatic checks used in the original audit (DOM overflow/broken-image measurement, console capture), repeated across the full route list, plus a final human visual pass.
- **Model/reasoning:** Sonnet at high effort — this is a safety net, not where new problems should first surface if earlier phases held to their own criteria.

---

**Experience blueprint completed. No source-code or existing repository files were modified — the only change made to the repository was the addition of this new file, `docs/ORAC-EXPERIENCE-BLUEPRINT.md`.**
