# ORAC Cinematic Storyboard

**One final direction for the ORAC Holdings homepage. Not a menu of concepts.**

This document defines a single, shot‑by‑shot cinematic experience for the homepage, tied at every point to real ORAC content. It is the reference an implementation session builds from without inventing creative decisions.

- **Scope:** homepage only (`/`). Venture sub‑pages are out of scope here.
- **Status:** creative direction, approved to author. It describes the *target*; it is not a description of the current build. Where the current build already satisfies the target, that is stated.
- **This task changed no source code, motion, dependencies, routes, or production layouts.** All findings come from live browser inspection of the running site on branch `orac-motion-lab` and from reading the source read‑only.
- **Companion evidence:** [orac-storyboard-contact-sheet.html](orac-storyboard-contact-sheet.html) — labelled frames from the real capture session plus the selected assets.

---

## 0. How this document was produced (browser analysis)

The current homepage was run locally (`npm run dev`, `http://localhost:5174/`) and inspected in a real Chromium session at 1440×900, 393×852, and 360×640. Captured:

- **The opening**, recorded end‑to‑end (`homepage-opening.webm`) and **seeked frame‑by‑frame** via the Web Animations API (`document.getAnimations().forEach(a => { a.pause(); a.currentTime = T })`) at T = 150 / 550 / 950 / 1350 / 1750 ms, plus the resolved state — so the opening could be judged as stills, not guessed.
- **A continuous top‑to‑bottom scroll** (`homepage-scroll.webm`).
- **Desktop stills at every section boundary** (`sec-01`…`sec-09`).
- **Mobile stills** at 393 and 360 (`m393-*`, `m360-*`).
- **Reference sites**, live: `apple.com`, `microsoft.com/en-us/windows`, `izanami-official.com`.

Console at load: **0 errors** across the run. Reduced‑motion and returning‑visitor behaviour verified from source (`useOpeningSequence`, `11-responsive.css`).

### Where the page is cinematic today, and where it goes ordinary

| Zone | Reading | Evidence |
|---|---|---|
| Opening (`OriginSequence`) | **Cinematic.** Three real venture photos converge on a gold ring; ORAC resolves; three apertures open. The one authored moment. | `k-01…k-05`, `op-06-resolved` |
| HoldingIntro | **Ordinary + a defect.** Calm editorial type, no connective device, and the statement *"We build institutions designed to endure."* is **printed twice** in the same section (as the display heading and again below the body). | `sec-02-holding` |
| International / Eventus / Luxe | **Ordinary.** Three **structurally identical** editorial splits (eyebrow + serif heading + copy + bullet list on the left, one rounded image on the right), differing only by accent colour and content. This is exactly "independent sections stacked vertically." | `sec-03`, `sec-05`, `sec-06` |
| Global Reach | **Cinematic (static).** Highlighted‑India world map with corridor language — the second most distinctive moment — but nothing moves; corridors are implied, never drawn. | `sec-04-globalreach` |
| Why ORAC / Leadership | **Ordinary, appropriately calm.** Card grid + tiles. Correct as "support material," but disconnected. | `sec-07-why`, `sec-08` |
| Contact | **A good close.** Tonal shift to ink‑dark before the footer gives real closure. | `sec-09-contact` |

**Conclusion driving this storyboard:** the page peaks once (opening), has a smaller static peak (Global Reach), and is otherwise flat. The work is to (1) strengthen the opening, (2) give the three venture chapters *distinct, content‑specific* motion while keeping one shared structure, and (3) run a single restrained gold element through all of it so the sections read as one journey.

---

## 1. Critical evaluation of the existing opening

The current opening is a strong working implementation, **not a finalised design.** Judged from the seeked frames, here is the verdict on each element. The target opening in **Scene 1** is built from these verdicts — it is not "keep as built."

Timeline observed (desktop, ~1900 ms): 0–500 ms fragments enter L/top/R (International draws its route‑line, Eventus is letterboxed+blurred, Luxe fades in); ~500 ms wordmark begins; ~700–950 ms wordmark + tagline + fork are fully formed **while a fragment still overlaps the letters**; ~1040–1240 ms three apertures stagger in; ~1750 ms resolved.

| Opening element | Verdict | Why (from the frames) | Target |
|---|---|---|---|
| Three‑real‑photos convergence concept | **Preserve** | The core idea is right and on‑brief: three real businesses become one house. | Keep as the spine of Scene 1. |
| Fragment size & legibility on entry | **Reframe** | In `k-01` the fragments are small (~180 px) and read as generic thumbnails; a viewer can't tell "wedding / trade / atelier" before they dissolve. | Enter larger (≈ aperture width), each held legibly for one beat before travelling. |
| Eventus fragment blur + letterbox on entry | **Refine** | `k-01` shows it so blurred + bar‑masked it's unreadable as a wedding at the exact moment it should introduce Eventus. | Start at ~40% blur, not ~100%; let the human moment be readable, then sharpen. |
| Luxe fragment opacity on entry | **Refine** | `k-01` Luxe is near‑invisible on the right; the third world barely registers. | Enter at higher opacity; give it equal weight to the other two. |
| Convergence → formation **sequence** | **Retime** | `k-03`: the wordmark, tagline and fork are already complete while a photo still sits **on top of the O‑R‑A‑C letters**, occluding them. Formation overlaps convergence and briefly hides the identity. | Fragments **clear the wordmark zone** before/exactly as the wordmark blooms — convergence, *then* resolution. |
| Fragment → aperture **handoff** | **Reframe** | Fragments pile at centre and *dissolve*; the three apertures then *fade in* separately below. The same photos are used, but it is not a spatial 1:1 handoff. | Each fragment **travels to and becomes its own aperture** (International→left, Eventus→centre, Luxe→right): converge to centre, then fan out to the three columns. This literalises "converge into ORAC, then reopen as three destinations." |
| The gold ring | **Refine** | Reads grey/blue and small in `k-01` while cycling accent colours; the "gold" idea isn't legible until it settles. | Larger, gold‑biased throughout the cycle; it is the focal point of convergence and the seed of the gold thread. |
| The fork line (one line → three) | **Preserve (amplify slightly)** | `k-03/k-05`: present but very faint. Conceptually it *is* the origin of the continuity device. | Keep restrained, but make it clearly the gold thread being born, since every later section inherits it. |
| Resolved composition | **Preserve** | `op-06-resolved`: wordmark + tagline + fork + three legible, distinct apertures with eyebrows and names. Strong and correct. | Unchanged as the resting/returning‑visitor state. |
| Total duration & "play once per session" gate | **Preserve** | ~1.9 s desktop / ~1.3 s compact; `sessionStorage['orac-opening-seen']`; skipped under reduced motion. Good for returning‑visitor usability. | Keep the gate; the retimed sequence stays within ~2.0–2.2 s. |
| Copy | **Preserve** | "ORAC Holdings" · "A House of Businesses. Built on Vision, Discipline, and Legacy." | Unchanged. |

