# ORAC Website — Working Instructions

This file is intentionally short. Detailed context lives in `docs/` — read what's relevant before substantial work, don't reload it all every time.

## Required context before substantial work

- [docs/ORAC-CREATIVE-BRIEF.md](docs/ORAC-CREATIVE-BRIEF.md) — full creative direction and rationale
- [docs/ORAC-DECISIONS.md](docs/ORAC-DECISIONS.md) — confirmed facts and open questions
- [docs/ORAC-REDESIGN-SPEC.md](docs/ORAC-REDESIGN-SPEC.md) — the approved (or pending-approval) redesign plan
- [docs/ORAC-CURRENT-AUDIT.md](docs/ORAC-CURRENT-AUDIT.md) — factual snapshot of the implementation as of the last audit
- The relevant components, routes, styles, and assets themselves — the repository is the source of truth for what's actually implemented, not any document's description of it.

For small, isolated fixes (a typo, a broken link, a style nudge), read the file you're touching and go — the full context load above is for substantial design/dev work.

## Project objective

Build a distinctive, premium, cinematic, editorial website for ORAC Holding. Combine the clarity and credibility of the existing site with the creative authorship of the approved references (see creative brief). Never copy a reference directly — the result must be original and specific to ORAC.

## Brand structure

- Parent: **ORAC Holding** (verify exact spelling against live site content before changing — see Decisions doc for a known naming conflict)
- Active ventures: **ORAC International**, **ORAC Eventus** (× **VELORAWED**), **ORAC Luxe** (× **The House of Azrin**) — exactly three. A 4th venture ("ORAC Evolution") appeared in earlier planning notes; confirmed a mistake and dropped — do not reintroduce it.
- Never invent services, achievements, clients, numbers, partnerships, awards, or testimonials.

## Central creative principle

**One origin. Multiple worlds.** ORAC Holding is the origin; each venture is a distinct world within one ecosystem. Treat this as a design/narrative system to express structurally — not a slogan to print on the page.

## Strict implementation rules

- Inspect before editing. Preserve correct content and working functionality.
- Never rebuild from scratch unless explicitly instructed.
- Don't redesign unrelated sections or make broad changes when the scope is narrow.
- Don't add packages unless genuinely necessary (current stack: React 18, Vite, react-router-dom, react-simple-maps, lucide-react — no animation library).
- Reuse the existing architecture (data/components/sections/pages split, CSS partials in `src/styles/partials/`) when it fits.
- Avoid: generic templates, excessive cards, unnecessary glassmorphism, neon gradients, cursor blobs, purposeless parallax, floating shapes, animation without narrative or functional purpose, gold as the sole luxury signal.
- Leadership content belongs later in the homepage journey, not near the top.
- Mobile layouts must be intentionally recomposed, not shrunk desktop layouts.
- Respect `prefers-reduced-motion`. Protect accessibility, usability, and performance.
- Never claim something was tested unless it was actually tested.

## Working process for substantial tasks

1. Inspect 2. Diagnose 3. Plan 4. Implement only the approved scope 5. Build and lint 6. Inspect the rendered result (all four breakpoints: 1440 / 1024 / 768 / 390) 7. Compare against acceptance criteria 8. Fix issues 9. Review the final diff 10. Report exactly what changed

## Known regressions — do not reintroduce

