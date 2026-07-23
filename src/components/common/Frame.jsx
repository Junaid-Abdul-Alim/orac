import Reveal from "./Reveal";

/**
 * The ORAC Frame - the single recurring aperture that signals "you are
 * entering a world" (see docs/ORAC-REDESIGN-SPEC.md §1). It recurs as a
 * position and proportion, not a literal animated character:
 *
 * - `variant="identity"` - the homepage opening (stage 1): holds the ORAC
 *   wordmark and one line of copy, no imagery yet.
 * - `variant="venture"` - a venture's still image + name (stage 2/3, added
 *   in a later phase). Accepts a `tone` matching a venture id
 *   ("international" | "eventus" | "luxe") to pick up that venture's accent
 *   token via CSS (see variables.css --accent-*).
 *
 * Deliberately plain: a bordered aperture built from existing tokens
 * (--radius-lg, --rule, --shadow-*), no new animation system.
 */
export default function Frame({ variant = "identity", tone, className = "", delay = 0, children }) {
  const classes = ["orac-frame", `orac-frame-${variant}`, tone ? `orac-frame-${tone}` : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Reveal className={classes} delay={delay}>
      {children}
    </Reveal>
  );
}
