## Why this folder exists

This project's default component path was `src/components/common/` (ORAC-authored
composite components — Hero, GlobalReach, ProductPanel, etc.) — not the shadcn
convention of `src/components/ui/` for low-level, largely-vendored UI primitives.

`ui/` was created specifically to receive the `globe.jsx` component. Keeping it
separate from `common/` matters even without shadcn/Tailwind installed:

- **Provenance**: files here are adapted from an external registry (shadcn-style
  component registries, e.g. 21st.dev, ui.shadcn.com), not written for ORAC's own
  data/design system the way everything in `common/` is. Keeping that boundary
  visible makes it obvious what to diff against on a future upstream update.
- **Update surface**: a vendored primitive is expected to be swapped wholesale
  when it changes upstream; an ORAC composite in `common/` is expected to be
  edited in place. Mixing the two makes both harder to reason about.

Nothing else in this project should assume a `ui/` folder — there's no
shadcn CLI, `components.json`, or Tailwind build here (see the integration
notes in the PR/commit that added `globe.jsx` for the full explanation of what
was and wasn't set up).