**Net:** the opening keeps its concept and its resolved state, but is **retimed** (convergence then formation), **reframed** (fragments enter larger and hand off 1:1 into their apertures), and **refined** (Eventus readable, Luxe present, ring gold). Because this is a precisely sequenced, multi‑element orchestration, its strongest form is a **single GSAP timeline** (see §7) rather than the current bundle of independently‑delayed CSS keyframes — while the current CSS remains a valid fallback if GSAP adoption is deferred.

---

## 2. Reference principles (studied live — used as principles, never copied)

No layout, asset, colour, type, navigation, copy, or animation from any reference is reproduced. Only transferable principles:

**izanami-official.com** (primary benchmark)
- **Focus by subtraction.** A near‑monochrome full‑bleed world; a *single* short serif line ("Remember who you are") placed low‑left in vast negative space carries the entire frame. → ORAC: at each chapter's peak, quiet everything so one real asset + the thread carry the moment.
- **Cross‑dissolve, not stacked cuts.** Scenes change *within one continuous image world*; the next oversized serif heading rises from the bottom edge before the current one leaves. → ORAC boundaries hand material across, they don't hard‑cut.
- **Depth by framing.** A rectangular framed image (a water‑ripple) floats over a full‑bleed architectural environment. → ORAC: one framed foreground asset over a soft ground; no free‑floating decorative objects.
- **Type participates.** Vertical‑rotated section labels; a **leading horizontal rule before a link** ("— View Philosophy"). → This directly validates ORAC's existing gold eyebrow‑rule as the continuity thread.
- **Instrument feel.** Tiny functional metadata pinned to frame edges. → ORAC: small origin/route/edition labels at frame edges (data the content already has).

**apple.com**
- **One subject per full‑width panel, tone‑shifted.** MacBook Air on light‑blue, Pro on black — the background *tone* announces a new subject, while the internal hierarchy (name → one line → CTAs → floating hero product) is identical across panels, so the system reads as one. → ORAC: each venture keeps the shared chapter structure but gets a distinct background tone/accent; the product/photo floats with generous air.
- **Calm after a peak = order.** After a hero, a tidy grid of self‑contained panels reads as rest. → ORAC settles into Why/Leadership.

**microsoft.com/windows**
- **Atmospheric ground + soft depth layers.** A sky gradient with faint clouds top and bottom creates depth without literal parallax props; a frosted caption card is pinned to a corner; the brand mark sits centred as a focal motif. → ORAC: soft cream/ink grounds, one edge‑pinned label, the wordmark/thread as the centred constant. (Its "brings your worlds together, all in one place" is a useful tonal confirmation of "one origin, multiple worlds" — noted, not borrowed.)
- **Returning‑visitor usability.** Persistent top nav, quiet/skippable hero. → ORAC already self‑skips the opening after first session view; preserve.

---

## 3. Final assets (single selections, exact paths, crops)

No unresolved options. Text hazard = baked‑in logo/label pixels that must be cropped out.

### Continuity spine — opening convergence (each fragment is a real crop of the SAME photo its aperture uses)

| World | Asset | Crop / handling | Text hazard | Desktop | Mobile |
|---|---|---|---|---|---|
| International | `src/assets/images/international/catalog/coir-fiber.webp` | **Central bale texture only** — exclude top ~18% (ORAC INTERNATIONAL logo) and bottom ~22% ("COIR FIBER / NATURAL. DURABLE. SUSTAINABLE."). Portrait band. | Yes (logo top, caption bottom) | ✓ | ✓ (compact drops travel) |
| Eventus × Velorawed | `src/assets/images/eventus/wedding-couple.webp` | Full frame; centre on the seated couple. Clean. | No | ✓ | ✓ |
| Luxe × House of Azrin | `src/assets/images/luxe/fashion-atelier.webp` | Full frame; the white muslin on the form doubles as the seam subject. Clean. | No | ✓ | ✓ |

### ORAC International world

| Use | Asset | Crop / handling | Text hazard |
|---|---|---|---|
| Chapter hero (primary) | `international/catalog/red-chilli-powder.webp` | **Left ~58% only** — dried‑chilli basket, powder bowl, burlap. Exclude the right‑side "ORAC INTERNATIONAL / RED CHILLI" label panel. Deep reds, chiaroscuro — the strongest single International image. | Yes (right label) |
| Route/manifest texture set | `coir-fiber.webp` (central), `turmeric-powder.webp`, `millets.webp`, `cumin-seeds-powder.webp` | Tight product‑texture crops, avoiding any logo/caption band. Used small, in a "manifest/ledger" strip. | Yes on each → crop to product only |
| Geographic corridor | `GlobalReach` component (`react-simple-maps`, `public/geographies/countries-110m.json`) | Existing highlighted‑India map. Unchanged data. | No |

### ORAC Eventus × Velorawed world

| Use | Asset | Crop / handling | Text hazard |
|---|---|---|---|
| Frame/aperture device (entry) | `velorawed/wedding-film-camera.webp` | A cinematographer's monitor in sharp focus, framed subject on‑screen, event bokeh behind — a **literal aperture** and the truest "photographic frame / focus" content on the site. | No |
| Human moment (inside the frame) | `eventus/wedding-couple.webp` (candid intimacy) → then `eventus/eventus-hero.webp` (grand mandap) | Full frames; the focus‑pull resolves from the monitor into these. | No |
| Supporting frame vocabulary | `eventus/bridal-entry.webp`, `velorawed/wedding-videographer.webp`, `velorawed/camera-tripod.webp` | Optional secondary frames. | No |

### ORAC Luxe × The House of Azrin world

