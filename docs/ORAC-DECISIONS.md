# ORAC Confirmed Decisions

Only confirmed decisions belong here. If something is unresolved, it goes in **Pending decisions** below, not guessed at.

## Confirmed

- Parent brand: **ORAC Holdings** (confirmed by the user; the site previously used "ORAC Holding" inconsistently — corrected sitewide)
- Ohm Pranav's public title is **Managing Director** (the site previously showed "Founder & Chairman" in one leadership tile, inconsistent with "Managing Director" used elsewhere for him — corrected to Managing Director everywhere)
- Sitewide term for the three business entities is **Businesses** (not "Companies" or "Ventures" as UI/structural labels — nav, aria-labels, and section eyebrows corrected; the word "venture(s)" remains where it occurs as ordinary prose in approved copy, not as a structural label)
- ORAC International's wording is **"natural fibres and industrial minerals"** (not "industrial fibres, minerals" — corrected in `companyData.js` to match the wording already used in `Home.jsx` and `internationalData.js`)
- ORAC International's establishment date is **not to be publicly stated** — no confirmed date exists; any "Est." / "Established" claim must not appear
- Primary ventures: **ORAC International**, **ORAC Eventus**, **ORAC Luxe** — exactly three, all active
- Relationship: **ORAC Eventus × VELORAWED** (VELORAWED is Eventus's photography/cinematography partner, not a separate 4th business)
- Relationship: **ORAC Luxe × The House of Azrin** (The House of Azrin is Luxe's flagship fashion brand, not a separate 5th business)
- **"ORAC Evolution" does not exist and is not planned.** It appeared as a 4th venture in prior project instructions; confirmed by the user to be a mistake and dropped entirely. Do not reintroduce it in any form (route, data entry, nav item, or design accommodation) without new, explicit instruction.
- Leadership should appear later on the homepage, not near the top
- Preserve correct existing content
- Never invent business claims (numbers, clients, awards, testimonials, certifications, history)
- Working concept: **One origin. Multiple worlds.** — a design/narrative system, not a slogan to repeat on-page
- Current website credibility must be preserved through the redesign
- References are for principles, not for copying
- The site must become more original, cinematic, and editorial than it currently is
- Mobile must be intentionally designed (recomposed layouts, not shrunk desktop layouts)
- The implementation remains in the existing React + Vite project — confirmed by repository inspection (see [ORAC-CURRENT-AUDIT.md](ORAC-CURRENT-AUDIT.md)); no framework change is warranted or planned

## Pending decisions

These are open questions found during setup. Do not guess at them — confirm before they affect implementation.

1. **Reference set scope.** A prior `CLAUDE.md` (superseded by this documentation set) named Apple (for refinement/restraint/interaction quality) and "Bakinatajna" (for layered product presentation and spatial motion) as references alongside Izanami. The current confirmed brief names only Izanami as "the approved creative benchmark." Whether Apple/Bakinatajna remain active supplementary references is unconfirmed.

2. **Model-usage / working-mode protocol.** The prior `CLAUDE.md` specified which Claude model/effort level to use for which kind of task (planning vs. implementation vs. small fixes). This is not part of the current confirmed instructions and is not restated here. Whether that protocol should still apply is unconfirmed.

3. **The exact recurring visual device for "One origin. Multiple worlds."** The creative brief lists several possible mechanisms (transforming frame, pathway, portal, line, spatial system, material transition) but does not select one. [ORAC-REDESIGN-SPEC.md](ORAC-REDESIGN-SPEC.md) proposes a specific direction based on the current codebase and assets, but it requires explicit approval before implementation.

4. **Asset availability for the redesign.** High-resolution/transparent product cut-outs, additional event photography, founder photography, and final long-form copy for several sections have not been confirmed as available. See the "Asset and content requirements" section of the redesign spec.
