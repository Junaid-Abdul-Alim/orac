# ORAC Current Implementation Audit

Factual snapshot of the ORAC website as of this audit. Every finding below is backed by a file, a command result, or rendered/browser behaviour actually observed — not inferred from filenames alone. Where direct inspection was not possible, that limitation is stated rather than glossed over.

**Audit method:** repository inspection, `npm run build`, `npm run lint`, and live browser inspection of `vite preview` at 1440px, 1024px, 768px, and 390px viewport widths, across all 6 routes (`/`, `/international`, `/eventus`, `/luxury-export`, `/luxury-export/dresses`, `/contact`).

---

## 1. Technical architecture

| Aspect | Finding |
|---|---|
| Framework | React 18.3.1, function components + hooks only. No class components. |
| Build tool | Vite 7.3.5, `@vitejs/plugin-react` |
| Routing | `react-router-dom` v7, `BrowserRouter`, 6 routes + a wildcard redirect to `/` |
| Styling | Plain CSS, no CSS-in-JS, no Tailwind, no CSS Modules. One `src/styles/variables.css` (custom properties) + `src/styles/global.css` (a barrel of 12 `@import`ed partials in `src/styles/partials/`, imported in explicit order; Vite inlines these at build time so the compiled output is one sheet, hash `index-KmsBzn8s.css`, 74.88 kB / 14.06 kB gzip) |
| Animation | **No animation library.** No framer-motion, gsap, lottie, or anime.js anywhere in `package.json`, `package-lock.json`, or `node_modules`. All motion is hand-rolled: CSS transitions/keyframes plus a single shared `useReveal` hook (`src/hooks/useReveal.js`) that toggles an `is-visible` class via `IntersectionObserver`, consumed by two thin wrapper components, `Reveal` and `ImageReveal`. |
| Maps | `react-simple-maps` (SVG world map, `GlobalReach.jsx`), reading a local topojson at `public/geographies/countries-110m.json` |
| Icons | `lucide-react` |
| Other deps | `prop-types` (present in `package.json` but not used for any component — no `propTypes` assignments found in `src/`) |
| Dev tooling | ESLint 9 (flat config, `eslint.config.js`), Prettier 3, both with npm scripts (`lint`, `format`, `format:check`) |
| Component structure | `src/components/common/` (28 reusable primitives), `src/components/layout/` (Navbar, Footer, PageShell), `src/sections/` (9 homepage-specific composition blocks), `src/pages/` (7 route roots), `src/data/` (11 content/config modules), `src/hooks/`, `src/utils/` |
| Asset structure | `src/assets/images/` organised by venture (`international/`, `eventus/`, `velorawed/`, `luxe/`, `maison/`), plus `src/assets/logos/`. `public/` holds the topojson, favicon, OG image, robots.txt, `.htaccess`, and a `downloads/` folder awaiting a catalogue PDF. |
| Build status | **Succeeds.** `npm run build` completes in ~0.7s, emits `dist/` (~19 MB total, see Asset audit). |
| Lint status | **Passes.** `npm run lint` exits 0. 2 warnings only (both `react-hooks/set-state-in-effect`, in `Navbar.jsx` and `useReveal.js`), both pre-existing and intentionally left as warnings — see the rule comment in `eslint.config.js`. 0 errors. |
| Test status | **No test framework configured.** No test script in `package.json`, no test files found in `src/`. This audit does not introduce one. |

## 2. Existing design system

**Typography.** Two font families loaded via Google Fonts in `index.html`: `Cormorant Garamond` (display/serif, `--font-display`) and `Jost` (body/sans, `--font-body`). Headings and the ORAC wordmark use the display serif; body copy, nav, buttons use the sans. No third family.