| Use | Asset | Crop / handling | Text hazard |
|---|---|---|---|
| Seam/material entry | `luxe/fashion-atelier.webp` | The draped muslin on the form; the seam‑thread device runs along the fabric edge. | No |
| Clean full‑bleed / mask fashion | `maison/looks/dresses/look-02.jpg` (ivory satin gown), plus one each from `maison/looks/co-ords`, `maison/looks/tunics`, `maison/looks/signature-bottoms` | Clean, text‑free portrait fashion on light grounds — ideal for clip‑path/seam reveals. | No |
| Material swatch tiles (optional) | `luxe/vault-xiii-palette.jpg` | **Individual swatch crops only** (ivory silk, emerald velvet, burnt sienna). Never full‑frame. | Yes (every swatch has a name + hex baked in) |
| Do **not** use full‑frame | `luxe/maison-collage.webp` | Has baked category labels (CO‑ORDS/DRESSES/…). Individual look crops only. | Yes |

### Brand marks (baked vector letterforms — brand‑correct, keep as identity)
`logos/orac-orange.svg` (wordmark) · `logos/orac-international.svg` · `logos/orac-eventus.svg` · `logos/orac-luxe.svg` · `logos/velorawed-gold.svg` · `logos/house-of-azrin.png`.

**No video assets exist in the project.** Nothing in this storyboard requires video.

---

## 4. The one shared element — the ORAC gold thread

A single 1px gold line is the site's through‑line. **It rests (static) inside each section and animates only during the boundary handoff (~500–800 ms), then settles. It is never continuously animated.** Its form and meaning change per section; the colour stays gold (`--gold #B8975A`) so it always reads as "this is ORAC," while the *shape* says "this is which world." It descends from the opening `origin-fork` and reuses the existing `.eyebrow::before` rule as its smallest resting form.

| # | Section | Thread state | Rest position |
|---|---|---|---|
| 1 | Opening | **Fork** — one line splits into three (born from the ring). | Under the wordmark, connecting to the three apertures. |
| 2 | HoldingIntro | **Spine** — the fork's legs relax into one vertical hairline. | Left of the statement column, full section height. |
| 3 | International | **Route** — the spine tilts into a trade‑route polyline with two nodes. | Bridging the text column to the product frame. |
| 4 | Global Reach | **Corridor** — the route lifts off the layout and becomes India→destination arcs on the map. | On the map, anchored at India. |
| 5 | Eventus | **Frame edge** — a corridor endpoint becomes the bezel/edge of the photographic frame. | Around the camera‑monitor / image frame. |
| 6 | Luxe | **Seam** — the frame edge thins into a running stitch along fabric. | Along the garment/muslin edge. |
| 7 | Why ORAC | **Divider** — the seam lays flat into one horizontal rule; motion calms. | Under the section statement, above the grid. |
| 8 | Leadership → Contact | **Guide** — the divider rotates to a short vertical line pointing to the CTA. | Centre, above "Contact Us." |

Continuity rule: at each boundary the thread is the element that *does not cut* — it morphs from one state to the next, and that morph **is** the transition.

---

## 5. Scene‑by‑scene storyboard

Ten scenes. Each scene's **Transition** block defines the boundary to the next section, so all eight required boundaries are specified. Durations reference existing tokens: `--ease-smooth: cubic-bezier(0.22,1,0.36,1)`; base reveal 560 ms; `--gold #B8975A`; venture accents `--accent-international` (navy‑blue), `--accent-eventus` (rose), `--accent-luxe` (green).

Legend for **Tech**: `CSS` = CSS transition/keyframe; `Reveal` = existing `Reveal`/`ImageReveal` IntersectionObserver; `GSAP` = GSAP timeline; `ST` = GSAP ScrollTrigger (scrub); `SVG` = inline SVG path (`stroke-dashoffset`); `clip` = `clip-path`/mask.

---

### SCENE 1 — Opening: Convergence & Formation
*Component: `HomeHero` → `OriginSequence` (`.is-opening`). Contact‑sheet frames: initial, converging, formation.*

- **Narrative purpose:** Three real business worlds exist independently, converge into ORAC, and ORAC resolves as the parent identity.
- **Real assets:** `coir-fiber.webp` (central crop), `wedding-couple.webp`, `fashion-atelier.webp`; `logos/orac-orange.svg`; the gold ring + fork (SVG).
- **Initial frame:** cream ground. Three fragments off the three edges — International entering from lower‑left (route‑line drawing across it, two nodes), Eventus from top (readable at ~40% blur inside a soft frame), Luxe from lower‑right (full opacity). Gold ring centred, gold‑biased, pulsing once. No wordmark yet.
- **Final frame:** wordmark `ORAC` centred and unoccluded; eyebrow "ORAC Holdings" above; tagline below; the gold **fork** drawn from a point under the wordmark toward three column positions. Fragments have travelled to those columns (Scene 2 takes over).

**Composition** — Layers back→front: (1) cream ground; (2) gold ring; (3) three photo fragments; (4) fork SVG; (5) wordmark + eyebrow + tagline. Fragments enter at ≈ aperture width (not thumbnail size). Wordmark centred; type stack centred within the first viewport, zero scroll required.

**Motion** — Retimed vs. today:
- 0–620 ms **converge:** each fragment travels edge→centre on `--ease-smooth`; International's route‑line draws (`SVG`), Eventus deblurs 40%→8% + bars retract, Luxe fold‑mask opens. Ring holds gold and contracts slightly as the focal point.
- 620–820 ms **clear & form:** fragments shrink/settle out of the wordmark's optical box; wordmark scales 0.98→1 + fades in *after* the centre is clear (fixes the occlusion in `k-03`); eyebrow + tagline rise 10px.
- 820–1150 ms **fork births the thread:** fork line draws from the ring's base into three legs (`SVG`). Fragments fan from centre to their three column x‑positions (the handoff into Scene 2).
- **Plays once** per session (gate: `sessionStorage['orac-opening-seen']`), total ≈ 2.0–2.2 s. Nothing animates after settle (motion layers unmount).
- **Stable:** the nav and page frame; the cream ground.

**Transition (→ Scene 2 / Boundary implicit):** no cut — the three travelling fragments *become* the three resting apertures; the fork remains as the thread. The viewport does not scroll; Scene 2 is the same frame at rest.

