# ORAC Confirmed Decisions

Only confirmed decisions belong here. If something is unresolved, it goes in **Pending decisions** below, not guessed at.

## Confirmed

- Parent brand: **ORAC Holding** (spelling as used in live site content — see Pending decisions for a naming conflict found during audit)
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

1. **"ORAC Holding" vs "ORAC Holdings."** A prior `CLAUDE.md` found in this repository (untracked, superseded by this documentation set) mandated "ORAC Holdings" (with an S) as the only correct spelling. The live, currently-deployed site content — `package.json` name, page titles, footer copyright line, `companyData.js`, navbar aria-labels — consistently uses **"ORAC Holding"** (no S), with zero instances of "ORAC Holdings" found anywhere in `src/`. Which spelling is correct has not been confirmed by the user in this session. **Do not change existing copy in either direction until this is confirmed.**

2. **Reference set scope.** A prior `CLAUDE.md` (see above) also named Apple (for refinement/restraint/interaction quality) and "Bakinatajna" (for layered product presentation and spatial motion) as references alongside Izanami. The current confirmed brief names only Izanami as "the approved creative benchmark." Whether Apple/Bakinatajna remain active supplementary references is unconfirmed.

3. **Exact wording of "Companies" vs "Businesses" vs "Ventures."** The live navbar and footer use "Businesses"/"Companies" interchangeably (`BusinessCard`, `BusinessDock`, `BusinessSwitcher` components; "Companies" nav label; footer "Businesses" column heading). The creative brief and this documentation set use "ventures." No decision has been made on a single consistent term for the redesign.

4. **Model-usage / working-mode protocol.** The prior `CLAUDE.md` specified which Claude model/effort level to use for which kind of task (planning vs. implementation vs. small fixes). This is not part of the current confirmed instructions and is not restated here. Whether that protocol should still apply is unconfirmed.

5. **The exact recurring visual device for "One origin. Multiple worlds."** The creative brief lists several possible mechanisms (transforming frame, pathway, portal, line, spatial system, material transition) but does not select one. [ORAC-REDESIGN-SPEC.md](ORAC-REDESIGN-SPEC.md) proposes a specific direction based on the current codebase and assets, but it requires explicit approval before implementation.

6. **Asset availability for the redesign.** High-resolution/transparent product cut-outs, additional event photography, founder photography, and final long-form copy for several sections have not been confirmed as available. See the "Asset and content requirements" section of the redesign spec.
