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

## Git safety

- Check `git status` before and after major work; preserve unrelated changes.
- Do not commit unless explicitly requested.
- Never use destructive Git commands without permission.

## Completion report format

Files changed · what was implemented · what remained unchanged · build/lint/test results · responsive checks performed · visual checks performed · console errors checked · remaining limitations · missing assets or content.