**Responsive** — *Desktop/tablet:* full convergence. *393/360:* compact path (already implemented) — skip travelling fragments; wordmark + tagline resolve, then three apertures **band‑wipe** in as a vertical stack. The thread appears as a short centred fork above the stack. *Simplified:* spatial travel. *Removed:* edge‑entry fragments on ≤820px. *Essential:* three real photos are present and legible, wordmark resolves, thread is born.

**Accessibility & performance** — *Reduced motion:* render the resolved state instantly (Scene 2); no convergence. *Returning visitor:* same instant resolved state. *Loading:* wordmark SVG `fetchpriority="high"`; the three fragment photos are the aperture photos (`priority`), so no extra fetch. *Risk:* orchestrating 5 layers — mitigated by `transform`/`opacity`/`stroke-dashoffset` only (compositor‑friendly), and by unmounting motion layers on settle. *Acceptance:* wordmark never occluded at any frame; three worlds each legible for ≥1 beat; ≤2.2 s; 0 console errors; no CLS.
- **Tech:** **GSAP timeline** (single orchestrated sequence — the retimed convergence→formation→handoff genuinely needs sequencing). SVG for route/fork. **Fallback:** current CSS‑keyframe opening is acceptable if GSAP is deferred; reduced‑motion/returning = instant end‑state (CSS, already built).

---

### SCENE 2 — Opening: Three Worlds Resolved
*Component: `HomeHero` resting state. Contact‑sheet frame: worlds resolved. This is also the returning‑visitor / reduced‑motion default.*

- **Narrative purpose:** The three worlds reopen as selectable destinations under one identity.
- **Real assets:** the three aperture photos (as above) + `companyData` names/eyebrows: International "Global Trade," Eventus "Event Planning," Luxe "Fashion & Textiles."
- **Initial/Final frame:** wordmark + tagline; the gold **fork/thread** beneath; three equal apertures in a row (desktop) or stack (mobile), each a photo + scrim + eyebrow + name, each a link to its route.

**Composition** — Wordmark centred top; thread; three apertures on one baseline, equal width, `--rule` hairline frame. Names in display serif, eyebrows in tracked caps with the gold rule. Background cream.

**Motion** — At rest: **none.** On hover/focus (desktop): the hovered aperture lifts 4px + scrim lightens 6% (reuse existing card‑hover language); the thread under it brightens subtly to point at it. Keyboard: same on focus.

**Transition (→ HoldingIntro / BOUNDARY 1 — Origin→HoldingIntro):** as the user scrolls, the three apertures do **not** all leave together — the two outer apertures ease outward/under and fade, the centre keeps briefly, and the fork's three legs **relax into one vertical line** (the Spine) that carries down into HoldingIntro. The next statement's first line rises from below before the apertures fully clear (Izanami cross‑dissolve). Thread state 1→2.

**Responsive** — *Desktop/tablet:* row of three. *393/360:* vertical stack (verified `m393-hero`/`m360-hero`); hover→tap, no lift. *Essential:* three destinations selectable, wordmark anchored.

**Accessibility & performance** — All three apertures are real links with `aria-label`; keyboard order International→Eventus→Luxe. Focus ring on each. *Reduced motion:* boundary morph becomes an instant swap (thread just appears as the spine). *Acceptance:* every aperture keyboard‑reachable; contrast of eyebrow/name over scrim ≥ AA.
- **Tech:** `CSS` (rest + hover) · boundary morph `GSAP`+`ST` (short, scroll‑linked) · `Reveal` for HoldingIntro's incoming line.

---

### SCENE 3 — HoldingIntro: The House
*Component: `HoldingIntro` (`#about`). Frame: credibility of origin. Fixes the duplicated‑heading defect.*

- **Narrative purpose:** State what the house is, calmly, before entering any single world.
- **Real assets:** existing copy ("ORAC Holdings is the parent house…"), the statement **"We build institutions designed to endure."** (used **once**), the gold **Spine**.
- **Initial frame:** statement heading left, body right, the Spine as a vertical hairline down the left edge of the content, its top just caught from Scene 2.
- **Final frame:** same, fully revealed; Spine at rest full‑height.

**Composition** — Two‑column: display statement left, 3 body paragraphs right. **Remove the second, duplicate rendering of the statement** (currently printed again below the body — see `sec-02-holding`). The Spine sits in the left gutter as the section's structural axis. No image (correct — this is a breath between the opening and the worlds). Generous negative space (Izanami restraint).

**Motion** — On enter: Spine draws top→bottom once (300 ms, `SVG`/`CSS`), then rests. Statement + paragraphs use the standard `Reveal` (fade + 14px rise, 560 ms, index stagger). No other motion. Nothing scroll‑scrubbed here — this is a calm beat.

**Transition (→ International / BOUNDARY 2 — HoldingIntro→International):** the Spine **tilts** at its lower end and extends into the first segment of the International **route** as the chapter scrolls in; the International eyebrow ("ORAC International") rises with the route's first node. Thread state 2→3. Background stays cream (no tonal shift yet).

**Responsive** — *Desktop:* two‑column. *Tablet:* narrow the body column (`--max-narrow`). *393/360:* single column, statement then body; Spine becomes a short rule under the eyebrow only. *Removed:* the duplicate heading, at all widths. *Essential:* one clear statement, calm.

**Accessibility & performance** — Semantic `<section aria-labelledby>`; one `<h2>`. *Reduced motion:* Spine appears drawn; reveals show end‑state. *Acceptance:* the statement appears exactly once in the DOM; no overflow.
- **Tech:** `Reveal` + `CSS`/`SVG` Spine. No GSAP (ordinary reveal — do not over‑engineer).

---

### SCENE 4 — International: Products & Route
*Component: `VentureChapter` tone=international. Frame: International entry. Turns an ordinary split into an operational world.*

- **Narrative purpose:** Enter International through real products, chosen categories, and operational precision.
- **Real assets:** `red-chilli-powder.webp` (left crop, no label), the manifest texture set (`coir-fiber` central / `turmeric-powder` / `millets` / `cumin-seeds-powder`, tight crops), existing copy ("Export and import trading across chosen categories" + the three category bullets), the gold **Route**.
- **Initial frame:** left column — eyebrow, serif heading, copy, three category rows; right — the product frame holding the chilli crop, the Route entering from the top‑left as one drawn node.
- **Final frame:** product frame filled; Route drawn across the frame corner to a second node near the "Global Trade" edge label; category rows settled.