**Colour.** Defined once in `src/styles/variables.css`: `--gold` (#B8975A), `--gold-light`, `--gold-pale`, `--ink` (#1A1814, primary text), `--ink-soft`, `--ink-muted`, `--cream` (#FAF8F4, primary background), `--white`, `--navy` (#1B2240, used on the map), `--surface`/`--surface-soft`, `--graphite`, plus glass/rule tokens. Gold is used for eyebrows, rules, hover states, and accents throughout — it is the primary "premium" signal in the current palette, confirmed by grep: gold-family tokens appear far more often across the partials than any other accent colour.

**Spacing.** A fluid `clamp()`-based scale (`--space-xs` through `--space-3xl`) and two container widths (`--max: 1180px`, `--max-narrow: 840px`). Used consistently — no evidence of ad hoc pixel spacing outside this scale in the sections inspected.

**Grid.** No CSS Grid framework; individual components define their own `display: grid`/`flex` layouts (e.g. `.editions-grid`, `.maison-grid`, `.business-showcase-grid`).

**Buttons.** One `Button` component (`src/components/common/Button.jsx`), always a `react-router-dom` `Link`, three variants via class suffix (`button-primary`, `button-secondary`, `button-ghost`). Used identically on every page.

**Cards.** Recurring card pattern used for: the 3 venture cards on the homepage (`BusinessCard`), the 4 Maison Series category cards, the 3 House Editions cards, the 5 "reason panel" cards repeated across Eventus/Luxe/WhyOrac, and the leadership tiles. This is the single most repeated composition primitive on the site.

**Navigation.** `Navbar.jsx`: fixed header, solid-on-scroll (`is-solid` class toggled via scroll listener), a "Companies" dropdown (`BusinessSwitcher`) listing the 3 active ventures, a separate full-screen mobile menu. No breadcrumbs, no per-venture visual identity in the nav itself (same nav on every route).

**Image treatment.** One shared pattern for almost every photographic image on the site: `SafeImage` (graceful `onError` fallback to a labelled placeholder block) wrapped by `ImagePanel` (adds a scrim overlay + caption) wrapped by `Reveal`/`ImageReveal` (scroll-triggered fade/rise). This same `ImagePanel` is reused for the homepage venture previews, the Eventus gallery, the VELORAWED gallery, and the Maison Series category cards — i.e., one image-treatment language across very different content types.

**Motion language.** Exactly one motion primitive, applied everywhere: a fade + slight vertical rise triggered once per element by `IntersectionObserver`, with a per-element `delay` prop used to stagger siblings (`delay={index * 70}` etc.). This exact pattern (`Reveal`/`ImageReveal` with an index-based stagger) appears in essentially every section file inspected (`HoldingIntro`, `WhyOrac`, `CompanyPortfolio` → `BusinessCard`, `LuxuryExport`, `OracEventus`, `MaisonCategory`, `Contact`). There is no second motion behaviour anywhere in the codebase — no parallax, no scroll-linked transforms, no page-transition system between routes (routes swap instantly via React Router with no exit/enter animation), no cursor effects.

## 3. Current homepage journey

Confirmed by live DOM inspection at 1440px (`document.querySelectorAll('main > section')`), the homepage (`src/pages/Home.jsx`) renders exactly this order:

1. **`home-hero`** — centred ORAC wordmark logo (used as the `<h1>`, with an `sr-only` text duplicate), a tagline line, a subtext line, a 3-item `BusinessDock` (venture quick-links), two CTA buttons ("Explore Businesses", "Start a Conversation"), a bottom brand strip ("INDIA · SINGAPORE · AFRICA"). Visually: centred text stack over a soft cream gradient, no photography, no video, no distinctive opening mechanism.
2. **`holding-intro`** (`id="about"`) — three paragraphs of "About ORAC Holding" copy, then, in the **same section**, a "Leadership across the ORAC group" sub-block rendering all 4 leadership tiles from `companyData.js`. **This confirms the "leadership appears too early" concern from the creative brief**: leadership is the very first substantive content block after the hero, before a single venture has been introduced.
3. **`portfolio-section`** (`id="companies"`) — the 3 `BusinessCard`s in a grid (International, Eventus, Luxe). Standard card grid: image + number badge + logo + title + one-line purpose + "Explore" link.
4. **`editorial-section`** — International preview: heading/text/bullet-list on one side, one `ImagePanel` image on the other, one CTA button.
5. **`global-reach-section global-reach-home`** — the interactive world map plus 3 stat tiles (country count, corridor count, "India" base).
6. **`eventus-preview`** — similar split layout to #4, Eventus-specific copy and image.
7. **`editorial-section`** (again — **same CSS class as #4**) — Luxe preview. Confirms by class name, not just similarity, that International's and Luxe's homepage previews are the literal same layout component reused, differing only in copy and image.
8. **`why-section`** — 5 "reason panel" cards (Clear structure / Professional execution / Quality discipline / Long-term intent / Partner-led growth).
9. **`contact-cta`** — closing heading, text, and a route to `/contact`.

**Overall pattern:** 9 sections, each visually self-contained (own heading, own text block, own `Reveal` stagger), stacked with no shared transition, no narrative connective tissue, and no visual signal that one section is "leading into" the next. This matches the brief's description of "independent sections stacked vertically" — confirmed against the rendered DOM order, not assumed from the source alone.

## 4. Strengths to preserve (concrete, from the actual implementation)

- **Real, correct, specific content.** Product names, specs, and origins in `internationalData.js` (37 real product tags across export/import categories); named leadership with real roles; real contact details (phone/email/address) per venture in `contactData.js`. Nothing generic or placeholder-sounding in the live copy.
- **Consistent typographic voice.** The Cormorant/Jost pairing is used with genuine discipline — every heading, every eyebrow label, every button follows the same two-family system with no drift.
- **Working accessibility baseline.** Skip link (`App.jsx`), focus management on route change (`ScrollManager`), `aria-label`s on icon-only buttons, keyboard-operable dropdown (arrow-down opens the Companies menu and moves focus), `sr-only` text where an image stands in for a heading, a `prefers-reduced-motion` block in `11-responsive.css`.
- **Resilient image handling.** `SafeImage`'s `onError` fallback means a missing/broken asset degrades to a labelled placeholder instead of a broken-image icon — confirmed working (Maison category pages currently render entirely on this fallback path with 0 console errors).
- **Clean, working build/lint pipeline.** Confirmed green in this audit (see §1).
- **No horizontal overflow at any tested breakpoint** (1440/1024/768/390, all 6 routes) and **0 broken images at any tested breakpoint** — confirmed via live DOM measurement, not visual inspection alone.
- **The data/presentation split.** Every page pulls its copy from a dedicated `src/data/*.js` module rather than hardcoding strings in JSX. This will make a redesign meaningfully easier — new layouts can consume the same data.

## 5. Weaknesses to address (concrete, from the actual implementation)

### Brand

- **ORAC Evolution does not exist anywhere in the codebase** — not in `companyData.js`'s `companies` array, not in the nav, not as a route. `CompanyPortfolio.jsx`'s own copy says "three active ventures." If Evolution is meant to be visible even in placeholder form, it is currently 100% absent, not partially built.
- **Naming inconsistency risk**: "ORAC Holding" (used consistently in live copy) vs. "ORAC Holdings" (mandated by a prior, untracked `CLAUDE.md`) — see [ORAC-DECISIONS.md](ORAC-DECISIONS.md) item 1. Unresolved; flagged, not fixed.
- **"Businesses" vs "Companies" vs "ventures"** used interchangeably across the nav ("Companies"), footer ("Businesses"), and component names (`BusinessCard`, `BusinessDock`, `BusinessSwitcher`).

### Layout

- Every one of the 9 homepage sections uses one of two container patterns (`split-layout` two-column, or a centred `SectionHeader` + grid) — confirmed by class-name reuse, not just visual similarity.
- International's and Luxe's homepage preview sections are the same component/class (`editorial-section`) with different content — a literal repeated template, not just a similar-feeling one.
- The card pattern (image + number + title + one-liner + "Explore") recurs for ventures, Maison categories, House Editions, and (structurally, minus the image) for the 5 "reason panel" grids — five distinct content types forced into variations of one card shape.

### Storytelling

- No mechanism connects one section to the next — each is visually and structurally independent. There is no opening "device" (per the brief's suggested mechanisms) anywhere in `HomeHero.jsx`; it is a heading + subtext + buttons hero, full stop.
- Venture pages (`/international`, `/eventus`, `/luxury-export`) each open with the same `Hero` component (logo/title/kicker/text/meta over a dark or light panel) — differentiated only by copy and one hero image, not by a distinct visual language per venture as the brief calls for.

### Navigation

- No visual indicator, in the nav itself, of which venture the visitor is currently in beyond the standard `NavLink` active-state colour change — no venture-specific accent, icon treatment, or "world" cue in the shared header.
- The nav is functionally solid (keyboard support, escape-to-close, focus trap on the dropdown) — this is a design-language gap, not a functionality bug.

### Responsiveness

- No overflow or broken-image issues found at the four required breakpoints (see §3 note and Route-by-route findings) — responsiveness is functionally sound today. The gap is that mobile is a **reflowed** version of the same desktop composition (e.g., the 3-card business dock becomes a 2+1 grid) rather than an intentionally different mobile-specific composition, which is what the brief calls for ("recompose," not "reflow").

### Accessibility

- No missing alt text or keyboard traps found in the areas inspected. One nuance: several purely decorative images (`business-card-image`, footer logo) correctly use empty `alt=""`, but this pattern is manual per-component rather than enforced — a redesign should keep doing this deliberately, not assume it's automatic.

### Performance

- See Asset audit (§7) — multiple product photography JPGs in the 280–560 KB range, uncompressed relative to their usage size. This is the clearest concrete performance risk in the current build.
- No lazy-loading gaps found: images not marked `priority` use `loading="lazy"` by default via `SafeImage`.
- JS bundle is a single 398 KB (132.85 KB gzip) chunk — no route-based code splitting. Not a problem at the current scale, but worth noting before a redesign adds a heavier motion system.

### Maintainability

- The CSS partial system (`src/styles/partials/01-…` through `12-…`) is a reasonable foundation for a section-by-section redesign — new venture "chapters" could each get an ordered partial without disturbing the others.
- `prop-types` is a dependency with zero actual usage — dead weight, not a defect, but worth resolving (either use it or drop it) during a broader cleanup.

## 6. Route-by-route findings

| Route | Component | Findings |
|---|---|---|
| `/` | `pages/Home.jsx` | See §3 in full. 9 stacked sections, leadership in section 2, two literal repeats of `editorial-section`. |
| `/international` | `pages/OracInternational.jsx` | Uses shared `Hero`, then a founder section, an "About" panel with stat tiles, the `GlobalReach` map, a 6-item capability grid, a `ProductCategoryShowcase` (2 horizontally-scrolling carousels, Export/Import, 49 total products across the two — confirmed via live DOM count), a `CinematicBanner`, a `ProcessTimeline`, and a `ContactCTA`. This is the most content-rich page and the most "product-led," closest in spirit to the brief's International direction already — but still uses generic carousel controls, not a distinct visual world. |
| `/eventus` | `pages/OracEventus.jsx` | Shared `Hero`, then `EventusVelorawedSection` (VELORAWED sub-brand intro with its own gallery), a "Who We Are" split section, a service grid (8 `ServiceBlock`s), an `EditorialGallery`, a `ProcessTimeline`, a "Why Clients Choose Us" reason-panel section, `ContactCTA`. Confirmed 27 images, 0 broken, 0 console errors. Reasonably distinct from International in tone already (more image-forward), but built from the same primitives. |
| `/luxury-export` | `pages/LuxuryExport.jsx` | Shared `Hero` (tagline "Where Elegance meets Intention."), a Vault XIII colour-palette section (6 swatches + one image), a 3-card "House Editions" grid, a "What is Azrin" split section, a 4-card Maison Series "Explore" grid linking to sub-pages, a downloadable-catalogue panel (link currently points to a not-yet-uploaded PDF at `/downloads/the-house-of-azrin-catalogue.pdf`), a values reason-panel grid, a closing CTA. This is the newest and most structurally distinct page on the site (built in a prior session against a specific creative brief document for Luxe), and the closest existing precedent for "chapter-like" composition. |
| `/luxury-export/:categorySlug` | `pages/MaisonCategory.jsx` | 4 valid slugs (dresses, co-ords, tunics, signature-bottoms), invalid slugs redirect to `/luxury-export` (confirmed live). Each renders a 3-left/3-right model-story showcase (24 total looks with real story copy from a supplied document; imagery for these looks now exists as real JPGs in `src/assets/images/maison/`, per untracked working-tree changes — see §8). Uses a bespoke `InteractiveImage` component (pointer-tilt effect, no external 3D/animation library) as a stand-in for the "3D movable models" originally requested for this page. |
| `/contact` | `pages/Contact.jsx` | 5 contact cards (Holding, International/Singapore, Eventus, Luxe, Africa desk), each with real phone/email/address data from `contactData.js`. Simple, functional, no distinct visual treatment beyond the shared card pattern. |

## 7. Asset audit

**Reusable as-is:** the 4 SVG venture logos and the ORAC wordmark logo (`src/assets/logos/`) — small, vector, no optimisation needed. The topojson world map. The favicon and OG image (`public/og-image.png`, a purpose-built 1200×630 branded graphic from a prior session).

**Needs optimisation:** the International catalogue photography (`src/assets/images/international/catalog/*.jpg`) is the single largest asset group — see the size table below. These are real, correctly-sourced product photos, not placeholders, but several are 2–4× larger than their on-page display size warrants.

Largest built assets (from `dist/assets/` after `npm run build`):

| Asset | Size |
|---|---|
| `maison-collage.jpg` | 561.9 KB |
| `coir-fiber.jpg` | 427.3 KB |
| `used-beverage-cans-scrap.jpg` | 419.4 KB |
| `millets.jpg` | 396.0 KB |
| `red-chilli-powder.jpg` | 395.6 KB |
| `turmeric-powder.jpg` | 381.9 KB |
| (18 further product JPGs, each 280–370 KB) | — |

Total `dist/` size: **~19 MB**, driven almost entirely by these unoptimised JPGs rather than by code (JS+CSS together are under 475 KB).

**Low quality / missing:** none of the currently-referenced images are missing or broken (0 broken images confirmed at every breakpoint/route tested). No currently-referenced asset was found to be low-resolution or visibly poor quality in the areas inspected.

**Unused:** not exhaustively verified — a full unused-asset sweep (cross-referencing every file in `src/assets/` against every `import` in `src/`) was not performed as part of this audit and should be a discrete, low-risk cleanup task if wanted.

**Unclear ownership / purpose:** `src/assets/images/luxe/maison-collage.jpg` and `vault-xiii-palette.jpg`, plus the 4 `maison/fronts/*.jpg` and 24 `maison/looks/**/*.jpg` files, are **new, untracked, uncommitted** working-tree assets (added outside this session, evidenced by `git status` — see §8). They are wired into `src/data/luxeData.js` and render correctly, but have not yet been committed to version control.

## 8. Risks

**Technical risks:**
- No test coverage of any kind — any redesign work has no automated regression net; verification must rely on manual build/lint/browser inspection at each milestone.
- Single global CSS file (via partials) — a large-scale redesign touching many partials at once raises the chance of cross-partial specificity conflicts if not sequenced carefully (the redesign spec's milestone breakdown addresses this).

**Design inconsistencies:**
- See §5 — the `editorial-section` duplication and the five-content-types-into-one-card-shape pattern are the two clearest concrete instances.

**Performance risks:**
- The unoptimised product JPGs (§7) are the most concrete, measurable performance risk currently in the build. Any redesign that adds a heavier motion/visual system should budget for fixing this rather than adding to it.

**Missing content:**
- The Luxe catalogue PDF (`public/downloads/the-house-of-azrin-catalogue.pdf`) does not yet exist — the download button on `/luxury-export` links to a 404 today.
- No confirmed content or design direction exists yet for ORAC Evolution (§5, Brand).

**Missing imagery:**
- The Vault XIII palette image and the 4 Maison Series "front" images are now present (see §8 uncommitted assets) — this was an open gap in a prior session and appears resolved, pending commit.
- No founder/leadership photography exists anywhere in the codebase — the leadership section is text-only (name, role, focus).

**Responsive weaknesses:**
- Functionally none found (§3, §5 Responsiveness). The gap is compositional intent, not breakage.

**Uncommitted work that must be protected:**
Confirmed via `git status` at the start of this audit — the working tree has real, in-progress, uncommitted changes that predate and are unrelated to this documentation task:
- Modified: `src/App.jsx`, `src/data/luxeData.js`, `src/pages/LuxuryExport.jsx`, `src/styles/global.css`, `vercel.json`
- Untracked: `public/downloads/`, `src/assets/images/luxe/maison-collage.jpg`, `src/assets/images/luxe/vault-xiii-palette.jpg`, `src/assets/images/maison/` (28 files), `src/components/common/InteractiveImage.jsx`, `src/pages/MaisonCategory.jsx`, `src/styles/partials/12-maison.css`, and this documentation set itself (`CLAUDE.md`, `docs/`)

**None of this was touched, reverted, or reorganised as part of this audit.** It represents the Luxe/Maison Series build from recent prior sessions and should be reviewed and committed on its own terms, separately from any redesign work.

## Limitations of this audit

- Visual inspection was performed via automated browser tooling (DOM measurement, console log capture, screenshot capture) against `vite preview`, not a human eye on a physical device. Screenshots were successfully captured at 1440px, 768px, and 390px; overflow/broken-image/console-error checks were performed programmatically at all four required widths (1440/1024/768/390) across all 6 routes.
- No cross-browser testing was performed (Chromium-based browser only, via the available tooling).
- No Lighthouse/performance-trace profiling was run; the performance findings above are based on static asset sizes, not measured load/paint timings.
- No full unused-asset sweep was performed (see §7).
- Real device testing (touch interaction, actual mobile Safari/Chrome rendering quirks) was not performed.