- **Never call `ScrollTrigger.refresh()` directly, and never modify `refreshNow()`/`requestRefresh()` in `src/motion/gsap.js`.** Always call `refreshNow()` or `requestRefresh()` as they exist today. Both must stay bare — `if (ScrollTrigger.isRefreshing) return; ScrollTrigger.refresh();` for `refreshNow()`, nothing wrapping it. This was fixed once (commit `15b960f`) and twice regressed on top of that fix in the same session (2026-08-30) purely from well-intentioned edits to `src/motion/gsap.js` that didn't know the constraint existed — read the whole file, and this section, before touching it or any component that calls `refreshNow`/`requestRefresh`.
  - **`refreshNow()` MUST be synchronous, same tick, with no wrapping logic of any kind — not even something that looks harmless.** It exists so every newly created `ScrollTrigger` is measured via GSAP's safe, snapshot-based `_refreshAll` *before* the browser can process another event — see the long comment above it in `gsap.js` for the exact GSAP internals bug this prevents. Deferring it by even a `queueMicrotask`, or wrapping it in anything that reads/writes `window.scrollY` or `document.documentElement.style`, reopens that race. **Confirmed regression (2026-08-30):** deferring `refreshNow()` via `queueMicrotask` to batch same-tick Reveal mounts caused GSAP's own internals to throw `Cannot read properties of undefined (reading 'end')` from inside `ScrollTrigger.create()` on ordinary route navigation (e.g. clicking a nav link to `/eventus`) — with no error boundary in the tree, React unmounted the whole app, which looked to a visitor exactly like "the new page doesn't load" and, because the outgoing route's DOM stayed on screen until the crash, "navigating doesn't scroll to top" — both from the same underlying cause.
  - **A second, separate regression from the same session:** a version of this fix wrapped `refreshNow()`/`requestRefresh()` site-wide with save-scroll-before/restore-scroll-after logic (to fix the WebKit bug described below). That fixed the WebKit bug but broke ordinary navigation a *different* way: every route's own mount-time Reveals went through the same wrapper, and each one's "restore to whatever `window.scrollY` was when I was called" fought `App.jsx`'s `ScrollManager`, which legitimately resets scroll to 0 on every route change — confirmed via `window.scrollTo` instrumentation, the wrapper's restores won by sheer repetition (dozens of Reveals per page, some still firing 600ms+ later from lazy image loads) and left every route landing at its old scroll position instead of the top. **The lesson: any fix for GSAP/scroll behavior that touches the shared `gsap.js` primitives affects every page and every route transition — it cannot be scoped to the one interaction that has the problem. If a fix is only needed for one specific control, it belongs at that control, not in `gsap.js`.**
  - **The actual, narrower bug this was all chasing:** clicking a control that mounts/unmounts a large batch of `Reveal` elements *without navigating* — the only case on the site is the Export/Import/NEUMATRIX switch on `/international` — intermittently scrolls the page to the top, in Safari/WebKit specifically. Reproduces on 3-10 clicks out of 10 depending on timing. Two compounding causes: (1) each of the many `Reveal` mounts calls `refreshNow()`, and each resulting `ScrollTrigger.refresh()` briefly scrolls to `(0,0)` to measure, then restores the prior position; (2) `html { scroll-behavior: smooth }` (`01-base.css`, sitewide, for the skip link and hash navigation) means Safari can play GSAP's "instant" `(0,0)` reset as a ~200ms animation, so the immediately-following restore call fires mid-animation and gets dropped.
  - **The fix that actually works, without touching `gsap.js`:** `selectTradePathPreservingScroll()` in `src/pages/OracInternational.jsx` — module-level (not inside the component, to satisfy `react-hooks/immutability`), called only from the Export/Import/NEUMATRIX buttons' `onClick`. It saves `window.scrollY` once at the start of the interaction, forces `scroll-behavior: auto` for a bounded guard window (two animation frames, then timeouts at 400ms and 1100ms to cover the trailing refresh a lazily-loaded image can trigger), and re-asserts the saved position only if it drifted — fully cancelled on unmount or a repeated click, via a ref-tracked list of pending timers. This is deliberately scoped to the one control that has the problem; it cannot affect route navigation because it never touches `gsap.js`. Verified with 20 consecutive WebKit repro runs (0 failures), plus adversarial tests navigating away mid-guard (guard correctly cancels, no fighting) and 10 consecutive full-site route-navigation sweeps (0 crashes, scroll always resets to 0). A fix for the WebKit-specific symptom must be verified in WebKit specifically — it does not reproduce reliably in Chromium/Firefox, so testing there alone will falsely look fixed; a fix for the crash/navigation symptom must be verified via actual client-side `<Link>` navigation (`page.click`), not `page.goto()` — a fresh page load never exercises the code path where the bug lives.

## Git safety

- Check `git status` before and after major work; preserve unrelated changes.
- Do not commit unless explicitly requested.
- Never use destructive Git commands without permission.

## Completion report format

Files changed · what was implemented · what remained unchanged · build/lint/test results · responsive checks performed · visual checks performed · console errors checked · remaining limitations · missing assets or content.