**Composition** — Keep the shared chapter structure (text left / frame right) **but** differentiate: precise, subject‑aware crop (chilli product only, no baked label — unlike `sec-03` today which shows the full branded card); a small **edge label** ("ORIGIN · INDIA", from the data) pinned to the frame's lower‑left (Izanami instrument feel); a thin **manifest strip** of 3–4 tiny product‑texture crops along the base of the text column, reading like a ledger. Accent: `--accent-international` on the eyebrow rule and Route. Background: cream (International is operational, kept bright).

**Motion** — Scroll‑linked (`ST`, scrub, gentle):
- As the chapter enters, the **Route** draws (`SVG stroke-dashoffset`) from the incoming node across the top of the product frame to a node at the frame's far edge — the thread as a trade corridor. ≤ one viewport of scroll drives 0→100% of the draw; then it rests.
- The product frame does a restrained **reveal‑crop:** the chilli image is masked from the left edge inward as it enters (`clip`), so the product "arrives" like cargo rather than fading. 500 ms equivalent, mapped to entry.
- Manifest texture crops reveal in sequence (`Reveal`, index stagger) — no scrub.
- **Stable:** text column position; only the Route + frame mask respond to scroll, and only through the entry band (not for the whole section).

**Transition (→ Global Reach / BOUNDARY 3 — International→GlobalReach):** the Route's far node **lifts off the product frame** and, as Global Reach scrolls in, redraws as the first India→destination **corridor arc** on the map; the "Our Global Reach" heading rises beneath. Thread state 3→4. The product frame eases up and out (no hard cut).

**Responsive** — *Desktop:* text + frame + Route + manifest strip. *Tablet:* keep, narrower text. *393/360:* single column — eyebrow/heading/copy/bullets/CTA, then the framed product (verified `m393-intl`); Route becomes a short drawn segment beside the eyebrow only; manifest strip → a single texture crop or omitted. *Simplified:* scrub → one‑shot reveal on mobile. *Removed:* manifest strip on 360. *Essential:* real product (no baked label), category clarity, a hint of the route.

**Accessibility & performance** — Product `alt` describes the goods; edge label is real text, not baked. *Reduced motion:* Route shows drawn, frame shows filled, no scrub. *Perf:* one `ScrollTrigger`; images already local `.webp`; crop via CSS (no new asset). *Acceptance:* no baked‑in ORAC label visible in the crop; scrub stays 60fps (transform/clip only); no layout shift from the manifest strip (reserve height).
- **Tech:** `ST` (Route draw + entry crop) · `SVG` Route · `clip` frame · `Reveal` manifest.

---

### SCENE 5 — Global Reach: Corridors
*Component: `GlobalReach` variant=home. Frame: Global Reach connection. Enhances the existing static map.*

- **Narrative purpose:** International's precision opens into geographic connection — one origin (India) reaching chosen corridors.
- **Real assets:** the existing `react-simple-maps` world map (India highlighted red, focus countries navy), the three stat tiles (30 focused countries / 5 regional corridors / India based operation), existing copy, the gold **Corridor** arcs.
- **Initial frame:** "OUR GLOBAL REACH" centred; map below with India highlighted; no arcs yet (or arcs undrawn).
- **Final frame:** 3–5 thin gold corridor arcs drawn from India to focus regions; stat tiles settled; arcs at rest.

**Composition** — Keep the current centred heading + map + stat tiles (`sec-04` is already the second‑strongest moment). Add: gold **arcs** from the India centroid to a small set of focus‑region centroids (Asia, Africa, Middle East, Europe, Americas) — using the map's own projection so they're geographically real, not decorative. Arc count = the real "5 regional corridors." Background cream.

**Motion** — Scroll‑linked (`ST`, scrub): as the section centres, arcs draw from India outward (`SVG stroke-dashoffset`) one after another, mapped to the entry band; a soft node pulses once at each destination as its arc completes; then **all motion stops** — the map is calm at rest (no looping). The map itself does not spin or auto‑pan.

**Transition (→ Eventus / BOUNDARY 4 — GlobalReach→Eventus):** one arc's destination **node becomes the corner of a photographic frame** — the gold corridor edge curves into the bezel of Eventus's camera‑monitor frame as Eventus scrolls in; the map desaturates/eases back. "Building celebrations…" rises. Thread state 4→5. This is the pivot from geographic precision to human moments.

**Responsive** — *Desktop/tablet:* map + arcs + tiles. *393/360:* the map is already reduced on mobile; draw **2–3** arcs only, thicker, from India to the nearest destinations; stat tiles stack above (verified `m393-global`). *Simplified:* fewer arcs, no per‑node pulse on 360. *Essential:* India as origin, corridors as real connections.

**Accessibility & performance** — Map remains decorative with the stat tiles carrying the facts as text; arcs `aria-hidden`. *Reduced motion:* arcs drawn, no scrub, no pulse. *Perf:* arcs are a handful of SVG paths over the existing SVG map — negligible. *Acceptance:* arc endpoints land on real country centroids; numbers match `GlobalReach` data; no scrub jank on the SVG map.
- **Tech:** `ST` (arc draw) · `SVG` arcs over existing `react-simple-maps`.

---

### SCENE 6 — Eventus × Velorawed: Frame & Focus
*Component: `VentureChapter` tone=eventus. Frame: Eventus transition. Turns the ordinary split into a cinematographer's frame.*

- **Narrative purpose:** Geographic precision transforms into human moments — memory, emotion, execution — seen *through a lens*.
- **Real assets:** `velorawed/wedding-film-camera.webp` (the monitor/aperture), resolving to `eventus/wedding-couple.webp` then `eventus/eventus-hero.webp`; existing copy ("Building celebrations that are felt, not just seen." + bullets incl. "Photography and cinematography through VELORAWED"); `logos/velorawed-gold.svg`; the gold **Frame edge**.
- **Initial frame:** the camera **monitor** on the right, its on‑screen subject slightly soft; the gold thread as the monitor's bezel; text left.
- **Final frame:** a focus‑pull completes — the framed image sharpens and the frame "opens" to the human moment (couple / mandap); the bezel rests as the frame edge; Velorawed credited at the frame's corner.

