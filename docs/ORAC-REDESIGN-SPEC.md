# ORAC Redesign Specification

**Status: proposed, not approved. Do not begin implementation against this document until the user has reviewed and approved it.**

This is a plan, not code. It is grounded in the actual current implementation described in [ORAC-CURRENT-AUDIT.md](ORAC-CURRENT-AUDIT.md) and the confirmed direction in [ORAC-CREATIVE-BRIEF.md](ORAC-CREATIVE-BRIEF.md) / [ORAC-DECISIONS.md](ORAC-DECISIONS.md).

---

## 1. Central concept

**The proposed recurring visual device: the ORAC Frame.**

A single rectangular aperture — first seen full-bleed at the top of the homepage — is the one visual object that recurs everywhere the site needs to signal "you are entering a world." It does not move around the page as a literal animated character; it recurs as a **position and proportion**, so it can be built with the site's existing primitives rather than a new animation system.

- **On the homepage opening:** the frame holds the ORAC identity alone — no photography inside it yet, just the wordmark and the origin statement. This replaces today's centred logo/tagline/button hero (see audit §3, §5) with the same restraint but a deliberate container around it, so the very first thing a visitor learns is "there is a frame, and things will appear inside it."
- **At the venture-emergence moment:** the single frame becomes four smaller frames (a CSS grid/transform, not a canvas or WebGL effect), each one now holding a still image and name from one venture. This is the "one form separating into four paths" mechanism named in the brief, chosen over the alternatives (transforming frame alone / portal / pathway) because it maps directly onto content the site already has in exactly this shape — `BusinessCard`'s existing image + logo + name structure — and can be built by evolving that component rather than inventing a new one.
- **On each venture page:** that venture's frame reappears at the top, at a consistent position, now full-bleed, holding that venture's hero image. The frame's *internal treatment* (crop ratio, border weight, motion on scroll, colour cast) changes per venture — this is where "distinct worlds" is expressed — but the frame's *position in the layout rhythm* stays constant, which is what keeps the site feeling like one system rather than four unrelated microsites.
- **On chapter-to-chapter transitions within a venture page** (e.g. moving from International's founder section into its product catalogue): a thin variant of the frame — a rule/border, not a full image container — marks each new chapter's start, echoing the same aperture idea at low intensity rather than reintroducing it at full force every time.

**Why this and not the alternatives:** a transforming *material* system (fabric/metal/paper per venture) was considered but rejected as the primary device — it fits Luxe well but strains for International/Evolution and risks becoming decorative rather than structural. A literal *pathway/line* was considered and is folded in as a **secondary, supporting motif** (§4), not the primary device, because the current design already has a `--rule` token and gold rule elements that can extend this idea cheaply without competing with the frame for attention.

This concept must remain singular. Nothing in this spec introduces a second, competing "big idea."

## 2. Visitor journey

Homepage progression (7 stages, matching the brief's required progression):

1. **Origin** — full-bleed frame, ORAC wordmark and one line of positioning copy inside it. No leadership, no cards, no venture names yet. Shorter than today's hero (today's hero already has a business dock and two CTAs competing for attention in stage 1 — those move to stage 2/3).
2. **Expansion** — the single frame separates into four (International / Eventus / Luxe / Evolution — see §4 for how Evolution is handled given it doesn't exist yet). Each mini-frame shows a still image, the venture name, and nothing else. This replaces today's `CompanyPortfolio` card grid in position, but not necessarily in component — `BusinessCard` can evolve into this rather than being replaced outright (see §11).
3. **Exploration — venture chapters** — each venture gets a full-viewport-height (or near it) chapter: one distinct composition, drawing on that venture's real content (International's product photography, Eventus's real event/VELORAWED photography, Luxe's Vault XIII palette and Maison Series imagery). This is where today's `InternationalPreview`/`EventusPreview`/`LuxePreview` (currently three near-identical `editorial-section` split layouts — audit §3, §5) are replaced with three *visually distinct* but *structurally consistent* chapters.
4. **Connection** — a short, deliberately quiet moment that states (visually, not necessarily in a headline) that these are one ecosystem — this is where the current `GlobalReach` map can stay, repositioned, since it already is the one section that visually ties the ventures to one shared origin (India) and shared reach.
5. **Credibility** — a trust/value section. Today's `WhyOrac` (5 reason-panel cards) can stay here, roughly in place, with lighter visual treatment than the venture chapters so it reads as support material, not another chapter.
6. **Leadership** — moved out of stage 1 (today it's in `HoldingIntro`, immediately after the hero — audit §3) to here, after value has been established, per the brief and the confirmed decision.
7. **Continuation** — the existing `ContactCTA` pattern, kept.

## 3. Global shell

- **Navigation:** keep `Navbar`'s current functional behaviour (keyboard support, focus handling, mobile menu, solid-on-scroll) — audit confirms it works correctly at every breakpoint. Add: a subtle per-venture accent (not a full colour-scheme change) when on a venture route, so the "which world am I in" signal exists in the shared header without fragmenting it into four different navbars.
- **Parent-brand presence:** the ORAC wordmark stays the permanent top-left anchor on every page, including venture pages — this is the one constant that proves "multiple worlds, one origin" without saying it in words.
- **Venture indicators:** the existing `BusinessSwitcher` dropdown is sufficient functionally; it needs the same per-venture accent treatment as the nav, applied to its four (once Evolution exists) entries.
- **Page transitions:** currently instant (React Router swaps with no transition — audit §2). Propose a brief, consistent cross-fade (200–260ms, respecting `prefers-reduced-motion`) on route change, implemented as a small addition to `PageShell`/`ScrollManager` — not a new dependency, not a loading screen.
- **Footer:** keep structurally; extend the "Businesses" column to include Evolution once it exists, and resolve the Businesses/Companies/ventures naming (pending decision) before or during this milestone.
- **Loading behaviour:** not needed. Nothing in the current build justifies a loading screen (brief explicitly warns against one added "only for appearance").
- **Route continuity:** keep all 6 existing routes and their URLs unchanged; this redesign is a presentation change, not an information-architecture change.

## 4. Venture worlds

Each venture keeps the frame-at-top structural constant (§1) but differs in:

**ORAC International** — global movement, routes, precision. Visual language: the frame holds product photography (already extensive and real — audit §7) with a restrained, precise crop; secondary motif is the existing `GlobalReach` map's line/route language, extended subtly into this chapter (e.g. a single thin route-line accent, not a second map). Typography: slightly tighter tracking, more "manifest/ledger" in feeling for labels (product tags, origins) which the data already supports (`spec`, `origin` fields in `internationalData.js`).

**ORAC Eventus × VELORAWED** — memory, emotion, human moments. Visual language: the frame holds real event/VELORAWED photography (audit confirms 27 real images render with 0 errors today); motion here can lean slightly warmer/slower than International's (still within the one shared motion system — see §8) since the content is emotional rather than operational. The existing VELORAWED sub-brand section stays structurally distinct (it already is — `EventusVelorawedSection.jsx`) but adopts the frame device at its own entry point.

**ORAC Luxe × The House of Azrin** — fabric, form, craft. This venture already has the most chapter-like structure on the site today (Vault XIII, House Editions, Maison Series — audit §6), built in a prior session. Propose the *least* structural change here: apply the frame device at the top of `/luxury-export` for consistency, but preserve the Vault XIII / House Editions / Maison Series sequence largely as-is, since it already satisfies most of the brief's Luxe requirements (fabric/texture/craft language, no generic e-commerce styling, real founder/story content).

**ORAC Evolution** — emergence, possibility. **Does not exist today** (audit §5). Two honest options, to be decided by the user before milestone 8:
- (a) Add a minimal placeholder chapter now — frame present, restrained "in progress" statement, no invented services — so the "four worlds" promise in the opening (§2, stage 2) is truthful; or
- (b) Keep the opening/expansion sequence at three worlds until Evolution has real content, and design the expansion moment so a fourth frame can be added later without reworking the mechanism.

This spec does not choose between (a) and (b) — it is listed in §14 as a required decision before milestone 8 begins.

**Connective tissue across all four:** the frame's position and entry animation, the shared nav, the shared typography system, and the gold-as-accent (not gold-as-strategy) rule apply identically everywhere. Nothing about a venture's distinct treatment should require a different component library, a different motion system, or a different container width.

## 5. Typography system

Keep the existing two-family system (`Cormorant Garamond` display, `Jost` body) — audit confirms it is already used with discipline and is properly loaded (Google Fonts, `index.html`). No new fonts are justified by anything in the brief or audit.

- **Display:** reserved for the ORAC wordmark, venture names at chapter openings, and section-level statements. Scale should grow slightly at the true opening (stage 1) relative to today's hero, since that moment now carries more weight alone.
- **Body:** `Jost`, kept at current sizes — audit found no readability issues.
- **Hierarchy:** eyebrow (existing `.eyebrow` pattern — gold, small caps, tracked) → display heading → body → metadata/labels (existing `<small>` pattern). This hierarchy already exists and works; the redesign should not invent a parallel one.
- **Line lengths:** keep the existing `--max-narrow: 840px` constraint for body copy blocks — audit found no evidence of unreadable line lengths today.
- **Responsive behaviour:** keep the existing `clamp()`-driven fluid type (confirmed in `variables.css` spacing scale; type sizes should follow the same `clamp()` approach if not already doing so per-component).
- **Metadata/labels:** keep the existing small-caps/tracked-letter-spacing treatment for product tags, contact "kind" labels, etc.

## 6. Colour and material system

- **Parent ORAC palette:** keep `--ink`, `--cream`, `--white`, `--gold` family as the base — audit confirms these are used consistently today.
- **Venture-specific accents:** introduce one additional accent variable per venture (e.g. `--accent-international`, `--accent-eventus`, `--accent-luxe`, `--accent-evolution`), used sparingly — a rule line, a hover state, the nav indicator (§3) — never as a full background recolour of a venture page. This directly answers the brief's "gold may remain a controlled accent but must not be the entire luxury strategy" requirement by giving each world a second, quieter signal beyond gold.
- **Role of gold:** stays as the shared ORAC accent (rules, eyebrows, focus states) across all four worlds — it signals "this is ORAC," while the new per-venture accent signals "this is which world."
- **Contrast:** keep the existing dark/light hero pattern (`product-hero-dark`/`product-hero-light` in `Hero.jsx`) — it already gives venture pages a way to vary mood without a new mechanism.
- **Background transitions:** the frame-to-four-frames moment (§2 stage 2) is the one place a background shift should be deliberate and slow; elsewhere, keep the current cream/white/ink system.
- **Material/texture treatment:** Luxe already has a material vocabulary (Vault XIII swatches, fabric photography). International and Eventus do not need invented textures — their "material" is their real photography, which is sufficient per the brief ("avoid decorative 3D objects unrelated to the businesses").

## 7. Image system

- **Ratios:** standardise a small set of frame ratios (e.g. one full-bleed hero ratio, one "chapter" ratio, one card ratio) rather than the current mix of ad hoc ratios across `ImagePanel` usages — reduces layout-shift risk and gives the frame device a consistent silhouette.
- **Cropping:** precise, subject-aware crops for product/event/fashion photography — already the practice for the Maison Series look photography (audit §6); extend the same discipline to International's catalogue images, several of which are used at their raw aspect ratio today.
- **Layering:** limited, intentional — e.g. a caption or label overlapping a frame edge (extends the existing `image-panel-copy` overlay pattern) rather than multi-image collage stacks.
- **Product cut-outs:** the brief's ORAC International section (in the prior `CLAUDE.md`, not the newly confirmed brief — see Decisions item 3) suggested floating cut-out product visuals. This is **not required** by the newly confirmed brief and is flagged as optional/pending rather than planned.
- **Event imagery:** use the existing real VELORAWED/Eventus photography as-is; no new imagery required for milestone 6.
- **Fashion imagery:** the Maison Series photography (now present, per audit §7/§8) is sufficient for milestone 7; Vault XIII and House Editions may still need a dedicated image each (see §14).
- **Responsive image behaviour:** keep `SafeImage`'s existing `loading`/`decoding`/`fetchpriority` handling; add `srcset`/responsive sizing as part of the performance milestone (§13, milestone 10) given the asset-size findings in the audit.
- **Missing asset requirements:** see §14.

## 8. Motion system

- **Page transitions:** add the single cross-fade described in §3 — the only new *route-level* motion in this spec.
- **Chapter transitions (within a page):** the frame/rule motif (§1) handles this visually; no scroll-hijacking, no pinned sections.
- **Scroll behaviour:** keep the existing `IntersectionObserver`-driven reveal (`useReveal`/`Reveal`/`ImageReveal`) as the base primitive — it already exists, already respects a timeout fallback, and already has zero dependency cost. Extend it with venture-specific `rootMargin`/`threshold`/`delay` tuning where a chapter needs a different pace, rather than building a second reveal system.
- **Hover behaviour:** keep existing button/link/card hover states; the frame device may gain a subtle hover state on the four-frames moment (stage 2) to invite exploration, using the same transform-based hover language already present in `.maison-card:hover`, `.edition-card:hover`, etc.
- **Reveal behaviour:** one reveal language, staggered by index — already the pattern everywhere (audit §2); keep it as the only reveal language rather than introducing a second one for "chapters."
- **Reduced-motion fallback:** extend the existing `@media (prefers-reduced-motion: reduce)` block (already present in `11-responsive.css`, already disables the `InteractiveImage` tilt effect) to also disable the new frame-separation animation and page cross-fade — both should render in their end-state instantly when reduced motion is requested.
- **Mobile simplification:** the four-frames separation (stage 2) should simplify to a simple stacked reveal on narrow viewports rather than attempting the same spatial transform — consistent with the brief's "recompose, don't shrink" rule.
- **Performance limits:** no new animation library; everything above is achievable with CSS transitions/transforms plus the existing `IntersectionObserver` primitive and a small scroll listener (the codebase already has one, in `Navbar.jsx`, for the solid-on-scroll effect) — no new dependency is required by this spec.

## 9. Responsive system

No layout in this spec should be designed "then made responsive." Each gets an explicit mobile composition:

- **1440px (desktop):** full expression — frame device, four-frame separation, side-by-side chapter compositions.
- **1024px (tablet landscape):** frame device retained; four-frame separation may compress to a 2×2 grid rather than 1×4; chapter compositions that are two-column at 1440 may need to narrow their text column (existing `--max-narrow` token already supports this).
- **768px (tablet/mobile boundary):** audit confirms the existing nav already switches to the mobile menu here; the four-frame moment should become a vertical stack at or before this width; chapter compositions become single-column.
- **390px (mobile):** the true "recomposed" case per the brief — e.g. the opening frame may drop its separation animation entirely in favour of a simple sequential reveal of the four venture names (still inside a frame-shaped container for consistency, but without the spatial transform). Every touch target must remain comfortably sized (audit found no current violations to fix, only new components to hold to the same standard).

## 10. Accessibility and performance

**Accessibility (concrete requirements, extending what audit §5 already confirms works):**
- Semantic HTML: keep `<section>`/`<article>`/heading-level discipline already present.
- Keyboard access: the new four-frame moment and any per-venture nav accent must remain fully keyboard-operable — test with the same Tab/Escape/Arrow patterns already implemented in `Navbar.jsx`.
- Focus states: keep the existing visible-focus CSS; extend to any new interactive frame elements.
- Contrast: verify the new per-venture accent colours (§6) meet WCAG AA against both `--cream` and `--ink` before finalising them — not yet verified, must happen during milestone 1.
- Reduced motion: see §8 — non-negotiable for every new animation this spec introduces.
- Image optimisation: see Performance below and audit §7.
- Lazy loading: keep `SafeImage`'s existing default; audit new components (frame, chapter media) to the same standard.
- Bundle impact: this spec adds no new npm dependency — bundle growth should come only from new CSS/component code, which should be measured at each milestone (`npm run build` output size, already a fast/cheap check per the audit).
- Animation performance: prefer `transform`/`opacity` for the frame and cross-fade animations (already the pattern in existing CSS) to stay compositor-friendly; avoid animating `width`/`height`/`top`/`left` directly.
- Layout stability: reserve aspect-ratio space for all frame media (existing `SafeImage`/`ImagePanel` pattern already does this in most places — verify for any new frame component).

**Performance (concrete requirements):**
- Resolve the product-photography size issue found in audit §7 (280–560 KB JPGs) as part of milestone 10, via re-export/compression, not a code change alone — this needs source assets, not just a build step.
- Keep the single-bundle JS approach unless a milestone demonstrably needs code-splitting (not currently justified by size — 132.85 KB gzip is not large).
- Re-verify `npm run build` output size and `npm run lint` cleanliness at the end of every milestone (already a required step per `CLAUDE.md`'s working process).

## 11. Preservation plan

Explicitly preserved, unchanged in substance:

- All 6 existing routes and their URLs.
- All real content in every `src/data/*.js` module — copy, product data, contact details, leadership names/roles.
- The `SafeImage` → `ImagePanel`/`ImageReveal` → `Reveal` image/reveal primitive chain (extended, not replaced — see §8).
- The CSS custom-property token system in `variables.css` (extended with venture accents, §6 — not restructured).
- The CSS partial architecture (`src/styles/partials/`) — new work should add ordered partials, not collapse the existing ones.
- `Navbar`/`Footer`/`PageShell` functional behaviour (keyboard support, mobile menu, focus management) — visual accents added, behaviour untouched.
- The existing Luxe page's Vault XIII / House Editions / Maison Series sequence (§4) — least-changed venture in this plan, since it already fits the brief well.
- The lint/format/build tooling exactly as configured today.
- The uncommitted Maison Series work currently in the working tree (audit §8) — this redesign plan assumes that work is committed and preserved, not discarded.

## 12. Removal or replacement plan

- **`HomeHero`'s current centred logo/tagline/button composition** — replaced by the frame-based opening (§2 stage 1). Reason: audit confirms this is the "conventional opening" the brief explicitly asks to move away from.
- **`HoldingIntro`'s leadership placement** — leadership content moves out of this early section to stage 6 (§2). Reason: confirmed decision, confirmed current violation (audit §3).
- **The literal duplication between `InternationalPreview` and `LuxePreview`** (`editorial-section` reused as-is) — replaced by three distinct venture chapters (§4) that share structure but not literal markup/class identity. Reason: audit §5 confirms this is a real, named duplication, not a stylistic choice.
- **The homepage's flat, un-transitioned section stack** — replaced by the 7-stage journey with the frame/rule connective device (§1, §2). Reason: brief's core requirement; audit confirms today's stack has no connective mechanism at all.

**Not removed:** the underlying `BusinessCard`, `ImagePanel`, `Reveal`, `SectionHeader` components — these are evolved (new props/variants) rather than deleted, per `CLAUDE.md`'s "reuse and improve" rule and because audit found no functional defect in any of them.

## 13. Implementation milestones

Each milestone lists objective, scope, relevant files, dependencies, what stays unchanged, acceptance criteria, verification method, and risks.

### Milestone 1 — Foundation and design tokens
- **Objective:** establish the venture accent colours and any new spacing/ratio tokens the frame device needs, without touching any page yet.
- **Scope:** `src/styles/variables.css` additions only.
- **Files:** `src/styles/variables.css`.
- **Dependencies:** none.
- **Must remain unchanged:** every existing token and its current value; every existing page's rendered output (additions only, nothing consumes the new tokens yet).
- **Acceptance criteria:** `npm run build` succeeds; visual diff of all 6 routes at all 4 breakpoints shows zero change.
- **Verification:** build + lint + browser screenshot comparison before/after.
- **Risks:** low. New tokens must pass a WCAG AA contrast check (§10) before being used anywhere.

### Milestone 2 — Global shell and navigation
- **Objective:** add the per-venture nav accent and the route cross-fade.
- **Scope:** `Navbar.jsx`, `BusinessSwitcher.jsx`, `PageShell.jsx`/`ScrollManager` (in `App.jsx`).
- **Dependencies:** Milestone 1 (accent tokens).
- **Must remain unchanged:** all existing keyboard/focus/mobile-menu behaviour; all routes and their content.
- **Acceptance criteria:** nav shows a visible, accessible per-venture accent on each of the 3 (or 4, pending §4 decision) venture routes; page transitions cross-fade smoothly and instantly skip the fade under `prefers-reduced-motion`.
- **Verification:** manual keyboard walkthrough (Tab/Escape/Arrow), browser check at all 4 breakpoints, reduced-motion emulation check.
- **Risks:** medium — touches the one component (`Navbar`) used on every page; regressions here are highly visible. Test every route after this milestone, not just one.

### Milestone 3 — Homepage opening (stage 1)
- **Objective:** replace `HomeHero`'s composition with the frame-based opening.
- **Scope:** `src/sections/HomeHero.jsx`, its CSS partial, possibly a new small component for the frame itself (reusable in Milestone 4).
- **Dependencies:** Milestones 1–2.
- **Must remain unchanged:** the `BusinessDock` component itself (may be repositioned, not rebuilt); the ORAC wordmark asset; the "INDIA · SINGAPORE · AFRICA" brand strip content.
- **Acceptance criteria:** new opening renders correctly at all 4 breakpoints with no overflow; reduced-motion users see the end-state immediately; Lighthouse/manual check shows no CLS regression from today's baseline.
- **Verification:** build, lint, browser check at all 4 breakpoints, reduced-motion check.
- **Risks:** medium — this is the single most visible change on the site.

### Milestone 4 — Homepage venture-chapter system (stages 2–3)
- **Objective:** build the four-frames expansion and the three (or four) distinct venture chapters, replacing `CompanyPortfolio` + `InternationalPreview` + `EventusPreview` + `LuxePreview`.
- **Scope:** `src/sections/CompanyPortfolio.jsx`, `InternationalPreview.jsx`, `EventusPreview.jsx`, `LuxePreview.jsx`, `src/components/common/BusinessCard.jsx` (evolved), new chapter-specific CSS partials.
- **Dependencies:** Milestones 1–3 (frame component exists from Milestone 3).
- **Must remain unchanged:** `companyData.js` content; the routes each chapter links to.
- **Acceptance criteria:** each venture reads as visually distinct per §4 while sharing the frame/typography/motion system; mobile (390px) shows a genuinely recomposed (not just narrowed) version per §9.
- **Verification:** build, lint, browser check at all 4 breakpoints, side-by-side comparison against the brief's "avoid card grid" requirement.
- **Risks:** medium-high — the largest single markup change in this plan. Requires the §4/§14 decision on Evolution before this milestone can be considered complete for "four worlds."

### Milestone 5 — ORAC International
- **Objective:** apply the venture-specific frame treatment and route-line accent to the full `/international` page (not just its homepage preview).
- **Scope:** `src/pages/OracInternational.jsx` and its section components; no data changes.
- **Dependencies:** Milestones 1, 2, and the frame component from Milestone 3.
- **Must remain unchanged:** all product data, the existing carousel functionality (audit confirms it works — no reason to rebuild it), the `GlobalReach` map component itself.
- **Acceptance criteria:** page opens with the frame device; product photography crops standardised per §7; no regression to the carousel's keyboard/scroll behaviour.
- **Verification:** build, lint, browser check, manual carousel interaction test at all 4 breakpoints.
- **Risks:** low-medium — mostly additive/cosmetic on top of an already-solid page.

### Milestone 6 — ORAC Eventus × VELORAWED
- **Objective:** apply the frame device and Eventus-specific pacing to `/eventus`.
- **Scope:** `src/pages/OracEventus.jsx`, `src/sections/EventusVelorawedSection.jsx`.
- **Dependencies:** Milestones 1, 2, 3.
- **Must remain unchanged:** all copy, all real photography references, the VELORAWED sub-section's existing structure.
- **Acceptance criteria:** frame device present at page open; no regression to the existing gallery or process-timeline components.
- **Verification:** build, lint, browser check at all 4 breakpoints.
- **Risks:** low.

### Milestone 7 — ORAC Luxe × The House of Azrin
- **Objective:** apply the frame device at page-open only; otherwise preserve the existing Vault XIII / House Editions / Maison Series sequence per §4 and §11.
- **Scope:** `src/pages/LuxuryExport.jsx` (top of page only), `src/data/luxeData.js` unchanged.
- **Dependencies:** Milestones 1, 2, 3.
- **Must remain unchanged:** the entire Vault XIII / House Editions / What Is Azrin / Maison Series / catalogue / Values sequence and all of `MaisonCategory.jsx`.
- **Acceptance criteria:** frame device present and consistent with other ventures at page-open; zero change below that point.
- **Verification:** build, lint, browser check, diff confirmation that nothing below the hero changed.
- **Risks:** low — smallest-scope milestone by design, since this page already fits the brief.

### Milestone 8 — ORAC Evolution
- **Objective:** implement per whichever of the two options in §4/§14 the user selects.
- **Scope:** depends on the decision — either a new minimal route + nav entry + `companyData.js` entry (option a), or no new page but the expansion mechanism (Milestone 4) built to accept a future fourth frame without rework (option b).
- **Dependencies:** the §14 decision; Milestones 1–4.
- **Must remain unchanged:** nothing invented — no services, no claims, per the brief's explicit prohibition.
- **Acceptance criteria:** depends on chosen option; in both cases, no fabricated business content anywhere.
- **Verification:** content review against the brief's "never invent" rule before any code review.
- **Risks:** low technically, high in brand-accuracy terms if the "never invent" rule is not followed carefully — this milestone is copy-risk, not code-risk.

### Milestone 9 — Responsive and accessibility pass
- **Objective:** dedicated verification pass across everything built in Milestones 1–8, at all 4 required breakpoints, plus the accessibility requirements in §10.
- **Scope:** no new features; fixes only.
- **Dependencies:** Milestones 1–8 complete.
- **Must remain unchanged:** nothing new is introduced here.
- **Acceptance criteria:** zero horizontal overflow, zero broken images, zero console errors at all 4 breakpoints across all routes (matching this audit's baseline — audit §3); keyboard walkthrough of every new interactive element; contrast check of every new colour usage.
- **Verification:** the same programmatic checks used in this audit (DOM overflow/broken-image measurement, console capture) repeated across the full route list.
- **Risks:** low if earlier milestones followed their own acceptance criteria; this is a safety net, not where problems should first surface.

### Milestone 10 — Performance and final polish
- **Objective:** resolve the asset-size findings in audit §7, verify bundle size, final cross-check against the brief's "Final Quality Standard" checklist (from the prior `CLAUDE.md`, retained here as a genuinely useful closing checklist even though the rest of that file has been superseded).
- **Scope:** image re-export/compression (source-asset work, not just code), `srcset`/responsive image sizing in `SafeImage` if warranted, final build-size check.
- **Dependencies:** all prior milestones.
- **Must remain unchanged:** no visual regression from the approved design in Milestones 1–9 — this milestone optimises delivery, not appearance.
- **Acceptance criteria:** `dist/` total size meaningfully reduced from this audit's ~19 MB baseline without visible quality loss; `npm run build`/`npm run lint` both clean.
- **Verification:** before/after `dist/` size comparison, visual spot-check that compression did not introduce artefacts.
- **Risks:** low.

## 14. Asset and content requirements

Needed from the user before or during implementation (temporary layout-safe placeholders — i.e., the existing `SafeImage` fallback treatment — may be used anywhere below marked *(placeholder-safe)* so this spec is not blocked on any single item):

- **Decision:** ORAC Holding vs. ORAC Holdings spelling ([Decisions](ORAC-DECISIONS.md) item 1) — needed before Milestone 2 touches any copy.
- **Decision:** ORAC Evolution — option (a) minimal real placeholder vs. option (b) defer entirely ([Decisions](ORAC-DECISIONS.md) item 2; §4/§14 above) — needed before Milestone 8, and ideally before Milestone 4 so the four/three-frame decision is made once, not twice.
- **Decision:** whether Apple/Bakinatajna remain active supplementary references ([Decisions](ORAC-DECISIONS.md) item 3) — needed before Milestone 1 sets final tone/spacing targets, though it does not block starting.
- **Decision:** "Businesses" vs. "Companies" vs. "ventures" terminology ([Decisions](ORAC-DECISIONS.md) item 4) — needed before Milestone 2 (nav copy).
- **Decision:** approval of the frame mechanism itself (§1) — this entire spec depends on it; everything above is void if a different mechanism is preferred.
- Final long-form copy for the homepage "Origin" statement (stage 1) — not yet written; a working placeholder line exists in today's `hero-subtext` copy and is *(placeholder-safe)* in the interim.
- Any leadership/founder photography, if the redesign is meant to give the leadership section (stage 6) imagery beyond the current text-only tiles — *(placeholder-safe)*, entirely optional per the brief (no requirement for leadership photography exists in the brief).
- Confirmation of the Luxe catalogue PDF's completion date (audit §8 — the download link is currently broken pending this asset) — not required for this redesign's milestones, but should not be forgotten.
- If option (a) is chosen for Evolution: any real, confirmed information about it (even minimal) — per the brief, nothing may be invented to fill this gap.