**Composition** — Shared structure (text left / frame right) but the *frame is the subject*: the image sits inside a photographic frame with the gold edge and a small corner label "VELORAWED · [role]" (instrument feel). Warmer, slightly slower pacing than International (content is emotional, per brief). Accent: `--accent-eventus` (rose) on eyebrow rule + frame edge. Background: cream, a touch warmer.

**Motion** — Scroll‑linked (`ST`, scrub), the one genuine "focus‑pull":
- Through the entry band, the framed image goes **blur 6px→0 + scale 1.04→1** while faint letterbox bars retract — a rack‑focus that resolves the human moment. This is the Eventus signature and it is *content* (a camera literally focusing), not a generic effect.
- The gold **frame edge** draws around the image (`SVG`) as the focus resolves.
- Optionally, at full focus the on‑screen subject **cross‑fades** monitor→`wedding-couple`→(deeper scroll)→`eventus-hero` (Izanami cross‑dissolve within one frame), each fade ≤ 400 ms, only across the section's scroll span.
- **Stable:** text column; the frame position. Motion only within the entry/scroll band, then rest.

**Transition (→ Luxe / BOUNDARY 5 — Eventus→Luxe):** the gold **frame edge thins and detaches** from the top‑right corner, becoming a **running stitch** that travels into Luxe along the muslin's edge as Luxe scrolls in; the Eventus image eases back. "Fashion shaped around cloth…" rises. Thread state 5→6.

**Responsive** — *Desktop/tablet:* full focus‑pull + frame. *393/360:* single column text then framed image (verified `m393-eventus`/`m360-eventus`); replace scrubbed focus‑pull with a single blur‑in on reveal; no monitor cross‑fade chain (show one image). *Simplified:* scrub→one‑shot. *Essential:* a human moment seen through a real photographic frame.

**Accessibility & performance** — Image `alt` describes the moment; Velorawed corner label is real text. *Reduced motion:* image shows sharp/resolved, frame drawn, no blur animation. *Perf:* animate `filter: blur` sparingly and only on one framed element within view; prefer resolving to 0 blur quickly to avoid sustained blur cost; `transform`/`opacity` elsewhere. *Acceptance:* focus‑pull ends fully sharp; blur never persists at rest; 60fps on the single framed element.
- **Tech:** `ST` (focus‑pull + edge draw + optional cross‑fade) · `SVG` edge · `clip`/mask letterbox.

---

### SCENE 7 — Luxe × The House of Azrin: Seam & Cloth
*Component: `VentureChapter` tone=luxe. Frame: Luxe transition. Turns the split into material craft.*

- **Narrative purpose:** Eventus imagery transforms into Luxe material — fabric, seam, craft, restraint.
- **Real assets:** `luxe/fashion-atelier.webp` (muslin on the form) resolving to a clean `maison/looks/dresses/look-02.jpg` (ivory satin); existing copy ("Fashion shaped around cloth, craft, and restraint." + bullets); optional `vault-xiii-palette.jpg` swatch crops; the gold **Seam**.
- **Initial frame:** the atelier muslin on the right, the gold thread arriving as a **running stitch** along the fabric edge; text left.
- **Final frame:** the stitch completes along a seam; the frame resolves to the clean garment image via a **seam‑wipe** (`clip` travelling along the stitch line); a small swatch/edition label at the corner.

**Composition** — Shared structure, material‑led: the image is revealed *by the seam*, not by a fade. Slowest, most restrained pacing of the three (brief's Luxe = restraint). Accent: `--accent-luxe` (green) on eyebrow rule + stitch. Background: cream, coolest of the three. Optional: 2–3 tiny `vault-xiii` swatch crops as a material chip‑row (like International's manifest, but fabric).

**Motion** — Scroll‑linked (`ST`, scrub):
- The gold **seam/stitch** draws along the garment edge (`SVG stroke-dashoffset`, dashed to read as stitches) through the entry band.
- A **seam‑wipe** (`clip-path` moving along the stitch) reveals the clean `maison` look from behind the atelier image — cloth "made" rather than faded in.
- Swatch chips reveal in sequence (`Reveal`).
- **Stable:** text column; then all rests — no fabric flutter, no loop.

**Transition (→ Why ORAC / BOUNDARY 6 — Luxe→WhyOrac):** the **seam lays flat** — the stitched line straightens and rotates to a single horizontal **divider** under the "Why ORAC" statement as it scrolls in; motion visibly **calms** here (this is where the page settles into credibility). Thread state 6→7.

**Responsive** — *Desktop/tablet:* seam draw + seam‑wipe + chips. *393/360:* single column text then image; seam becomes a short stitched rule beside the eyebrow; replace seam‑wipe with a straight clip‑reveal on enter; drop chips. *Simplified:* scrub→one‑shot. *Essential:* a real material/garment revealed by a seam, restraint.

**Accessibility & performance** — Garment `alt`; swatch chips decorative. *Reduced motion:* garment shown resolved, seam drawn, no wipe scrub. *Perf:* `clip-path` + `stroke-dashoffset` only; one ScrollTrigger. *Acceptance:* no baked swatch text visible; seam‑wipe fully reveals the clean look; calm at rest.
- **Tech:** `ST` (seam draw + seam‑wipe) · `SVG` stitch · `clip` wipe · `Reveal` chips.

---

### SCENE 8 — Why ORAC: Credibility Settles
*Component: `WhyOrac`. Frame: credibility settling. Motion becomes calm after the three worlds.*

- **Narrative purpose:** After experiencing all three worlds, the page settles into trust.
- **Real assets:** existing statement ("A business house built with clarity and discipline.") + subcopy + the five reason panels (Clear structure / Professional execution / Quality discipline / Long‑term intent / Partner‑led growth); the gold **Divider**.
- **Initial/Final frame:** statement + subcopy over the Divider; the five reason cards in the existing grid, revealing calmly.

**Composition** — Keep `sec-07`'s layout: statement + subcopy, then the reason grid. Add the single horizontal **Divider** (thread state 7) between statement and grid as the one gold element — no per‑card accents, no images (this is support material, per brief). Apple's "calm = order": the grid reads as an orderly rest after the peaks.

**Motion** — **Deliberately quiet.** Divider draws once L→R (300 ms) on enter, then rests. Cards use the standard `Reveal` (index stagger). **No scrub, no scroll‑linked transforms** — this is where cinematic motion intentionally stops.

**Transition (→ Leadership / BOUNDARY 7 — WhyOrac→Leadership):** the Divider **stays put and persists** into Leadership as the same horizontal rule under the leadership eyebrow — the quietest boundary, signalling the story is winding down. No dramatic morph. Thread state 7 held.

**Responsive** — *Desktop:* statement + 5‑card grid. *Tablet/mobile:* grid reflows to 2‑col / 1‑col (existing). Divider spans the content width. *Essential:* five reasons legible, calm.

**Accessibility & performance** — Cards are semantic list items; headings correct level. *Reduced motion:* divider drawn, cards end‑state. *Perf:* trivial (reveals + one line). *Acceptance:* no scroll‑linked motion here (verifiable), matching the "calm after peak" intent.
- **Tech:** `Reveal` + `CSS`/`SVG` divider. No GSAP.

---

### SCENE 9 — Leadership: Calm
*Component: `Leadership`. Frame: (bridges credibility→contact). Leadership appears late, per brief and decisions.*

- **Narrative purpose:** The people behind the house, stated plainly, after value is established.
- **Real assets:** existing leadership tiles (names, roles, focus) from `companyData` — e.g. Ohm Pranav, **Managing Director**; the gold rule held from Scene 8. No leadership photography exists and none is invented.
- **Initial/Final frame:** eyebrow + the held horizontal rule; the leadership tiles in a calm grid.

**Composition** — Text‑led tiles, generous spacing, the single held rule as the only gold. No cards‑as‑worlds treatment — leadership is not a "world." Background cream.

**Motion** — Minimal: tiles `Reveal` with index stagger; nothing else. No scrub.

**Transition (→ Contact / BOUNDARY 8 — Leadership→Contact):** as Contact's ink‑dark panel scrolls up, the held horizontal rule **rotates to a short vertical guide** line pointing down toward the "Contact Us" CTA, and the gold carries from cream onto the dark ground (a rare deliberate tonal shift, Apple‑style, marking the ending). "Explore the right ORAC venture…" rises in white. Thread state 7→8.

**Responsive** — *Desktop:* tile grid. *Mobile:* tiles stack. *Essential:* names/roles correct and legible.

**Accessibility & performance** — Real roles only (Managing Director, etc.); no fabricated titles. *Reduced motion:* reveals end‑state; rule rotation instant. *Acceptance:* leadership sits late in the DOM (after the worlds and Why), matching the confirmed decision.
- **Tech:** `Reveal` only; boundary rule‑rotation `CSS`/short `ST`.

---

### SCENE 10 — Contact: The Close
*Component: `ContactCTA` (+ footer). Frame: contact ending. Calm final guide.*

- **Narrative purpose:** Leadership and contact complete the story calmly; the house invites a conversation.
- **Real assets:** existing closing statement ("Explore the right ORAC venture or start a conversation."), "Contact Us" CTA → `/contact`; footer (ORAC Holdings, businesses, contact); the gold **Guide**.
- **Initial/Final frame:** ink‑dark panel; centred white statement; the gold **vertical guide** line above the CTA; footer below.

**Composition** — Keep the ink‑dark close (`sec-09` — it already gives real closure). The gold guide is the last state of the thread: a short vertical line drawing the eye from the statement to the CTA. Wordmark reappears in the footer as the constant. This mirrors the opening (dark‑resolves‑to‑invitation vs. light‑resolves‑to‑worlds), closing the loop.

**Motion** — On enter: the statement `Reveal`s; the **guide** draws top→down once toward the CTA (300 ms), then rests. CTA has the existing hover. No scrub, no loop — the calmest scene.

**Transition:** terminal — the guide points into the CTA; the footer is static. The journey ends where it can restart (a link back into a world).

**Responsive** — *Desktop:* centred statement + CTA + guide, footer columns. *Mobile:* stack; guide shortens; footer stacks (verified `m393-contact`). *Essential:* one clear invitation + working contact routes.

**Accessibility & performance** — CTA is a real link; contrast of white/gold on ink ≥ AA. *Reduced motion:* guide drawn, statement end‑state. *Acceptance:* CTA reachable, routes valid, dark‑mode contrast holds.
- **Tech:** `Reveal` + `CSS`/`SVG` guide.

---

## 6. Boundary summary (all eight)

| # | Boundary | Continuity element | What must not cut |
|---|---|---|---|
| 1 | Origin → HoldingIntro | Fork legs relax into the vertical **Spine**; next line rises before apertures clear | the thread; the wordmark's role as anchor |
| 2 | HoldingIntro → International | Spine tilts into the first **Route** segment + first node | the thread; cream ground (no tonal jump yet) |
| 3 | International → GlobalReach | Route's far node lifts into the first **corridor arc** on the map | the thread; the sense of "route" becoming "geography" |
| 4 | GlobalReach → Eventus | A corridor node curves into the **frame edge** of the camera monitor | the thread; the pivot precision→emotion |
| 5 | Eventus → Luxe | Frame edge detaches into a running **seam/stitch** along fabric | the thread; frame→material logic |
| 6 | Luxe → WhyOrac | Seam lays flat into a horizontal **Divider**; motion calms | the thread; the deliberate settling |
| 7 | WhyOrac → Leadership | Divider **persists** (held) | calm; no dramatic move |
| 8 | Leadership → Contact | Divider rotates to a vertical **Guide**; gold carries onto ink‑dark ground | the thread; the loop‑closing tonal shift |

Native vertical scroll is retained throughout. **No** scroll hijacking, forced scroll speed, horizontal‑scroll site, long pinned sections, constant parallax, per‑line text animation, or motion that delays information. Every scroll‑linked effect fires only across its section's entry band and then rests.

---

## 7. Technical recommendation (per scene) — Hybrid

Approved posture: **GSAP + ScrollTrigger only where sequencing or scroll‑progress genuinely benefits; existing CSS + IntersectionObserver `Reveal` for everything ordinary.** GSAP `^3.15.0` is already in `package.json` (currently unused), so this adds **no new dependency**. Do not move hover states or ordinary reveals into GSAP.

| Scene | Primary tech | Uses GSAP? | Why |
|---|---|---|---|
| 1 Opening convergence | **GSAP timeline** + SVG | Yes | Precise multi‑layer sequencing (converge→form→handoff); the retiming can't be reliably expressed as independent CSS delays. |
| 2 Worlds resolved | CSS (rest/hover); GSAP+ST for the boundary morph | Partial | Rest is static; only the scroll‑linked fork→spine morph needs ST. |
| 3 HoldingIntro | Reveal + CSS/SVG spine | No | Ordinary reveal; a drawn line. |
| 4 International | **ST** (route draw + entry crop) + SVG + clip + Reveal | Yes | Route draw and cargo‑crop are genuine scroll‑progress. |
| 5 Global Reach | **ST** (arc draw) + SVG over react‑simple‑maps | Yes | Arcs drawing with scroll = scroll‑progress. |
| 6 Eventus | **ST** (focus‑pull + edge draw + optional cross‑fade) + SVG + clip | Yes | Rack‑focus tied to scroll is the signature. |
| 7 Luxe | **ST** (seam draw + seam‑wipe) + SVG + clip + Reveal | Yes | Seam progress along scroll. |
| 8 Why ORAC | Reveal + CSS/SVG divider | No | Deliberately calm. |
| 9 Leadership | Reveal; CSS/short ST for rule rotation | Minimal | Calm; tiny boundary move. |
| 10 Contact | Reveal + CSS/SVG guide | No | Calm close. |

Shared implementation notes: keep every scroll effect `transform`/`opacity`/`stroke-dashoffset`/`clip-path` only (compositor‑friendly); one `ScrollTrigger` per scene, `scrub` bound to the entry band, killed after settle; SVG thread as a single reusable component whose `d`/state changes per section; the thread's smallest resting form reuses the existing `.eyebrow::before` gold rule.

---

## 8. Reduced motion, performance, accessibility (master spec)

**Reduced motion (`prefers-reduced-motion: reduce`) — non‑negotiable.** The global CSS block already neutralises CSS transitions/animations and forces `.reveal`/`.image-reveal` to their end‑state and hides `.origin-forces`/`.origin-ring`. **GSAP is not auto‑neutralised** — every GSAP/ScrollTrigger scene (1, 2‑boundary, 4, 5, 6, 7, 9‑boundary) must be wrapped in `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch that **renders the final state instantly and creates no ScrollTriggers.** Static fallback per scene is defined in each scene's Accessibility block (all resolve to the "Final frame").

**Static fallbacks:** every scene has a defined resolved end‑state that is a complete, correct composition on its own (no scene depends on motion to be legible). Returning visitors (opening gate) and reduced‑motion users see these.

**Image loading:** wordmark SVG `fetchpriority="high"`; the three opening/aperture photos `priority` (above the fold, shared between fragments and apertures — no duplicate fetch); every below‑the‑fold image keeps `SafeImage`'s `loading="lazy"`/`decoding="async"`; reserve aspect‑ratio boxes for all framed media (no CLS). The International catalog `.webp`s are 300–350 KB — acceptable for the single hero crop; do not load the full manifest set at full size (use small crops).

**Performance risks & limits:** the two heaviest new costs are (a) the Eventus `filter: blur` focus‑pull — restrict to one framed element in view and resolve to 0 quickly; (b) SVG `stroke-dashoffset` scrubs — cheap, but keep paths short. No animation library beyond the already‑present GSAP. No new fonts, no WebGL, no canvas. Budget: no measurable CLS regression from today; scrubbed scenes must hold 60fps on the framed element.

**Accessibility:** all apertures/CTAs are real keyboard‑reachable links with `aria-label`; thread SVGs are `aria-hidden`; edge/corner labels are real text (not baked pixels); focus states preserved; per‑venture accent colours must pass WCAG AA over cream and over ink before use; heading hierarchy unchanged.

---

## 9. Acceptance criteria

The storyboard is satisfied by an implementation when:

- [ ] Every movement is tied to a named real ORAC asset with an exact path and crop (no lone glow/polygon/particles/spinning globe/abstract objects anywhere).
- [ ] The opening is the **retimed/reframed** version (convergence → formation with the wordmark never occluded; fragments hand off 1:1 into their apertures; Eventus readable, Luxe present, ring gold), not the current occluding sequence.
- [ ] HoldingIntro renders its statement **once** (duplicate removed).
- [ ] International shows the product **without** any baked‑in ORAC label in the crop.
- [ ] All eight boundaries morph the single gold thread from its prior state to its next; the thread is never continuously animated and rests inside every section.
- [ ] Each of the three venture chapters is visually distinct (route / focus‑pull / seam) while sharing one structure, one type system, one motion vocabulary.
- [ ] Motion is present at the opening and the three worlds and **visibly calms** from Why ORAC onward.
- [ ] Desktop, tablet, 393, and 360 behaviour is defined and holds (opening compact stack; chapters single‑column; scrubs → one‑shot on mobile).
- [ ] Every GSAP scene has a `matchMedia` reduced‑motion branch rendering the end‑state; returning visitors get resolved states.
- [ ] Native vertical scroll retained; no hijack/pin/forced‑speed; 0 console errors; no CLS regression.
- [ ] A single implementation session could build this without inventing a creative decision.

---

## 10. Visual evidence

See **[orac-storyboard-contact-sheet.html](orac-storyboard-contact-sheet.html)** — a labelled contact sheet built from the real capture session (frames explicitly marked **REAL CAPTURE — current build** vs. **DIRECTION note**, so nothing is presented as a finished render that isn't). It carries the ten story beats (opening initial → converging → ORAC formation → worlds resolved → International → Global Reach → Eventus → Luxe → credibility → contact) alongside the selected ORAC assets and the gold‑thread state per beat.

Raw capture artifacts (session scratchpad, not committed): `homepage-opening.webm`, `homepage-scroll.webm`, opening keyframes `k-01…k-05` + `op-06-resolved`, section stills `sec-01…sec-09`, mobile `m393-*` / `m360-*`, references `refs/apple-*`, `refs/windows-*`, `refs/izanami-*`.

---

*ORAC cinematic storyboard completed. No source code, motion implementation, dependencies, routes, or production layouts were changed.*
